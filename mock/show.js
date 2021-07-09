const responseShowGetStatFlow = {  "data": [    
    {      
        "statTime": "20210601",      
        "data": [        
            {          
                "statTime": "20210601",          
                "toiletType": 1,          
                "dateIn": 426592        
            },
            {          
                "statTime": "20210601",          
                "toiletType": 2,          
                "dateIn": 426820        
            },
            {          
                "statTime": "20210601",          
                "toiletType": 3,          
                "dateIn": 373023        
            }
        ],      
        "totalNum": 1226435    
    },
    {      
        "statTime": "20210602",      
        "data": [        {          "statTime": "20210602",          "toiletType": 1,          "dateIn": 53133        },
{          "statTime": "20210602",          "toiletType": 3,          "dateIn": 106266        }
],      "totalNum": 159399    }
],  "errcode": 0,  "errmsg": "获取最近7日人流量统计成功",  "success": true}

const responseShowGetKspUse = {  "data": 0.6875,  "errcode": 0,  "errmsg": "获取厕位使用情况成功",  "success": true}

const responseShowGetEnv = {  
    "data": [    {      
        "toiletSn": "abc123456787",      
        "toiletName": null,      
        "temp": 13.333333,      
        "humi": 22.666666,      
        "pm25": 19.666666,      
        "h2s": 29.666666,      
        "nh3": 36.333332,      
        "voc": 0,      
        "co2": 0,      
        "ch2o": 0,      
        "lux": 0    
    },
{      "toiletSn": "abc123456783",      "toiletName": null,      "temp": 12,      "humi": 31.333334,      "pm25": 16.666666,      "h2s": 33,      "nh3": 34.666668,      "voc": 0,      "co2": 0,      "ch2o": 0,      "lux": 0    },
{      "toiletSn": "abc123456781",      "toiletName": null,      "temp": 15.333333,      "humi": 30.333334,      "pm25": 39.333332,      "h2s": 19.333334,      "nh3": 29,      "voc": 0,      "co2": 0,      "ch2o": 0,      "lux": 0    },
{      "toiletSn": "abc123456789",      "toiletName": null,      "temp": 16,      "humi": 28.666666,      "pm25": 25,      "h2s": 43,      "nh3": 31.333334,      "voc": 0,      "co2": 0,      "ch2o": 0,      "lux": 0    },
{      "toiletSn": "abc123456785",      "toiletName": null,      "temp": 13.666667,      "humi": 33.333332,      "pm25": 25,      "h2s": 32.666668,      "nh3": 33.333332,      "voc": 0,      "co2": 0,      "ch2o": 0,      "lux": 0    }
],  "errcode": 0,  "errmsg": "获取环境指标成功",  "success": true}

const responseShowGetAlarm = {  
    "data": [    {      
        "toiletSn": "11111",      
        "toiletName": '123456',      
        "switchCode": 1,      
        "type": 1    
    },
{      "toiletSn": "22222",      "toiletName": '路上看到发顺丰',      "switchCode": 2,      "type": 2    }
],  "errcode": 0,  "errmsg": "获取当前告警成功",  "success": true}

const responseShowGetConsum = {  
    "data": [    {      
        "toiletSn": "1111",      
        "toiletName": null,      
        "consumName": "擦手纸巾盒-1",      
        "residue": 80    
    },
    {      
        "toiletSn": "1111",      
        "toiletName": null,      
        "consumName": "擦手纸巾盒-2",      
        "residue": 80    
    },
    {      "toiletSn": "1111",      "toiletName": null,      "consumName": "感应出纸机-1",      "residue": 80    },
    {      "toiletSn": "1111",      "toiletName": null,      "consumName": "感皂液器-1",      "residue": 80    },
    {      "toiletSn": "1111",      "toiletName": null,      "consumName": "飘香机-1",      "residue": 80    },
    {      "toiletSn": "1111",      "toiletName": null,      "consumName": "擦手纸巾盒-1",      "residue": 45    },
    {      "toiletSn": "1111",      "toiletName": null,      "consumName": "擦手纸巾盒-2",      "residue": 46    },
    {      "toiletSn": "1111",      "toiletName": null,      "consumName": "感应出纸机-1",      "residue": 46    },
    {      "toiletSn": "1111",      "toiletName": null,      "consumName": "感皂液器-1",      "residue": 35    },
    {      "toiletSn": "1111",      "toiletName": null,      "consumName": "飘香机-1",      "residue": 35    },
    {      "toiletSn": "1111",      "toiletName": null,      "consumName": "干手器-1",      "residue": 22    }
],  "errcode": 0,  "errmsg": "获取耗材剩余量成功",  "success": true}

module.exports = [
    {
      url: '/Api/DataShow/GetStatFlow',
      type: 'get',
      response: param => {
        return responseShowGetStatFlow;
      }
    },
    {
        url: '/Api/DataShow/GetKspUse',
        type: 'get',
        response: param => {
            return responseShowGetKspUse;
        }
    },
    {
        url: '/Api/DataShow/GetEnv',
        type: 'get',
        response: param => {
            return responseShowGetEnv;
        }
    },
    {
        url: '/Api/DataShow/GetAlarm',
        type: 'get',
        response: param => {
            return responseShowGetAlarm;
        }
    },
    {
        url: '/Api/DataShow/GetConsum',
        type: 'get',
        response: param => {
            return responseShowGetConsum;
        }
    }
]