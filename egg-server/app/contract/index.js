module.exports = {
    baseRequest:{
      id: { type: 'string', description: 'id 唯一键' ,required:true,example:'1'},
    },
    baseResponse: {
      code: { type: 'integer', required: true, example: 0 },
      data:{type: 'string',example: '请求成功' },
      errorMessage: { type: 'string', example: '请求成功' },
    },
    infoRequest:{
      mobile: { type: 'string', description: 'mobile 唯一键' ,required:true,example:'13808770426'},
    },
    thinkRequest:{
      id: { type: 'string', description: '点赞的词的ID' ,required:true},
    },
    modifyRequest:{
      mobile: { type: 'string', description: 'mobile 唯一键' ,required:true},
      name: { type: 'string', description: '修改的名称' ,required:true},
    },
  };