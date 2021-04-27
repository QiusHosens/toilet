import request from '@/utils/request'

export function addGroup(group) {
  return request({
    url: '/Api/Group/AddGroup',
    method: 'post',
    params: group
  })
}

export function deleteGroup(groupId) {
  return request({
    url: '/Api/Group/DeleteGroup',
    method: 'post',
    params: { groupId }
  })
}

export function existGroup(groupName, distCode) {
  return request({
    url: '/Api/Group/Exsit',
    method: 'post',
    params: { groupName, distCode }
  })
}

export function updateGroup(group) {
  return request({
    url: '/Api/Group/UpdateGroup',
    method: 'post',
    params: group
  })
}

export function pageGroups(pageSize, pageIndex, orderByField, orderBy, groupName) {
  return request({
    url: '/Api/Group/GetToiletGroups',
    method: 'post',
    params: { pageSize, pageIndex, orderByField, orderBy, groupName }
  })
}