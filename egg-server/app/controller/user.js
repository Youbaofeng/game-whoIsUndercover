const Controller = require('egg').Controller
/**
 * @Controller 用户管理
 */
class UserController extends Controller {
  constructor(ctx) {
    super(ctx)
  }

  /**
   * @summary 注册用户
   * @description 注册用户，记录用户账户/密码/类型
   * @router post /create
   * @request body createUserRequest *body
   * @response 200 baseResponse 创建成功
   */
  async create() {
    const { ctx, service } = this
    // 校验参数
    ctx.validate(ctx.rule.createUserRequest)
    // 组装参数
    const payload = ctx.request.body || {}
    // 调用 Service 进行业务处理
    const res = await service.user.create(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  /**
   * @summary 修改姓名
   * @description 修改用户姓名
   * @router post /api/modifyName
   * @request url modifyRequest
   * @response 200 baseResponse 修改成功
   */
  async modifyName() {
    const { ctx, service } = this
    // 组装参数
    const payload = ctx.request.body || {}
    // 调用 Service 进行业务处理
    const res = await service.user.modifyName(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }


  /**
   * @summary 删除单个用户
   * @description 删除单个用户
   * @router delete /api/user/{id}
   * @request path string *id eg:1 用户ID
   * @response 200 baseResponse 创建成功
   */
  async destroy() {
    const { ctx, service } = this
    // 校验参数
    const { id } = ctx.params
    // 调用 Service 进行业务处理
    await service.user.destroy(id)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx})
  }

  /**
   * @summary 修改用户
   * @description 获取用户信息
   * @router put /api/user/
   * @response 200 baseResponse 创建成功
   * @ignore
   */
  async update() {
    const { ctx, service } = this
    // 校验参数
    ctx.validate(ctx.rule.createUserRequest)
    // 组装参数
    const { id } = ctx.params
    const payload = ctx.request.body || {}
    // 调用 Service 进行业务处理
    await service.user.update(id, payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx})
  }
 
  /**
   * @summary 获取单个用户
   * @description 获取用户信息
   * @router get /api/userInfo/{mobile}
   * @request url infoRequest
   * @response 200 baseResponse 创建成功
   */
  async userInfo() {
    const { ctx, service } = this
    //组装参数
    const { mobile } = ctx.params
    // 调用 Service 进行业务处理
    const res = await service.user.userInfo(mobile)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }


  /**
   * @summary 获取所有用户(分页/模糊)
   * @description 获取用户信息
   * @router get /api/user
   * @request query integer *currentPage eg:1 当前页
   * @request query integer *pageSize eg:10 单页数量
   * @request query string search eg: 搜索字符串
   * @request query boolean isPaging eg:true 是否需要翻页
   * @response 200 baseResponse 创建成功
   */
  async index() {
    const { ctx, service } = this
    // 组装参数
    const payload = ctx.query
    // 调用 Service 进行业务处理
    const res = await service.user.index(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  /**
   * @summary 删除所选用户
   * @description 获取用户信息
   * @router delete /api/user/{id}
   * @request path string *id
   * @response 200 baseResponse 创建成功
   */
  async removes() {
    const { ctx, service } = this
    // 组装参数
    // const payload = ctx.queries.id
    const { id } = ctx.request.body
    const payload = id.split(',') || []
    // 调用 Service 进行业务处理
    const result = await service.user.removes(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx})
  }
  
  /**
   * @summary 添加词汇
   * @description 添加谁是卧底的词汇
   * @router post /api/addWord
   * @request url baseRequest
   * @response 200 baseResponse 创建成功
   */
  async addWord() {
    const { ctx, service } = this
    // 组装参数
    const payload = ctx.request.body || {}
    // 调用 Service 进行业务处理
    const res = await service.user.addWord(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

 /**
   * @summary 获取词汇
   * @description 获取所有谁是卧底词汇
   * @router get /api/getWord
   * @response 200 baseResponse 创建成功
   */
  async getWord() {
    const { ctx, service } = this
    // 调用 Service 进行业务处理
    const res = await service.user.getWord()
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }
  

  /**
   * @summary 更新点赞数
   * @description 该词点赞数加1
   * @router get /api/thinkGood/{_id}
   * @request url thinkRequest
   * @response 200 baseResponse 创建成功
   */
  async thinkGood() {
    const { ctx, service } = this
    //组装参数
    const { _id } = ctx.params
    // 调用 Service 进行业务处理
    const res = await service.user.thinkGood(_id)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }
  /**
   * @summary 更新点踩数
   * @description 该词点踩数加1
   * @router get /api/thinkBad/{_id}
   * @request url thinkRequest
   * @response 200 baseResponse 创建成功
   */
  async thinkBad() {
    const { ctx, service } = this
    //组装参数
    const { _id } = ctx.params
    // 调用 Service 进行业务处理
    const res = await service.user.thinkBad(_id)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

}


module.exports = UserController