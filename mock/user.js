
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

// 登陆接口返回信息
const responseLoginInfo = {
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJuYmYiOjE2MTkyMjQ4ODQsImV4cCI6MTYxOTIzMjA4NCwiaXNzIjoiaXJzIiwiYXVkIjoiaXRvaWxldCJ9.ETBtyrB-7UDVLpzfovhq_xXG7sJfK4-RfppdJxUyu6k",
    "expires": 1619232084
  },
  "errcode": 0,
  "errmsg": "授权成功！",
  "success": true
}

// 用户信息
const responseUserInfo = {
  "data": {
    "userId": 2,
    "userName": "admin",
    "userType": 0,
    "distCode": "0",
    "realName": "11111",
    "duty": 0,
    "sex": 0,
    "contactTel": "False",
    "emall": "522741750@qq.com",
    "headImgUrl": "string",
    "lastLoginTime": "2021-04-24T08:49:04"
  },  "errcode": 0,
  "errmsg": "获取用户信息成功！",
  "success": true
}

// 修改密码返回信息
const responseChangePwd = {
  "errcode": 1002,
  "errmsg": "密码修改失败！密码错误",
  "success": true
}

// 删除用户返回信息
const responseDeleteUser = {
  "errcode": 1004,
  "errmsg": "删除用户失败！没有找到相应的资源",
  "success": true
}

// 用户是否存在返回信息
const responseExistUser = {
  "errcode": 0,
  "errmsg": "此用户名已经被占用",
  "success": true
}

// 添加用户数据
const responseAddUser = {
  "data": {
    "userId": 5,
    "userName": "admin1",
    "userType": 0,
    "distCode": "string",
    "realName": "string",
    "duty": 0,
    "sex": 0,
    "contactTel": "string",
    "emall": "string",
    "headImgUrl": "string",
    "lastLoginTime": "2021-04-24T00:54:26.872Z"
  },
  "errcode": 0,
  "errmsg": "添加用户成功！",
  "success": true
}

// 修改用户返回数据
const responseUpdateUser = {
  "errcode": 0,
  "errmsg": "更新用户成功！",
  "success": true
}

// 用户分页查询返回数据
const responsePageUser = {
  "data": {
    "count": 3,
    "totalPage": 2,
    "curPage": 1,
    "pageData": [
      {
        "userId": 2,
        "userName": "admin",
        "userType": 0,
        "distCode": "0",
        "realName": "11111",
        "duty": 0,
        "sex": 0,
        "contactTel": "13980411371",
        "emall": "522741750@qq.com",
        "headImgUrl": "string",
        "lastLoginTime": "2021-04-24T08:49:04"
      },
      {
        "userId": 3,
        "userName": "string",
        "userType": 0,
        "distCode": "0",
        "realName": "string",
        "duty": 0,
        "sex": 0,
        "contactTel": "string",
        "emall": "string",
        "headImgUrl": "string",
        "lastLoginTime": null
      }
    ]
  },
  "errcode": 0,
  "errmsg": "获取用户列表成功！",
  "success": true
}

// 设置用户权限
const responseAuthSetting = {
  "errcode": 0, "errmsg": "设置用户权限成功！", "success": true
}

// 获取用户权限
const responseUserAuth = {
  "data": [{"id": 1, "userName": "admin", "toiletCode": "7dd51528-6cee-47b5-b604-bdd893266f68"}
  ], "errcode": 0, "errmsg": "获取用户权限成功！", "success": true
}

module.exports = [
  // user login
  {
    url: '/vue-element-admin/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/vue-element-admin/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/vue-element-admin/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/Api/User/Login',
    type: 'post',
    response: _ => {
      return responseLoginInfo;
    }
  },
  {
    url: '/Api/User/GetLoginInfo',
    type: 'get',
    response: userName => {
      return responseUserInfo;
    }
  },
  {
    url: '/Api/User/ChangePwd',
    type: 'post',
    response: params => {
      return responseChangePwd;
    }
  },
  {
    url: '/Api/User/DeleteUser',
    type: 'post',
    response: userId => {
      return responseDeleteUser;
    }
  },
  {
    url: '/Api/User/Exsit',
    type: 'post',
    response: userName => {
      return responseExistUser;
    }
  },
  {
    url: '/Api/User/AddUser',
    type: 'post',
    response: user => {
      return responseAddUser;
    }
  },
  {
    url: '/Api/User/UpdateUser',
    type: 'post',
    response: user => {
      return responseUpdateUser;
    }
  },
  {
    url: '/Api/User/GetUsers',
    type: 'post',
    response: _ => {
      return responsePageUser;
    }
  },
  {
    url: '/Api/User/SetUserPowers',
    type: 'post',
    response: params => {
      return responseAuthSetting;
    }
  },
  {
    url: '/Api/User/GetUserPowers',
    type: 'get',
    response: userName => {
      return responseUserAuth;
    }
  }
]
