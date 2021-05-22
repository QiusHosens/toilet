import request from '@/utils/request'

// export function login(data) {
//   return request({
//     url: '/vue-element-admin/user/login',
//     method: 'post',
//     data
//   })
// }
//
// export function getInfo(token) {
//   return request({
//     url: '/vue-element-admin/user/info',
//     method: 'get',
//     params: { token }
//   })
// }
//
// export function logout() {
//   return request({
//     url: '/vue-element-admin/user/logout',
//     method: 'post'
//   })
// }

export function login(data) {
  return request({
    url: '/Api/User/Login',
    method: 'get',
    params: {
      userName: data.username,
      pwd: data.password
    }
  })
}

export function getInfo(userName) {
  return request({
    url: '/Api/User/GetLoginInfo',
    method: 'get',
    params: { userName }
  })
}

export function logout() {
  // return request({
  //   url: '/vue-element-admin/user/logout',
  //   method: 'post'
  // })
}

export function changePwd(userName, oldPwd, newPwd) {
  return request({
    url: '/Api/User/ChangePwd',
    method: 'post',
    data: { userName, oldPwd, newPwd }
  })
}

export function deleteUser(userId) {
  return request({
    url: '/Api/User/DeleteUser',
    method: 'get',
    params: { userId }
  })
}

export function existUser(userName) {
  return request({
    url: '/Api/User/Exsit',
    method: 'post',
    data: { userName }
  })
}

export function addUser(user) {
  return request({
    url: '/Api/User/AddUser',
    method: 'post',
    data: user
  })
}

export function updateUser(user) {
  return request({
    url: '/Api/User/UpdateUser',
    method: 'post',
    data: user
  })
}

export function pageUsers(pageSize, pageIndex, orderByField, orderBy, userName, distCode) {
  return request({
    url: '/Api/User/GetUsers',
    method: 'post',
    data: { pageSize, pageIndex, orderByField, orderBy, userName, distCode }
  })
}

export function setUserPower(userName, powers) {
  return request({
    url: '/Api/User/SetUserPowers',
    method: 'post',
    data: { userName, powers }
  })
}

export function getUserPower(userName) {
  return request({
    url: '/Api/User/GetUserPowers',
    method: 'get',
    params: { userName }
  })
}