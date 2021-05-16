import request from '@/utils/request'

export function addToilet(toilet) {
  return request({
    url: '/Api/Toilet/AddToilet',
    method: 'post',
    params: toilet
  })
}

export function deleteToilet(toiletId) {
  return request({
    url: '/Api/Toilet/DeleteToilet',
    method: 'post',
    params: { toiletId }
  })
}

export function existToilet(toiletName) {
  return request({
    url: '/Api/Toilet/Exsit',
    method: 'post',
    params: { toiletName }
  })
}

export function updateToilet(toilet) {
  return request({
    url: '/Api/Toilet/UpdateToilet',
    method: 'post',
    params: toilet
  })
}

export function pageToilets(pageSize, pageIndex, orderByField, orderBy) {
  return request({
    url: '/Api/Toilet/GetToilets',
    method: 'post',
    params: { pageSize, pageIndex, orderByField, orderBy }
  })
}

export function allToilets(pageSize, pageIndex, orderByField, orderBy) {
  return request({
    url: '/Api/Toilet/GetAllToilets',
    method: 'get'
  })
}