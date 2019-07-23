import { route, GET } from 'awilix-koa'
@route('/')
class IndexController {
    constructor() {
    }
    @route('/')
    @GET()
    async actionIndex(ctx, next) {
        ctx.body = {
            data:'🏮京程一灯'
        }
    }
}
export default IndexController