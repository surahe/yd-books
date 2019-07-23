import Books from "../models/Books";
import cheerio from 'cheerio'

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
        const html = await ctx.render('books/pages/list', {
            data: result.data
        });
        if (ctx.request.header['x-pjax']) {
            console.log('站内')
            const $ = cheerio.load(html)
            // ctx.body = $('#js-hooks-data').html()
            let _result = ''
            $('.pjaxcontext').each(function() {
                _result += $(this).html()
            })

            $('.lazyload-js').each(function() {
                _result += `<script src="${$(this).attr("src")}"></script>`
            })
            console.log($('.pjaxcontext'))
            ctx.body = _result
        } else {    
            console.log('直接刷')
            ctx.body = html
        }
    }
}
export default BooksController;