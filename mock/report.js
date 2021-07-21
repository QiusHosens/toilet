const responseReportFlow = {  "data": [    {      "statTime": "20212",      "data": [        {          "statTime": "20212",          "toiletType": 1,          "dateIn": 6112783        },
{          "statTime": "20212",          "toiletType": 2,          "dateIn": 5372179        },
{          "statTime": "20212",          "toiletType": 3,          "dateIn": 5797175        }
],      "totalNum": 17282137    },
{      "statTime": "20213",      "data": [        {          "statTime": "20213",          "toiletType": 1,          "dateIn": 3307245        },
{          "statTime": "20213",          "toiletType": 2,          "dateIn": 2934279        },
{          "statTime": "20213",          "toiletType": 3,          "dateIn": 3307954        }
],      "totalNum": 9549478    },
{      "statTime": "20214",      "data": [        {          "statTime": "20214",          "toiletType": 1,          "dateIn": 4111009        },
{          "statTime": "20214",          "toiletType": 2,          "dateIn": 3951660        },
{          "statTime": "20214",          "toiletType": 3,          "dateIn": 3737930        }
],      "totalNum": 11800599    }
],  "errcode": 0,  "errmsg": "获取人流量统计成功",  "success": true}

const responseReportKsp = {  "data": [    {      "statTime": "2021",      "data": [        {          "statTime": "2021",          "toiletType": 1,          "totalUse": 11136552        },
{          "statTime": "2021",          "toiletType": 2,          "totalUse": 14229392        },
{          "statTime": "2021",          "toiletType": 3,          "totalUse": 13266319        }
],      "totalNum": 38632263    }
],  "errcode": 0,  "errmsg": "获取蹲位统计成功",  "success": true}

const responseReportStatWaterAndElec = {  "data": [    {      "statTime": "202105",      "totalWater": 676,      "totalElc": 355    },
{      "statTime": "202106",      "totalWater": 234,      "totalElc": 345    },
{      "statTime": "202107",      "totalWater": 233,      "totalElc": 234    },
{      "statTime": "202108",      "totalWater": 34,      "totalElc": 12    },
{      "statTime": "202109",      "totalWater": 34,      "totalElc": 223    },
{      "statTime": "202110",      "totalWater": 25,      "totalElc": 34    },
{      "statTime": "202111",      "totalWater": 3,      "totalElc": 2    },
{      "statTime": "202112",      "totalWater": 3,      "totalElc": 2    }
],  "errcode": 0,  "errmsg": "获取水电统计成功",  "success": true}

const responseReportStatEnv = {  
    "data": [    
        {      
            "statTime": "2021100115",      
            "data": [        
                {          
                    "statTime": "2021100115",         
                    "toiletType": 1,         
                    "temp": 14,          
                    "humi": 29,          
                    "pm25": 35,          
                    "h2s": 54,          
                    "nh3": 53,          
                    "voc": 0,          
                    "co2": 0,          
                    "ch2o": 0,          
                    "lux": 0        
                },
                {          
                    "statTime": "2021100115",          
                    "toiletType": 2,          
                    "temp": 19,          
                    "humi": 38,          
                    "pm25": 50,          
                    "h2s": 49,          
                    "nh3": 50,          
                    "voc": 0,          
                    "co2": 0,          
                    "ch2o": 0,          
                    "lux": 0        
                },
                {          
                    "statTime": "2021100115",          
                    "toiletType": 3,          
                    "temp": 19,          
                    "humi": 39,          
                    "pm25": 51,          
                    "h2s": 39,          
                    "nh3": 45,          
                    "voc": 0,          
                    "co2": 0,          
                    "ch2o": 0,          
                    "lux": 0        
                }
            ],      
            "totalNum": 0   
        },
        {      
            "statTime": "2021100116",      
            "data": [        
                {          
                    "statTime": "2021100115",         
                    "toiletType": 1,         
                    "temp": 14,          
                    "humi": 29,          
                    "pm25": 35,          
                    "h2s": 54,          
                    "nh3": 53,          
                    "voc": 0,          
                    "co2": 0,          
                    "ch2o": 0,          
                    "lux": 0        
                },
                {          
                    "statTime": "2021100115",          
                    "toiletType": 2,          
                    "temp": 19,          
                    "humi": 38,          
                    "pm25": 50,          
                    "h2s": 49,          
                    "nh3": 50,          
                    "voc": 0,          
                    "co2": 0,          
                    "ch2o": 0,          
                    "lux": 0        
                },
                {          
                    "statTime": "2021100115",          
                    "toiletType": 3,          
                    "temp": 19,          
                    "humi": 39,          
                    "pm25": 51,          
                    "h2s": 39,          
                    "nh3": 45,          
                    "voc": 0,          
                    "co2": 0,          
                    "ch2o": 0,          
                    "lux": 0        
                }
            ],      
            "totalNum": 0   
        }
    ],  "errcode": 0,  "errmsg": "获取环境指标统计成功",  "success": true}

const responseReportConsumResidue = {  "data": [    
    {      
        "toiletSn": "1111",      
        "toiletType": 1,      
        "consumName": "大卷纸巾盒-1",      
        "residue": 50,      
        "toiletName": null,      
        "recordTime": 1624241400    
    },
{      "toiletSn": "1111",      "toiletType": 1,      "consumName": "干手器-1",      "residue": 22,      "toiletName": null,      "recordTime": 1621649400    },
{      "toiletSn": "1111",      "toiletType": 1,      "consumName": "感应出纸机-1",      "residue": 46,      "toiletName": null,      "recordTime": 1624241400    },
{      "toiletSn": "1111",      "toiletType": 1,      "consumName": "感皂液器-1",      "residue": 35,      "toiletName": null,      "recordTime": 1624241400    },
{      "toiletSn": "1111",      "toiletType": 1,      "consumName": "擦手纸巾盒-1",      "residue": 45,      "toiletName": null,      "recordTime": 1624241400    },
{      "toiletSn": "1111",      "toiletType": 1,      "consumName": "擦手纸巾盒-2",      "residue": 46,      "toiletName": null,      "recordTime": 1624241400    },
{      "toiletSn": "1111",      "toiletType": 1,      "consumName": "飘香机-1",      "residue": 35,      "toiletName": null,      "recordTime": 1624241400    }
],  "errcode": 0,  "errmsg": "获取耗材余量统计成功",  "success": true}

const responseReportConsum = {  "data": [    
    {      
        "statTime": "202105",      
        "consumName": "大卷纸巾盒-1",      
        "useTimes": 7,      
        "replaceTimes": 0    
    },
{      "statTime": "202105",      "consumName": "干手器-1",      "useTimes": 35,      "replaceTimes": 0    },
{      "statTime": "202105",      "consumName": "感应出纸机-1",      "useTimes": 5,      "replaceTimes": 0    },
{      "statTime": "202105",      "consumName": "感皂液器-1",      "useTimes": 8,      "replaceTimes": 0    },
{      "statTime": "202105",      "consumName": "擦手纸巾盒-1",      "useTimes": 5,      "replaceTimes": 0    },
{      "statTime": "202105",      "consumName": "擦手纸巾盒-2",      "useTimes": 5,      "replaceTimes": 0    },
{      "statTime": "202105",      "consumName": "飘香机-1",      "useTimes": 335,      "replaceTimes": 0    },
{      "statTime": "202106",      "consumName": "大卷纸巾盒-1",      "useTimes": 7,      "replaceTimes": 0    },
{      "statTime": "202106",      "consumName": "感应出纸机-1",      "useTimes": 5,      "replaceTimes": 0    },
{      "statTime": "202106",      "consumName": "感皂液器-1",      "useTimes": 9,      "replaceTimes": 0    },
{      "statTime": "202106",      "consumName": "擦手纸巾盒-1",      "useTimes": 24,      "replaceTimes": 0    },
{      "statTime": "202106",      "consumName": "擦手纸巾盒-2",      "useTimes": 5,      "replaceTimes": 0    },
{      "statTime": "202106",      "consumName": "飘香机-1",      "useTimes": 335,      "replaceTimes": 0    }
],  "errcode": 0,  "errmsg": "获取耗材统计成功",  "success": true}

const responseReportStatEvaluate = {  
    "data": [    
        {      
            "statTime": "202104",      
            "data": [        
                {          
                    "statTime": "202104",          
                    "evaType": 0,          
                    "evaText": "差",          
                    "evaLevel": 1,          
                    "evaCount": 3        
                },
{          "statTime": "202104",          "evaType": 0,          "evaText": "一般",          "evaLevel": 2,          "evaCount": 5        },
{          "statTime": "202104",          "evaType": 0,          "evaText": "好",          "evaLevel": 3,          "evaCount": 4        },
{          "statTime": "202104",          "evaType": 0,          "evaText": "非常好",          "evaLevel": 4,          "evaCount": 6        }
]
},
{      "statTime": "202105",      "data": [        {          "statTime": "202105",          "evaType": 0,          "evaText": "差",          "evaLevel": 1,          "evaCount": 4        },
{          "statTime": "202105",          "evaType": 0,          "evaText": "一般",          "evaLevel": 2,          "evaCount": 4        },
{          "statTime": "202105",          "evaType": 0,          "evaText": "好",          "evaLevel": 3,          "evaCount": 2        },
{          "statTime": "202105",          "evaType": 0,          "evaText": "非常好",          "evaLevel": 4,          "evaCount": 2        }
]
},
{      "statTime": "202106",      "data": [        {          "statTime": "202106",          "evaType": 0,          "evaText": "差",          "evaLevel": 1,          "evaCount": 4        },
{          "statTime": "202106",          "evaType": 0,          "evaText": "一般",          "evaLevel": 2,          "evaCount": 5        },
{          "statTime": "202106",          "evaType": 0,          "evaText": "好",          "evaLevel": 3,          "evaCount": 4        },
{          "statTime": "202106",          "evaType": 0,          "evaText": "非常好",          "evaLevel": 4,          "evaCount": 7        }
]
},
{      "statTime": "202107",      "data": [        {          "statTime": "202107",          "evaType": 0,          "evaText": "差",          "evaLevel": 1,          "evaCount": 6        },
{          "statTime": "202107",          "evaType": 0,          "evaText": "一般",          "evaLevel": 2,          "evaCount": 3        },
{          "statTime": "202107",          "evaType": 0,          "evaText": "好",          "evaLevel": 3,          "evaCount": 3        },
{          "statTime": "202107",          "evaType": 0,          "evaText": "非常好",          "evaLevel": 4,          "evaCount": 12        }
]
},
{      "statTime": "202108",      "data": [        {          "statTime": "202108",          "evaType": 0,          "evaText": "差",          "evaLevel": 1,          "evaCount": 3        },
{          "statTime": "202108",          "evaType": 0,          "evaText": "一般",          "evaLevel": 2,          "evaCount": 3        },
{          "statTime": "202108",          "evaType": 0,          "evaText": "好",          "evaLevel": 3,          "evaCount": 6        },
{          "statTime": "202108",          "evaType": 0,          "evaText": "非常好",          "evaLevel": 4,          "evaCount": 15        }
]
},
{      "statTime": "202109",      "data": [        {          "statTime": "202109",          "evaType": 0,          "evaText": "差",          "evaLevel": 1,          "evaCount": 3        },
{          "statTime": "202109",          "evaType": 0,          "evaText": "一般",          "evaLevel": 2,          "evaCount": 6        },
{          "statTime": "202109",          "evaType": 0,          "evaText": "好",          "evaLevel": 3,          "evaCount": 7        },
{          "statTime": "202109",          "evaType": 0,          "evaText": "非常好",          "evaLevel": 4,          "evaCount": 17        }
]
},
{      "statTime": "202110",      "data": [        {          "statTime": "202110",          "evaType": 0,          "evaText": "差",          "evaLevel": 1,          "evaCount": 12        },
{          "statTime": "202110",          "evaType": 0,          "evaText": "一般",          "evaLevel": 2,          "evaCount": 24        },
{          "statTime": "202110",          "evaType": 0,          "evaText": "好",          "evaLevel": 3,          "evaCount": 9        },
{          "statTime": "202110",          "evaType": 0,          "evaText": "非常好",          "evaLevel": 4,          "evaCount": 21        }
]
},
{      "statTime": "202111",      "data": [        {          "statTime": "202111",          "evaType": 0,          "evaText": "差",          "evaLevel": 1,          "evaCount": 6        },
{          "statTime": "202111",          "evaType": 0,          "evaText": "一般",          "evaLevel": 2,          "evaCount": 58        },
{          "statTime": "202111",          "evaType": 0,          "evaText": "好",          "evaLevel": 3,          "evaCount": 15        },
{          "statTime": "202111",          "evaType": 0,          "evaText": "非常好",          "evaLevel": 4,          "evaCount": 58        }
]
},
{      "statTime": "202112",      "data": [        {          "statTime": "202112",          "evaType": 0,          "evaText": "差",          "evaLevel": 1,          "evaCount": 16        },
{          "statTime": "202112",          "evaType": 0,          "evaText": "一般",          "evaLevel": 2,          "evaCount": 14        },
{          "statTime": "202112",          "evaType": 0,          "evaText": "好",          "evaLevel": 3,          "evaCount": 7        }
]
}
],  "errcode": 0,  "errmsg": "获取评价统计成功",  "success": true}

const responseReportStatClear = {  
    "data": [    
        {      
            "toiletSn": "abc123456781",      
            "toiletName": null,      
            "toiletType": 1,      
            "startTime": 1619506000000,      
            "timeLimited": 9,      
            "endTime": 0,      
            "clearName": null    
        },
        {      "toiletSn": "abc123456781",      "toiletName": null,      "toiletType": 1,      "startTime": 1619506001000,      "timeLimited": 6,      "endTime": 0,      "clearName": null    },
        {      "toiletSn": "abc123456781",      "toiletName": null,      "toiletType": 1,      "startTime": 1619506002000,      "timeLimited": 2,      "endTime": 0,      "clearName": null    },
        {      "toiletSn": "abc123456781",      "toiletName": null,      "toiletType": 1,      "startTime": 1619506003000,      "timeLimited": 8,      "endTime": 0,      "clearName": null    }
],  "errcode": 0,  "errmsg": "获取打扫记录成功",  "success": true}

module.exports = [
    {
      url: '/Api/Statistcs/GetStatFlow',
      type: 'post',
      response: param => {
        return responseReportFlow;
      }
    },
    {
        url: '/Api/Statistcs/GetStatKsp',
        type: 'post',
        response: param => {
            return responseReportKsp;
        }
    },
    {
        url: '/Api/Statistcs/GetStatWaterAndElec',
        type: 'post',
        response: param => {
            return responseReportStatWaterAndElec;
        }
    },
    {
        url: '/Api/Statistcs/GetStatEnv',
        type: 'post',
        response: param => {
            return responseReportStatEnv;
        }
    },
    {
        url: '/Api/Statistcs/GetStatConsumResidue',
        type: 'post',
        response: param => {
            return responseReportConsumResidue;
        }
    },
    {
        url: '/Api/Statistcs/GetStatConsum',
        type: 'post',
        response: param => {
            return responseReportConsum;
        }
    },
    {
        url: '/Api/Statistcs/GetStatEvaluate',
        type: 'post',
        response: param => {
            return responseReportStatEvaluate;
        }
    },
    {
        url: '/Api/Statistcs/GetStatClear',
        type: 'post',
        response: param => {
            return responseReportStatClear;
        }
    }
]