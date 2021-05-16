// 添加厕所返回信息
const responseAddToilet = {
  "data": {
    "toiletId": 2,
    "toiletCode": "string",
    "toiletName": "天府5街厕所",
    "toiletAdr": "天府5街",
    "toiletTel": "1233444",
    "toiletStar": 4,
    "distCode": "1aaa2b3c-903a-438c-981a-2656be492772",
    "groupCode": "22222",
    "longitude": 0,
    "latitude": 0,
    "numSeatMan": 10,
    "numSeatFemale": 10,
    "numSeatThird": 0,
    "planUrl": "string",
    "crtDate": 0,
    "memo": "string"
  }, "errcode": 0, "errmsg": "添加厕所成功！", "success": true
}

// 编辑厕所返回信息
const responseUpdateToilet = {
  "errcode": 0, "errmsg": "更新厕所成功！", "success": true
}

// 删除厕所返回信息
const responseDeleteToilet = {
  "errcode": 0, "errmsg": "删除厕所成功！", "success": true
}

// 厕所名是否存在返回信息
const responseExistToilet = {
  "errcode": 0, "errmsg": "此厕所名没有被占用", "success": false
}

// 分页查询厕所
const responsePageToilet = {
  "data": {
    "count": 1,
    "totalPage": 1,
    "curPage": 1,
    "pageData": [{
      "toiletId": 1,
      "toiletCode": "7dd51528-6cee-47b5-b604-bdd893266f68",
      "toiletName": "天府三街1#厕所",
      "toiletAdr": "天府三街",
      "toiletTel": "13980411371",
      "toiletStar": 3,
      "distCode": "1aaa2b3c-903a-438c-981a-2656be492772",
      "groupCode": "22222",
      "longitude": 0,
      "latitude": 0,
      "numSeatMan": 6,
      "numSeatFemale": 6,
      "numSeatThird": 0,
      "planUrl": "string",
      "crtDate": 1619279751,
      "memo": "string"
    }
    ]
  }, "errcode": 0, "errmsg": "获取厕所列表成功！", "success": true
}

// 查询所有厕所
const responseAllToilets = {  
  "data": [    
    {      
      "toiletCode": "7dd51528-6cee-47b5-b604-bdd893266f68",      
      "toiletName": "天府三街1#厕所"    
    }
  ],  "errcode": 0,  "errmsg": "获取厕所列表成功！",  "success": true
}

module.exports = [
  {
    url: '/Api/Toilet/AddToilet',
    type: 'post',
    response: toilet => {
      return responseAddToilet;
    }
  },
  {
    url: '/Api/Toilet/DeleteToilet',
    type: 'post',
    response: toiletId => {
      return responseDeleteToilet;
    }
  },
  {
    url: '/Api/Toilet/Exsit',
    type: 'post',
    response: toiletName => {
      return responseExistToilet;
    }
  },
  {
    url: '/Api/Toilet/UpdateToilet',
    type: 'post',
    response: toilet => {
      return responseUpdateToilet;
    }
  },
  {
    url: '/Api/Toilet/GetToilets',
    type: 'post',
    response: params => {
      return responsePageToilet;
    }
  }, 
  {
    url: '/Api/Toilet/GetAllToilets',
    type: 'get',
    response: params => {
      return responseAllToilets;
    }
  }
]