import Koa from "koa";
import serve from "koa-static";
import render from "koa-swig";
import config from "./config";
const app = new Koa();
import { wrap } from 'co';
import errorHandler from "./middlewares/errorHandler";
import { configure, getLogger } from 'log4js';
import { createContainer, Lifetime } from 'awilix'
import { loadControllers, scopePerRequest } from 'awilix-koa'

//必须把Service融入到容器里
const container = createContainer()
container.loadModules([__dirname + '/services/*.js'], {
    formatName: 'camelCase',
    resolverOptions: {
        lifetime: Lifetime.SCOPED
    }
})

//终极注入
app.use(scopePerRequest(container))

configure({
    appenders: { cheese: { type: 'file', filename: __dirname + '/logs/yd.log' } },
    categories: { default: { appenders: ['cheese'], level: 'error' } }
});
app.use(serve(config.staticDir));
app.context.render = wrap(render({
    root: config.viewDir,
    autoescape: true,
    varControls: ["[[", "]]"],
    // cache: 'memory', // disable, set to false
    cache: false,
    ext: 'html',
    writeBody: false
}));
//先让他next 再次的判断当前的业务情况
const logger = getLogger('cheese');
app.context.logger = logger
errorHandler.error(app)
app.use(loadControllers(__dirname + "/controllers/*.js"))
app.listen(config.port, () => {
    console.log("图书管理平台启动成功📚");
});