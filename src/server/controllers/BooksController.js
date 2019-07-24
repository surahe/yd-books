import cheerio from 'cheerio'
import { route, GET } from 'awilix-koa'
import {Readable} from 'stream'

@route('/books')
class BooksController {
    constructor({booksService}) {
        this.booksService = booksService
    }
    @route('/add')
    @GET()
    async actionAdd(ctx, next) {
        ctx.body = await ctx.render('books/pages/add');
    }
    @route('/list')
    @GET()
    async actionList(ctx, next) {
        const result = await this.booksService.getData()
        const html = await ctx.render('books/pages/list', {
            data: result.data
        });
        if (ctx.request.header['x-pjax']) {
            ctx.status = 200;
            ctx.type = 'html'
            console.log('站内')
            const $ = cheerio.load(html)
            $('.pjaxcontext').each(function() {
                ctx.res.write($(this).html())
            })

            $('.lazyload-js').each(function() {
                //核心basket.js
                //ctx.res.write(`<script>activeJS("${$(this).attr("src")}")</script>`);
                ctx.res.write(`<script src="${$(this).attr("src")}"></script>`);
            })
            ctx.res.end();
        } else {    
            console.log('直接刷')
            function createSSRStreamPromise () {
                return new Promise((resolve, reject) => {
                    const htmlStream = new Readable()
                    htmlStream.push(html)
                    htmlStream.push(null)
                    ctx.status = 200
                    ctx.type = 'html'
                    htmlStream.on('error', err => {
                        reject(err)
                    }).pipe(ctx.res)
                })
            }
            await createSSRStreamPromise()
        }
    }
}
export default BooksController;