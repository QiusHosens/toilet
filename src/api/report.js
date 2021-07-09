import request from '@/utils/request';

/**
 * 获取人流量
 * @param {*} tioletIds 
 * @param {*} beginTime 
 * @param {*} endTime 
 * @param {*} statType 0日1周 2月 3 季度 4年
 */
export function getStatFlow(tioletIds, beginTime, endTime, statType) {
    return request({
        url: '/Api/Statistcs/GetStatFlow',
        method: 'post',
        data: { tioletIds, beginTime, endTime, statType }
    })
}

// 蹲位统计
export function getStatKsp(tioletIds, beginTime, endTime, statType) {
    return request({
        url: '/Api/Statistcs/GetStatKsp',
        method: 'post',
        data: { tioletIds, beginTime, endTime, statType }
    })
}

// 水电
export function getStatWaterAndElec(tioletIds, beginTime, endTime, statType) {
    return request({
        url: '/Api/Statistcs/GetStatWaterAndElec',
        method: 'post',
        data: { tioletIds, beginTime, endTime, statType }
    })
}

// 环境
export function getStatEnv(tioletId, recordDate) {
    return request({
        url: '/Api/Statistcs/GetStatEnv',
        method: 'post',
        data: { tioletId, recordDate }
    })
}

// 耗材剩余量
export function getStatConsumResidue(tioletId) {
    return request({
        url: '/Api/Statistcs/GetStatConsumResidue',
        method: 'post',
        data: { tioletId }
    })
}

// 耗材统计
export function getStatConsum(tioletId, beginTime, endTime, statType) {
    return request({
        url: '/Api/Statistcs/GetStatConsum',
        method: 'post',
        data: { tioletId, beginTime, endTime, statType }
    })
}

// 大屏
export function getStatMasterData() {
    return request({
        url: '/Api/DataShow/GetStatMasterData',
        method: 'get'
    })
}