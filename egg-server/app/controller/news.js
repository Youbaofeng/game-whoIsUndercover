
const Controller = require('egg').Controller;

class NewsController extends Controller {
    
  /**
   * @summary 列表
   * @description 获取列表页面
   * @router get /news
   * @request body createUserRequest *body
   * @response 200 baseResponse 创建成功
   */
    async list() {
        const ctx = this.ctx;
        const page = ctx.query.page || 1;
        const newsList = await ctx.service.news.list(page);
        await ctx.render('../view/list.tpl', { list: newsList });
    }
}

module.exports = NewsController