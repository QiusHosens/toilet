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
        method: 'get',
        params: { tioletIds, beginTime, endTime, statType }
    })
}

// 蹲位统计
export function getStatKsp(tioletIds, beginTime, endTime, statType) {
    return request({
        url: '/Api/Statistcs/GetStatKsp',
        method: 'get',
        params: { tioletIds, beginTime, endTime, statType }
    })
}

// 水电
export function getStatWaterAndElec(tioletIds, beginTime, endTime, statType) {
    return request({
        url: '/Api/Statistcs/GetStatWaterAndElec',
        method: 'get',
        params: { tioletIds, beginTime, endTime, statType }
    })
}

// 环境
export function getStatEnv(tioletId, recordDate) {
    return request({
        url: '/Api/Statistcs/GetStatEnv',
        method: 'get',
        params: { tioletId, recordDate }
    })
}