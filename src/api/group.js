import request from '@/utils/request'

export function addGroup(group) {
  return request({
    url: '/Api/Group/AddGroup',
    method: 'post',
    data: group
  })
}

export function deleteGroup(groupId) {
  return request({
    url: '/Api/Group/DeleteGroup',
    method: 'get',
    params: { groupId }
  })
}

export function existGroup(groupName, distCode) {
  return request({
    url: '/Api/Group/Exsit',
    method: 'post',
    data: { groupName, distCode }
  })
}

export function updateGroup(group) {
  return request({
    url: '/Api/Group/UpdateGroup',
    method: 'post',
    data: group
  })
}

export function pageGroups(pageSize, pageIndex, orderByField, orderBy, groupName) {
  return request({
    url: '/Api/Group/GetGroups',
    method: 'post',
    data: { pageSize, pageIndex, orderByField, orderBy, groupName }
  })
}

export function getAllGroups(distCode) {
  return request({
    url: '/Api/Group/GetAllGroups',
    method: 'get',
    params: { distCode }
  })
}