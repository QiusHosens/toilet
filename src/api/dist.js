import request from '@/utils/request'

export function addDist(dist) {
  return request({
    url: '/Api/Dist/AddDist',
    method: 'post',
    data: dist
  })
}

export function deleteDist(distId) {
  return request({
    url: '/Api/Dist/DeleteDist',
    method: 'get',
    params: { distId }
  })
}

export function existDist(distSName, supDistCode) {
  return request({
    url: '/Api/Dist/Exsit',
    method: 'post',
    data: { distSName, supDistCode }
  })
}

export function updateDist(dist) {
  return request({
    url: '/Api/Dist/UpdateDist',
    method: 'post',
    data: dist
  })
}

export function pageDists(pageSize, pageIndex, orderByField, orderBy, distSname) {
  return request({
    url: '/Api/Dist/GetDists',
    method: 'post',
    data: { pageSize, pageIndex, orderByField, orderBy, distSname }
  })
}

export function getAllDists(distCode) {
  return request({
    url: '/Api/Dist/GetAllDists',
    method: 'get',
    params: { distCode }
  })
}