const errorHandler = {
    error(app) {
        app.use(async (ctx, next) => {
            try {
                await next();
            } catch (error) {
                //如果node挂了 及时的查错
                ctx.logger.error(error);
                ctx.status = error.status || 500;
                ctx.body = "错误";
            }
        });
        app.use(async (ctx, next) => {
            await next();
            if (404 !== ctx.status) {
                return;
            }
            //404业务的变动长时间的404 降权 京程一灯
            ctx.status = 404;
            ctx.body = '<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8"></script>';
        });
    }
}
export default errorHandler;