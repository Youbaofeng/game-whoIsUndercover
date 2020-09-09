const Service = require('egg').Service

class UserService extends Service {
  
  /**
   * 创建用户
   * @param {*} payload 
   */
  async create(payload) {
    const { ctx, service } = this
    const user = await this.ctx.model.User.findOne({mobile:payload.mobile})
    if (user) {
      ctx.throw(200,{
          code:20003,
          message:"该用户手机号已存在，请直接登录"
      })
    }else {
      payload.password = await this.ctx.genHash(payload.password)
      return ctx.model.User.create(payload)
    }
  }
  /**
   * 修改姓名
   * @param {*} payload 
   */
  async modifyName(payload) {
    const { ctx, service } = this
    const user = await this.ctx.model.User.findOneAndUpdate({mobile:payload.mobile},{$set:{realName:payload.name}})
    const word = await this.ctx.model.Word.updateMany({mobile:payload.mobile},{$set:{author:payload.name}})
  }
  /**
   * 添加词汇
   * @param {*} payload 
   */
  async addWord(payload) {
    const { ctx, service } = this
    return ctx.model.Word.create(payload)
  }
   /**
   * 获取词汇
   * @param {*} payload 
   */
  async getWord(payload) {
    const { ctx, service } = this
    return ctx.model.Word.find()
  }

  /**
   * 删除用户
   * @param {*} _id 
   */
  async destroy(_id) {
    const { ctx, service } = this
    const user = await ctx.service.user.find(_id)
    if (!user) {
      ctx.throw(404, 'user not found')
    }
    return ctx.model.User.findByIdAndRemove(_id)
  }

  /**
   * 修改用户
   * @param {*} _id 
   * @param {*} payload 
   */
  async update(_id, payload) {
    const { ctx, service } = this
    const user = await ctx.service.user.find(_id)
    if (!user) {
      ctx.throw(404, 'user not found')
    }
    return ctx.model.User.findByIdAndUpdate(_id, payload)
  }

  /**
   * 查看单个用户
   * @param {*} payload 
   */
  async userInfo(payload) {
    console.log()
    const user = this.ctx.model.User.findOne({mobile:payload});
    if (!user) {
      this.ctx.throw(404, 'user not found')
    }
    return user;
  }

  /**
   * 查看用户列表
   * @param {*} payload 
   */
  async index(payload) {
    const { currentPage, pageSize, isPaging, search } = payload
    let res = []
    let count = 0
    let skip = ((Number(currentPage)) - 1) * Number(pageSize || 10)
    if(isPaging) {
      if(search) {
        res = await this.ctx.model.User.find({mobile: { $regex: search } }).populate('role').skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        count = res.length
      } else {
        res = await this.ctx.model.User.find({}).populate('role').skip(skip).limit(Number(pageSize)).sort({ createdAt: -1 }).exec()
        count = await this.ctx.model.User.count({}).exec()
      }
    } else {
      if(search) {
        res = await this.ctx.model.User.find({mobile: { $regex: search } }).populate('role').sort({ createdAt: -1 }).exec()
        count = res.length
      } else {
        res = await this.ctx.model.User.find({}).populate('role').sort({ createdAt: -1 }).exec()
        count = await this.ctx.model.User.count({}).exec()
      }
    }
    // 整理数据源 -> Ant Design Pro
    let data = res.map((e,i) => {
      const jsonObject = Object.assign({}, e._doc)
      jsonObject.key = i
      jsonObject.password = 'Are you ok?'
      jsonObject.createdAt = this.ctx.helper.formatTime(e.createdAt)
      return jsonObject
    })

    return { count: count, list: data, pageSize: Number(pageSize), currentPage: Number(currentPage) }
  }  
  
  /**
   * 删除多个用户
   * @param {*} payload 
   */
  async removes(payload) {
    return this.ctx.model.User.remove({ _id: { $in: payload } })
  }

  /**
   * 根据手机号查找
   * @param {*} mobile 
   */
  async findByMobile(mobile) {
    return this.ctx.model.User.findOne({mobile: mobile})
  }

  /**
   * 查找用户
   * @param {*} id 
   */
  async find(id) {
    return this.ctx.model.User.findById(id)
  }

  /**
   * 更新用户信息
   * @param {*} id 
   * @param {*} values 
   */
  async findByIdAndUpdate(id, values) {
    return this.ctx.model.User.findByIdAndUpdate(id, values)
  }
  /**
   * 更新用户信息
   * @param {*} id 
   */
  async thinkGood(id) {
    return this.ctx.model.Word.findByIdAndUpdate(id, { $inc: { good: 1 }})
    // return this.ctx.model.User.where({ _id: id }).update({ $set: { good: 1 }})
  }
  /**
   * 更新用户信息
   * @param {*} id 
   */
  async thinkBad(id) {
    return this.ctx.model.Word.findByIdAndUpdate(id, { $inc: { bad: 1 }})

  }

}


module.exports = UserService