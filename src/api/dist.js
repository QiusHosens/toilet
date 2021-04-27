import request from '@/utils/request'

export function addDist(dist) {
  return request({
    url: '/Api/Dist/AddDist',
    method: 'post',
    params: dist
  })
}

export function deleteDist(distId) {
  return request({
    url: '/Api/Dist/DeleteDist',
    method: 'post',
    params: { distId }
  })
}

export function existDist(distSName, supDistCode) {
  return request({
    url: '/Api/Dist/Exsit',
    method: 'post',
    params: { distSName, supDistCode }
  })
}

export function updateDist(dist) {
  return request({
    url: '/Api/Dist/UpdateDist',
    method: 'post',
    params: dist
  })
}

export function pageDists(pageSize, pageIndex, orderByField, orderBy, distSname) {
  return request({
    url: '/Api/Dist/GetDists',
    method: 'post',
    params: { pageSize, pageIndex, orderByField, orderBy, distSname }
  })
}