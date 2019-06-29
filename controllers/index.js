const router = require('koa-simple-router');
const IndexController = require("./IndexController");
const BooksController = require("./BooksController");
const indexController = new IndexController();
const booksController = new BooksController();
module.exports = (app) => {
    app.use(router(_ => {
        _.get('/', indexController.actionIndex);
        _.get('/index.html', indexController.actionIndex);
        _.get('/books/list', booksController.actionList);
    }));
}