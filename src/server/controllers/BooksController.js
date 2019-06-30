import Books from "../models/Books";
class BooksController {
    constructor() {
    }
    async actionList(ctx, next) {
        const books = new Books()
        const result = await books.getData({
            url: "books/index"
        });
        console.log(result);
        ctx.body = await ctx.render('books/list', {
            data: result.data
        });
    }
}
export default BooksController;