import request from '@/utils/request'

export function getStatFlow() {
    return request({
        url: '/Api/DataShow/GetStatFlow',
        method: 'get'
    })
}

export function getKspUse() {
    return request({
        url: '/Api/DataShow/GetKspUse',
        method: 'get'
    })
}

export function getEnv() {
    return request({
        url: '/Api/DataShow/GetEnv',
        method: 'get'
    })
}

export function getAlarm() {
    return request({
        url: '/Api/DataShow/GetAlarm',
        method: 'get'
    })
}

export function getConsum() {
    return request({
        url: '/Api/DataShow/GetConsum',
        method: 'get'
    })
}

export function getStatEva(toiletId) {
    return request({
        url: '/Api/DataShow/GetStatEva',
        method: 'get',
        params: { toiletId }
    })
}