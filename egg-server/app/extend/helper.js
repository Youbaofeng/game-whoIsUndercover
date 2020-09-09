const moment = require('moment')

// 处理成功响应
exports.success = ({ ctx, res = null, message = '处理成功' }) => {
    ctx.body = {
        code: 20000,
        data: res,
        message
    }
    ctx.status = 200
}

// 格式化时间
exports.formatTime = time => moment(time).format('YYYY-MM-DD HH:mm:ss')