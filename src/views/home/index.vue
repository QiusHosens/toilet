<template>
    <div class="home-container">
      <div class="top-container">
        <div class="info-one">
          <div class="info-one-container info-flow">
            <div class="info-title" style="padding-left: 10px;">人流量(次)</div>
            <div class="info-info info-total">{{ reportInfo.totalFlow.total }}</div>
            <div class="info-info info-detail">
              <div class="detail-info-div">
                男
                <span class="info-info-span">{{ reportInfo.totalFlow.totalMale }}</span> 
              </div>
              <div class="detail-info-div">
                女
                <span class="info-info-span">{{ reportInfo.totalFlow.totalFemale }}</span> 
              </div>
              <div class="detail-info-div">
                第三
                <span class="info-info-span">{{ reportInfo.totalFlow.totalThree }}</span> 
              </div>
            </div>
          </div>
        </div>
        <div class="info-one">
          <div class="info-one-container info-squat">
            <div class="info-title" style="padding-left: 10px;">厕位(次)</div>
            <div class="info-info info-total">{{ reportInfo.totalKspUse.total }}</div>
            <div class="info-info info-detail">
              <div class="detail-info-div">
                男
                <span class="info-info-span">{{ reportInfo.totalKspUse.totalMale }}</span> 
              </div>
              <div class="detail-info-div">
                女
                <span class="info-info-span">{{ reportInfo.totalKspUse.totalFemale }}</span> 
              </div>
              <div class="detail-info-div">
                第三
                <span class="info-info-span">{{ reportInfo.totalKspUse.totalThree }}</span> 
              </div>
            </div>
          </div>
        </div>
        <div class="info-one">
          <div class="info-one-container info-energy">
            <div class="info-title" style="padding-left: 10px;">水电</div>
            <div class="info-detail-energy">
              <div class="info-detail-energy-one">
                <div class="info-energy-title">用水量</div>
                <div class="info-detail-energy-num">{{ reportInfo.totalWaterAndElec.totalWater }}</div>
              </div>
              <div class="info-detail-energy-one">
                <div class="info-energy-title">用电量</div>
                <div class="info-detail-energy-num">{{ reportInfo.totalWaterAndElec.totalElec }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="info-one">
          <div class="info-one-container info-warn">
            <div class="info-title" style="padding-left: 10px;">告警(次)</div>
            <div class="info-info info-total">{{ reportInfo.totalAlarm.total }}</div>
            <div class="info-info info-detail">
              <div class="detail-info-div">
                SOS
                <span class="info-info-span">{{ reportInfo.totalAlarm.totalSos }}</span> 
              </div>
              <div class="detail-info-div">
                烟雾
                <span class="info-info-span">{{ reportInfo.totalAlarm.totalSos }}</span> 
              </div>
              <div class="detail-info-div">
                阻塞
                <span class="info-info-span">{{ reportInfo.totalAlarm.totalSos }}</span> 
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom-container">
        <div class="bottom-left-container">
          <div ref="flow" class="flow-container"></div>
          <div ref="evaluate" class="evaluate-container"></div>
        </div>
        <div id="home-map" class="home-map"></div>
        <div class="bottom-right-container">
          <div class="info-consum-one" v-for="(item, index) in consumList" :key="index">
            <div class="info-consum-one-container">
              <div class="info-title-consum">{{ item.name }}</div>
              <div class="consum-detail">
                <div class="consum-detail-one">
                  {{ item.totalUse }}
                </div>
                <div class="consum-detail-one">
                  {{ item.totalChange }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    import { getToiletLocations } from '@/api/toilet';
    import { getStatMasterData } from '@/api/report';
    import echarts from 'echarts';
    require('echarts/theme/macarons') // echarts theme
    import { getStatFlow, getStatEva } from '@/api/show'

    export default {
        name: "Home",
        data() {
            return {
              consumList: [
                {
                  name: '大卷纸巾盒',
                  totalChange: 0,
                  totalUse: 0
                },
                {
                  name: '擦手纸巾盒',
                  totalChange: 0,
                  totalUse: 0
                },
                {
                  name: '感应出纸机',
                  totalChange: 0,
                  totalUse: 0
                },
                {
                  name: '感应皂液器',
                  totalChange: 0,
                  totalUse: 0
                },
                {
                  name: '飘香机',
                  totalChange: 0,
                  totalUse: 0
                },
                {
                  name: '干手器',
                  totalChange: 0,
                  totalUse: 0
                }
              ],
              reportInfo: {
                totalAlarm: {
                  total: 0,
                  totalSmoke: 0, 
                  totalSos: 0, 
                  totalBlockUp: 0
                },
                totalFlow: {
                  total: 0, 
                  totalThree: 0, 
                  totalMale: 0, 
                  totalFemale: 0
                },
                totalKspUse: {
                  total: 0, 
                  totalThree: 0, 
                  totalMale: 0, 
                  totalFemale: 0
                },
                totalWaterAndElec: {
                  totalWater: 0, 
                  totalElec: 0
                }
              },
              map: null,
              center: [], // 纬度,经度
              zoom: null,
              markers: [],
              markerInfos: [],

              initDataSuccess: false,
              initMapSuccess: false
            };
        },

        methods: {
            init() {
              let address = "";
              let that = this;
              var center = new qq.maps.LatLng(34.754152, 113.667636);
              var map = new qq.maps.Map(document.getElementById('home-map'), {
                center: center,
                zoom: 10,
                mapStyleId: 'style2'  // 该key绑定的style1对应于经典地图样式，若未绑定将弹出无权限提示窗
              });

              var marker = new qq.maps.Marker({
                position: center,
                map: map
              });

              var infoWin = new qq.maps.InfoWindow({
                map: map
              });

              var geocoder = new qq.maps.Geocoder({
                complete: function (res) {
                  console.log(res);
                  address = res.detail.nearPois[0].name;
                }
              });

              qq.maps.event.addListener(map, "click", (event) => {
                this.longitude = event.latLng.getLat();
                this.latitude = event.latLng.getLng();
                console.log(event);
                let lat = new qq.maps.LatLng(this.longitude, this.latitude);
                geocoder.getAddress(lat);

                setTimeout(() => {
                  infoWin.open();
                  infoWin.setContent(
                    '<div style="text-align:center;white-space:nowrap;">' +
                    address +
                    "</div>"
                  );

                  infoWin.setPosition(event.latLng);

                  debugger

                  this.$router.push({
                    path: '/control/toiletCenter',
                    query: {
                      tioletSn: 'M000989'
                    }
                  })

                }, 200);
              });
            },
            initMap() {
              this.map = new qq.maps.Map('home-map', {
                mapStyleId: 'style1',  // 该key绑定的style1对应于经典地图样式，若未绑定将弹出无权限提示窗
                zoomControl: false,
                panControl: false
              });

              var listener = qq.maps.event.addListener(this.map, 'tilesloaded', () => {
                    this.initMapSuccess = true;
                    this.initMarkers();
                }
              );
            },
            setCenter(lat, lng) {
              this.map.setCenter(this.getLatLng(lat, lng));
            },
            setZoom(zoom) {
              this
              if (this.zoom) {
                this.map.setZoom(this.zoom);
              }
            },
            getLatLng(lat, lng) {
              return new qq.maps.LatLng(lat, lng)
            },
            initDatas() {
              getToiletLocations().then(res => {
                this.markerInfos = res;
                this.initDataSuccess = true;
                this.initMarkers();
              });
            },
            initMarkers() {
              if (this.initDataSuccess && this.initMapSuccess) {
                this.markerInfos.forEach(markerInfo => {
                  this.initMarker(markerInfo);
                });
                this.map.fitBounds(this.getBounds(this.markerInfos));
              }
            },
            initMarker(markerInfo) {
              var marker = new qq.maps.Marker({
                position: this.getLatLng(markerInfo.latitude, markerInfo.longitude),
                map: this.map,
                title: markerInfo.toiletName,
                sn: markerInfo.toiletCode
              });
              qq.maps.event.addListener(marker, 'click', event => {
                  this.$router.push({
                    path: '/control/toiletCenter',
                    query: {
                      tioletSn: event.target.sn
                    }
                  })
              })
              this.markers.push(marker);
            },
            getBounds(markerInfos) {
              let minLng = 180;
              let maxLng = 0;
              let minLat = 180;
              let maxLat = 0;
              for (let markerInfo of markerInfos) {
                if (markerInfo.longitude < minLng) {
                  minLng = markerInfo.longitude;
                }
                if (markerInfo.longitude > maxLng) {
                  maxLng = markerInfo.longitude;
                }
                if (markerInfo.latitude < minLat) {
                  minLat = markerInfo.latitude;
                }
                if (markerInfo.latitude > maxLat) {
                  maxLat = markerInfo.latitude;
                }
              }
              return new qq.maps.LatLngBounds(this.getLatLng(minLat, minLng), this.getLatLng(maxLat, maxLng));
            },
            getReportInfos() {
              getStatMasterData().then(res => {
                this.reportInfo = res;
                this.reportInfo.totalAlarm.total = this.reportInfo.totalAlarm.totalSmoke + this.reportInfo.totalAlarm.totalSos + this.reportInfo.totalAlarm.totalBlockUp;
              });
            },
            initFlow() {
              let flowCharts = echarts.init(this.$refs.flow, 'macarons');

              getStatFlow().then(res => {
                let xAxis = ['product'];
                // let manDatas = [];
                // let womanDatas = [];
                // let thirdDatas = [];
                // let max = 0;

                let dataset = [['product', '男', '女', '第三']];
                
                for (let one of res) {
                  xAxis.push(one.statTime);
                  let data = [one.statTime];
                  for (let oneType of one.data) {
                    if (oneType.toiletType == 1) {
                      data.push(oneType.dateIn);
                    } else if (oneType.toiletType == 2) {
                      data.push(oneType.dateIn);
                    } else if (oneType.toiletType == 3) {
                      data.push(oneType.dateIn);
                    } 
                  }
                  dataset.push(data);
                }

                let option = {
                    legend: {},
                    tooltip: {},
                    dataset: {
                        source: dataset
                    },
                    xAxis: {type: 'category'},
                    yAxis: {
                      type: 'value',
                      name: '/千人次',
                      axisLabel: {
                          formatter: function (a) {
                              a = +a;
                              return isFinite(a)
                                  ? echarts.format.addCommas(+a / 1000)
                                  : '';
                          }
                      }
                    },
                    // Declare several bar series, each will be mapped
                    // to a column of dataset.source by default.
                    series: [
                        {type: 'bar'},
                        {type: 'bar'},
                        {type: 'bar'}
                    ]
                };
                flowCharts.setOption(option);
              });
            },
            initEvaluate() {
              let evaluateCharts = echarts.init(this.$refs.evaluate, 'macarons');
              getStatEva().then(res => {
                let data = [];
                for (let one of res) {
                  data.push({
                    value: one.evaCount,
                    name: one.evaText
                  })
                }
                let option = {
                    tooltip: {
                        type: 'showTip',
                        x: 0,
                        y: 0,
                        formatter: function(arg) {
                          return arg.name + ':' + arg.value
                        }
                    },
                    legend: {
                        orient: 'horizontal',
                        left: 'top',
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: '80%',
                            hoverAnimation: false,
                            label: {
                                show: false,
                            },
                            labelLine: {
                                show: false
                            },
                            data: data,
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
                evaluateCharts.setOption(option);
              });
            }
        },
        mounted() {
            this.initMap();
            this.initDatas();
            this.getReportInfos();
            this.initFlow();
            this.initEvaluate();
        }
    }
</script>

<style lang="less" scoped>
    .home-container {
        position: relative;
        width: 100%;
        height: 100%;
        padding: 15px;

        .top-container {
          width: 100%;
          height: 116px;

          :first-child {
            padding-left: 0;
          }
        }

        .bottom-container {
          width: 100%;
          height: calc(~"100% - 116px");
          padding-top: 10px;
          display: flex;

          .bottom-left-container {
            width: 300px;
            height: 100%;
            padding-right: 10px;

            .flow-container {
              width: 100%;
              height: calc(~"100% - 277px");
            }

            .evaluate-container {
              width: 100%;
              height: 267px;
              margin-top: 10px
            }
          }

          .home-map {
            width: calc(~"100% - 400px");
            height: 100%;
          }

          .bottom-right-container {
            width: 200px;
            height: 100%;
            padding-left: 10px;

            :first-child {
              padding-top: 0;
            }
          }
        }
      }

      .info-one {
        float: left;
        width: 25%;
        height: 100%;
        padding-left: 10px;
        color: white;
        
        opacity: 0.9;

        // border-radius: 3px;

        .info-one-container {
          width: 100%;
          height: 100%;
        }
      }

      .info-flow {
        background-color: #293263;
      }

      .info-squat {
        background-color: #6e6f0e;
      }

      .info-consum {
        background-color: #1f2544;
      }

      .info-energy {
        background-color: #0b630d;
      }

      .info-warn {
        background-color: #7d2e2e;
      }

      .info-title {
        height: 40px;
        border-bottom: 1px solid;
        padding-left: 10px;
        line-height: 40px;
      }

      .info-total {
        font-size: 28px;
        height: 48px;
        line-height: 48px;
      }

      .info-info {
        padding: 0px 10px;
      }

      .info-detail {
        float: left;
        width: 100%;

        .detail-info-div {
          float: left;
          width: 33.333333%;
          padding: 5px;

          border-right: 1px solid #999;

          &:first-child {
            padding-left: 0px;
          }

          &:last-child {
            border-right: unset;
            padding-right: 0px;
          }

          // .info-info-span {
          //   font-size: 14px;
          // }
        }
      }

      .info-detail-energy {
        float: left;
        width: 100%;
        height: calc(~"100% - 40px");

        .info-detail-energy-one {
          float: left;
          width: 50%;
          height: 100%;
          text-align: center;

          border-right: 1px solid #999;

          &:last-child {
            border-right: unset;
          }
        }

        .info-energy-title {
          height: 48x;
          line-height: 48px;
        }
      }

      .info-consum-one {
        float: left;
        width: 100%;
        height: 16.666666%;
        color: white;
        padding-top: 10px;
        
        opacity: 0.9;

        .info-consum-one-container {
          width: 100%;
          height: 100%;
          background-color: #646398;

          .info-title-consum {
            width: 100%;
            height: 67%;
            text-align: center;

            display: flex;
            justify-content: center;
            align-items: center;
          }

          .consum-detail {
            float: left;
            width: 100%;
            height: 33%;
            text-align: center;

            display: flex;
            justify-content: center;
            align-items: center;

            .consum-detail-one {
              float: left;

              width: 50%;
              height: 100%;

              border-right: 1px solid #999;

              &:last-child {
                border-right: unset;
              }
            }
          }
        }
      }
    // }
</style>