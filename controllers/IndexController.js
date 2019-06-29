class IndexController {
    constructor() {
    }
    async actionIndex(ctx, next) {
        // console.log(ctxy);
        ctx.body = await ctx.render('books/index',{
            data:"🏮京程一灯"
        });
    }
}
module.exports = IndexController;