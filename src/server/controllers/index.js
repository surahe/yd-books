import router from 'koa-simple-router';
import IndexController from "./IndexController";
import BooksController from "./BooksController";
const indexController = new IndexController();
const booksController = new BooksController();
export default (app) => {
    app.use(router(_ => {
        _.get('/', indexController.actionIndex);
        _.get('/index.html', indexController.actionIndex);
        _.get('/books/list', booksController.actionList);
    }));
}