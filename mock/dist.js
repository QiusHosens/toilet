// 分页查询经销商返回信息
const responsePageCustom = {
  "data": {
    "count": 1,
    "totalPage": 1,
    "curPage": 1,
    "pageData": [{
      "distId": 2,
      "distCode": "1aaa2b3c-903a-438c-981a-2656be492772",
      "distSName": "艾瑞斯1",
      "distFName": "string",
      "supDistCode": "0",
      "contactAdr": "string",
      "contactPerson": "string",
      "contactTel": "string",
      "contactEmail": "string",
      "crtDate": 0,
      "memo": "string"
    }
    ]
  }, "errcode": 0, "errmsg": "获取经销商列表成功！", "success": true
}

// 经销商是否存在
const responseExistCustom = {
  "errcode": 0,
  "errmsg": "此经销商简称已经被占用",
  "success": true
}

// 添加经销商返回信息
const responseAddCustom = {
  "data": {
    "distId": 2,
    "distCode": "string",
    "distSName": "艾瑞斯",
    "distFName": "成都艾瑞斯高科技有限公司",
    "supDistCode": "0",
    "contactAdr": "string",
    "contactPerson": "string",
    "contactTel": "string",
    "contactEmail": "string",
    "crtDate": 0,
    "memo": "string"
  }, "errcode": 0, "errmsg": "添加经销商成功！", "success": true
}

// 编辑经销商返回信息
const responseUpdateCustom = {
  "errcode": 0, "errmsg": "更新经销商成功！", "success": true
}

// 删除经销商返回信息
const responseDeleteCustom = {
  "errcode": 1004, "errmsg": "删除经销商失败！没有找到相应的资源", "success": true
}

const responseAllCustom = {  "data": [    {      "distCode": "1aaa2b3c-903a-438c-981a-2656be492772",      "distName": "艾瑞斯1"    }
],  "errcode": 0,  "errmsg": "获取经销商列表成功！",  "success": true}

module.exports = [
  {
    url: '/Api/Dist/AddDist',
    type: 'post',
    response: dist => {
      return responseAddCustom;
    }
  },
  {
    url: '/Api/Dist/DeleteDist',
    type: 'post',
    response: distId => {
      return responseDeleteCustom;
    }
  },
  {
    url: '/Api/Dist/Exsit',
    type: 'post',
    response: params => {
      return responseExistCustom;
    }
  },
  {
    url: '/Api/Dist/UpdateDist',
    type: 'post',
    response: dist => {
      return responseUpdateCustom;
    }
  },
  {
    url: '/Api/Dist/GetDists',
    type: 'post',
    response: params => {
      return responsePageCustom;
    }
  },
  {
    url: '/Api/Dist/GetAllDists',
    type: 'get',
    response: params => {
      return responseAllCustom;
    }
  }
]