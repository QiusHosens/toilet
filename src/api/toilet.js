import request from '@/utils/request'

export function addToilet(toilet) {
  return request({
    url: '/Api/Toilet/AddToilet',
    method: 'post',
    data: toilet
  })
}

export function deleteToilet(toiletId) {
  return request({
    url: '/Api/Toilet/DeleteToilet',
    method: 'get',
    params: { toiletId }
  })
}

export function existToilet(toiletName) {
  return request({
    url: '/Api/Toilet/Exsit',
    method: 'post',
    data: { toiletName }
  })
}

export function updateToilet(toilet) {
  return request({
    url: '/Api/Toilet/UpdateToilet',
    method: 'post',
    data: toilet
  })
}

export function pageToilets(pageSize, pageIndex, orderByField, orderBy, toiletName) {
  return request({
    url: '/Api/Toilet/GetToilets',
    method: 'post',
    data: { pageSize, pageIndex, orderByField, orderBy, toiletName }
  })
}

export function allToilets() {
  return request({
    url: '/Api/Toilet/GetAllToilets',
    method: 'get'
  })
}