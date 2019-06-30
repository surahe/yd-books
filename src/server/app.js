import Koa from "koa";
import serve from "koa-static";
import render from "koa-swig";
import { staticDir, viewDir, port } from "./src/server/config";
const app = new Koa();
import { wrap } from 'co';
import { error } from "./middlewares/errorHandler";
import { configure, getLogger } from 'log4js';
configure({
    appenders: { cheese: { type: 'file', filename: './logs/yd.log' } },
    categories: { default: { appenders: ['cheese'], level: 'error' } }
});
app.use(serve(staticDir));
app.context.render = wrap(render({
    root: viewDir,
    autoescape: true,
    varControls: ["[[", "]]"],
    // cache: 'memory', // disable, set to false
    cache: false,
    ext: 'html',
    writeBody: false
}));
//先让他next 再次的判断当前的业务情况
const logger = getLogger('cheese');
error(app, logger);
require("./controllers").default(app);
app.listen(port, () => {
    console.log("图书管理平台启动成功📚");
});