/**
 * @fileoverview 实现Books数据模型
 * @author yuanzhijia@yidengxuetang.com
 */
import SafeRequest from "../utils/SafeRequest";
class BooksService {
  /**
   * Books类 获取后台有关于图书相关的数据类
   * @class
   */
  /**
   * @constructor
   * @param {object} app KOA2执行的上下文
   */
  constructor(app) {
    this.app = app;
  }
  /**
   * 获取后台全部图书列表
   * @param {*} options 配置项
   * @example
   * return new Promise
   * getData(options)
   */
  getData() {
    const url = 'books/index'
    const safeRequest = new SafeRequest(url);
    return safeRequest.fetch();
  }
}
export default BooksService;