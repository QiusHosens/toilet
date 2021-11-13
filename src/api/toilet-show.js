import request from '@/utils/request'

// 获取单厕所蹲位信息
export function getSingleToiletKspUse(tioletSn) {
    return request({
        url: '/Api/DataShow/GetSingleToiletKspUse',
        method: 'get',
        params: { tioletSn }
    })
}

// 获取单个厕所环境指标
export function getSingleToiletKspEnv(tioletSn) {
    return request({
        url: '/Api/DataShow/GetSingleToiletKspEnv',
        method: 'get',
        params: { tioletSn }
    })
}

// 获取单个厕所耗材信息
export function getSingleToiletConsum(tioletSn) {
    return request({
        url: '/Api/DataShow/GetSingleToiletConsum',
        method: 'get',
        params: { tioletSn }
    })
}

// 获取单个厕所水电信息(最近7月按月统计)
export function getSingleToiletWaterAndElec(tioletSn) {
    return request({
        url: '/Api/DataShow/GetSingleToiletWaterAndElec',
        method: 'get',
        params: { tioletSn }
    })
}

// 获取单个厕所评价信息
export function getSingleToiletEvaluate(tioletSn) {
    return request({
        url: '/Api/DataShow/GetSingleToiletEvaluate',
        method: 'get',
        params: { tioletSn }
    })
}