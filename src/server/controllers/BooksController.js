import Books from "../models/Books";
class BooksController {
    constructor() {
    }
    async actionAdd(ctx, next) {
        ctx.body = await ctx.render('books/pages/add');
    }
    async actionList(ctx, next) {
        const books = new Books()
        const result = await books.getData({
            url: "books/index"
        });
        ctx.body = await ctx.render('books/pages/list', {
            data: result.data
        });
    }
}
export default BooksController;