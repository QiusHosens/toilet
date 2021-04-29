// 添加分组返回信息
const responseAddGroup = {
  "data": {
    "groupId": 1,
    "groupCode": "",
    "groupName": "天府1街",
    "distCode": "ARS-20210424",
    "crtTime": 0,
    "memo": "测试"
  },
  "errcode": 0,
  "errmsg": "添加分组成功！",
  "success": true
}

// 删除分组返回信息
const responseDeleteGroup = {
  "errcode": 1004,
  "errmsg": "删除分组失败！没有找到相应的资源",
  "success": true
}

// 分组是否存在返回信息
const responseExistGroup = {
  "errcode": 0,
  "errmsg": "此分组名没有被占用",
  "success": false
}

// 编辑分组返回信息
const responseUpdateGroup = {
  "errcode": 0,
  "errmsg": "更新分组成功！",
  "success": true
}

// 分页查询分组返回信息
const responsePageGroup = {
  "data": {
    "count": 1,
    "totalPage": 1,
    "curPage": 1,
    "pageData": [{
      "groupId": 1,
      "groupCode": "0e82a50e-dbc8-4c85-9b02-5444212ef9c1",
      "groupName": "天府2街",
      "distCode": "ARS-20210424",
      "crtTime": 1619269866,
      "memo": "天府2街"
    }
    ]
  }, "errcode": 0, "errmsg": "获取分组列表成功！", "success": true
}

module.exports = [
  {
    url: '/Api/Group/AddGroup',
    type: 'post',
    response: group => {
      return responseAddGroup;
    }
  },
  {
    url: '/Api/Group/DeleteGroup',
    type: 'post',
    response: groupId => {
      return responseDeleteGroup;
    }
  },
  {
    url: '/Api/Group/Exsit',
    type: 'post',
    response: params => {
      return responseExistGroup;
    }
  },
  {
    url: '/Api/Group/UpdateGroup',
    type: 'post',
    response: group => {
      return responseUpdateGroup;
    }
  },
  {
    url: '/Api/Group/GetToiletGroups',
    type: 'post',
    response: params => {
      return responsePageGroup;
    }
  }
]