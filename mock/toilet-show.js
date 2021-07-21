const responseShowSingleToiletKspUse = {  
    "data": {    
        "manTotal": 36,    
        "manResidue": 19,    
        "manUse": 17,    
        "femaleTotal": 36,    
        "femaleResidue": 18,    
        "femaleUse": 18,    
        "threeUse": 7,    
        "mbUse": 0,    
        "kspInfo": [      {        "toiletType": 1,        "kspCode": 2,        "kspUse": 0      },
                        {        "toiletType": 1,        "kspCode": 5,        "kspUse": 0      },
                        {        "toiletType": 1,        "kspCode": 6,        "kspUse": 0      },
                        {        "toiletType": 1,        "kspCode": 7,        "kspUse": 1      },
                        {        "toiletType": 1,        "kspCode": 8,        "kspUse": 0      },
                        {        "toiletType": 1,        "kspCode": 10,        "kspUse": 0      },
                        {        "toiletType": 1,        "kspCode": 13,        "kspUse": 1      },
                        {        "toiletType": 1,        "kspCode": 14,        "kspUse": 0      },
                        {        "toiletType": 1,        "kspCode": 16,        "kspUse": 0      },
                        {        "toiletType": 1,        "kspCode": 17,        "kspUse": 1      },
                        {        "toiletType": 1,        "kspCode": 18,        "kspUse": 0      },
                        {        "toiletType": 1,        "kspCode": 29,        "kspUse": 1      },
                        {        "toiletType": 1,        "kspCode": 30,        "kspUse": 1      },
                        {        "toiletType": 1,        "kspCode": 33,        "kspUse": 1      },
                        {        "toiletType": 1,        "kspCode": 35,        "kspUse": 1      },
                        {        "toiletType": 2,        "kspCode": 2,        "kspUse": 1      },
                        {        "toiletType": 2,        "kspCode": 3,        "kspUse": 1      },
                        {        "toiletType": 2,        "kspCode": 4,        "kspUse": 1      },
                        {        "toiletType": 2,        "kspCode": 6,        "kspUse": 1      },
                        {        "toiletType": 2,        "kspCode": 8,        "kspUse": 0      },
                        {        "toiletType": 2,        "kspCode": 9,        "kspUse": 1      },
                        {        "toiletType": 2,        "kspCode": 12,        "kspUse": 0      },
                        {        "toiletType": 2,        "kspCode": 13,        "kspUse": 1      },
                        {        "toiletType": 2,        "kspCode": 14,        "kspUse": 0      },
                        {        "toiletType": 2,        "kspCode": 15,        "kspUse": 1      },
                        {        "toiletType": 2,        "kspCode": 18,        "kspUse": 1      },
                        {        "toiletType": 2,        "kspCode": 19,        "kspUse": 1      },
                        {        "toiletType": 2,        "kspCode": 21,        "kspUse": 1      },
                        {        "toiletType": 2,        "kspCode": 22,        "kspUse": 1      },
                        {        "toiletType": 2,        "kspCode": 23,        "kspUse": 0      },
                        {        "toiletType": 2,        "kspCode": 24,        "kspUse": 1      },
                        {        "toiletType": 2,        "kspCode": 25,        "kspUse": 0      },
                        {        "toiletType": 2,        "kspCode": 27,        "kspUse": 0      },
                        {        "toiletType": 2,        "kspCode": 32,        "kspUse": 0      },
                        {        "toiletType": 2,        "kspCode": 33,        "kspUse": 1      }
        ]
    },  "errcode": 0,  "errmsg": "获取单个厕位使用情况成功",  "success": true}

const responseShowSingleToiletKspEnv = {  
    "data": [    
        {      
            "toiletSn": "abc123456781",      
            "toiletName": null,      
            "toiletType": 1,      
            "temp": 18,      
            "humi": 28,      
            "pm25": 42,      
            "h2s": 22,      
            "nh3": 23,      
            "voc": 0,      
            "co2": 0,      
            "ch2o": 0,      
            "lux": 0    
        },
        {      "toiletSn": "abc123456781",      "toiletName": null,      "toiletType": 2,      "temp": 12,      "humi": 33,      "pm25": 48,      "h2s": 16,      "nh3": 43,      "voc": 0,      "co2": 0,      "ch2o": 0,      "lux": 0    },
        {      "toiletSn": "abc123456781",      "toiletName": null,      "toiletType": 3,      "temp": 16,      "humi": 30,      "pm25": 28,      "h2s": 20,      "nh3": 21,      "voc": 0,      "co2": 0,      "ch2o": 0,      "lux": 0    }
    ],  "errcode": 0,  "errmsg": "获取单个厕所环境指标成功",  "success": true}

const responseShowSingleToiletConsum = {  
    "data": [    
        {      
            "toiletSn": "1111",      
            "toiletName": null,      
            "consumName": "擦手纸巾盒-2",      
            "residue": 46,      
            "bat": 1    
        },
        {      "toiletSn": "1111",      "toiletName": null,      "consumName": "大卷纸巾盒-1",      "residue": 50,      "bat": 45    },
        {      "toiletSn": "1111",      "toiletName": null,      "consumName": "擦手纸巾盒-1",      "residue": 50,      "bat": 45    },
        {      "toiletSn": "1111",      "toiletName": null,      "consumName": "感应出纸机-1",      "residue": 50,      "bat": 45    },
        {      "toiletSn": "1111",      "toiletName": null,      "consumName": "感皂液器-1",      "residue": 50,      "bat": 45    },
        {      "toiletSn": "1111",      "toiletName": null,      "consumName": "飘香机-1",      "residue": 50,      "bat": 45    },
        {      "toiletSn": "1111",      "toiletName": null,      "consumName": "干手器-1",      "residue": 50,      "bat": 45    },
        {      "toiletSn": "1111",      "toiletName": null,      "consumName": "擦手纸巾盒-2",      "residue": 80,      "bat": 1    },
        {      "toiletSn": "1111",      "toiletName": null,      "consumName": "大卷纸巾盒-1",      "residue": 80,      "bat": 45    },
        {      "toiletSn": "1111",      "toiletName": null,      "consumName": "擦手纸巾盒-1",      "residue": 80,      "bat": 45    },
        {      "toiletSn": "1111",      "toiletName": null,      "consumName": "感应出纸机-1",      "residue": 80,      "bat": 45    },
        {      "toiletSn": "1111",      "toiletName": null,      "consumName": "感皂液器-1",      "residue": 80,      "bat": 45    },
        {      "toiletSn": "1111",      "toiletName": null,      "consumName": "飘香机-1",      "residue": 80,      "bat": 45    }
],  "errcode": 0,  "errmsg": "获取单个厕所耗材信息成功",  "success": true}

const responseShowSingleToiletWaterAndElec = {  
    "data": [    
        {      
            "statTime": "202105",      
            "totalWater": 676,      
            "totalElc": 355    
        },
        {      "statTime": "202106",      "totalWater": 234,      "totalElc": 345    },
        {      "statTime": "202107",      "totalWater": 233,      "totalElc": 234    }
],  "errcode": 0,  "errmsg": "获取单个厕所水电信息成功",  "success": true}

const responseShowSingleToiletEvaluate = {  
    "data": [    
        {      
            "statTime": null,      
            "evaType": 0,      
            "evaText": "非常好",      
            "evaLevel": 4,      
            "evaCount": 182    
        },
        {      "statTime": null,      "evaType": 0,      "evaText": "好",      "evaLevel": 3,      "evaCount": 71    },
        {      "statTime": null,      "evaType": 0,      "evaText": "一般",      "evaLevel": 2,      "evaCount": 122    },
        {      "statTime": null,      "evaType": 0,      "evaText": "差",      "evaLevel": 1,      "evaCount": 57    }
],  "errcode": 0,  "errmsg": "获取单个厕所评价信息成功",  "success": true}

module.exports = [
    {
      url: '/Api/DataShow/GetSingleToiletKspUse',
      type: 'get',
      response: param => {
        return responseShowSingleToiletKspUse;
      }
    },
    {
        url: '/Api/DataShow/GetSingleToiletKspEnv',
        type: 'get',
        response: param => {
          return responseShowSingleToiletKspEnv;
        }
    },
    {
        url: '/Api/DataShow/GetSingleToiletConsum',
        type: 'get',
        response: param => {
          return responseShowSingleToiletConsum;
        }
    },
    {
        url: '/Api/DataShow/GetSingleToiletWaterAndElec',
        type: 'get',
        response: param => {
          return responseShowSingleToiletWaterAndElec;
        }
    },
    {
        url: '/Api/DataShow/GetSingleToiletEvaluate',
        type: 'get',
        response: param => {
          return responseShowSingleToiletEvaluate;
        }
    }
]