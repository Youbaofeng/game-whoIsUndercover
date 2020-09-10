// app/contract/userAccess.js
module.exports = {
    loginRequest: {
      mobile: { type: 'string', required: true, description: '手机号', example: '18801731528', format: /^1[34578]\d{9}$/,message:'手机号输入错误' },
      password: { type: 'string', required: true, description: '密码', example: '111111', },
    },
  }