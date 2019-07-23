class IndexController {
    constructor() {
    }
    async actionIndex(ctx, next) {
        ctx.body = await ctx.render('books/pages/index',{
            data:"🏮京程一灯"
        });
    }
}
export default IndexController;