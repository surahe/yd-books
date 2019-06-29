const Koa = require("koa");
const serve = require("koa-static");
const render = require("koa-swig");
const config = require("./config")
const app = new Koa();
const co = require('co');
const errorHandler = require("./middlewares/errorHandler");
const log4js = require('log4js');
log4js.configure({
    appenders: { cheese: { type: 'file', filename: './logs/yd.log' } },
    categories: { default: { appenders: ['cheese'], level: 'error' } }
});
app.use(serve(config.staticDir));
app.context.render = co.wrap(render({
    root: config.viewDir,
    autoescape: true,
    varControls: ["[[", "]]"],
    // cache: 'memory', // disable, set to false
    cache: false,
    ext: 'html',
    writeBody: false
}));
//先让他next 再次的判断当前的业务情况
const logger = log4js.getLogger('cheese');
errorHandler.error(app, logger);
require("./controllers")(app);
app.listen(config.port, () => {
    console.log("图书管理平台启动成功📚");
});