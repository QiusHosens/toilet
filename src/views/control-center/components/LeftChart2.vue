<template>
  <div class="top-right-cmp">
    <div class="dc-toilet-text">
      蹲位使用情况
      <dv-decoration-3 style="width:200px;height:20px;" />
    </div>
    <div class="chart-container">
      <!-- <dv-water-level-pond :config="config" /> -->
      <div class="toilet-chart-content">
        <div class="toilet-chart-content-title">男</div>
        <dv-percent-pond v-if="show" class="toilet-chart-content-detail" :config="manConfig"/>
      </div>
      <div class="toilet-chart-content">
        <div class="toilet-chart-content-title">女</div>
        <dv-percent-pond v-if="show" class="toilet-chart-content-detail" :config="womanConfig"/>
      </div>
      <!-- <dv-charts :option="option" /> -->
    </div>
    <dv-decoration-2 style="height:10px;" />
  </div>
</template>

<script>
  import { getKspUse } from '@/api/show'

  export default {
    name: 'WaterLevelChart',
    data() {
      return {
        manConfig: null,
        womanConfig: null,
        interval: null,
        show: true,
      }
    },
    mounted() {
      window.onresize = e => {
          // this.isFull = !this.isFull;
          this.show = false;
          setTimeout(() => {
            this.show = true;
          });
      };
      this.getData();
      this.interval = setInterval(() => {
        this.getData();
      }, 60 * 1000);
    },
    destroyed() {
      if (this.interval) {
        clearInterval(this.interval);
      }
    },
    methods: {
      getData() {
        getKspUse().then(res => {
          // this.config = this.getConfig(res * 100);
          // let xAxis = [ '' ];
          // let manDatas = [ res.useMan * 100 ];
          // let womanDatas = [ res.useFemale * 100 ];
          // let max = 100;
          // debugger
          // this.option = this.getOptions(xAxis, manDatas, womanDatas, max);

          this.manConfig = {
            value: (res.useMan * 100).toFixed(0),
            colors: ['#1BA3FC']
          }
          this.womanConfig = {
            value: (res.useFemale * 100).toFixed(0),
            colors: ['#FC28F4']
          }
        })
      },
      getConfig(data) {
        return {
          data: [ data ],
          shape: 'round',
          waveHeight: 25,
          waveNum: 2
        };
      },
      getOptions(xAxis, manDatas, womanDatas, max) {
        return {
          legend: {
            data: [
              {
                name: '男',
                color: '#4169E1'
              },
              {
                name: '女',
                color: '#DC143C'
              }
            ],
            textStyle: {
              fill: '#fff'
            }
          },
          xAxis: {
            data: xAxis, // [ '10/01', '10/02', '10/03', '10/04', '10/05', '10/06', '10/07' ],
            axisLine: {
              style: {
                stroke: '#BFBFBF'
              }
            },
            axisLabel: {
              style: {
                fill: '#BFBFBF'
              }
            },
            axisTick: {
              show: false
            }
          },
          yAxis: {
            data: 'value',
            splitLine: {
              show: false
            },
            axisLine: {
              style: {
                stroke: '#BFBFBF'
              }
            },
            axisLabel: {
              style: {
                fill: '#BFBFBF'
              }
            },
            axisTick: {
              show: false
            },
            min: 0,
            max: max
          },
          series: [
            {
              name: '男',
              data: manDatas, // [ 300, 260, 345, 456, 467, 700, 245 ],
              type: 'bar',
              barStyle: {
                fill: '#4169E1'
              }
            },
            {
              name: '女',
              data: womanDatas, // [ 150, 260, 370, 367, 257, 689, 72 ],
              type: 'bar',
              barStyle: {
                fill: '#DC143C'
              }
            }
          ]
        };
      }
    }
  }
</script>

<style lang="less" scoped>
  .top-right-cmp {
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: column;
    .chart-name

  {
    position: absolute;
    right: 70px;
    text-align: right;
    font-size: 20px;
    top: 20px;
  }

  .chart-container {
    flex: 1;
    width: 100%;
    height: calc(~"100% - 70px");
    // display: flex;
    // justify-content: center;
    // align-items: center;

    .toilet-chart-content {
      width: calc(~"100% - 20px");
      height: calc(~"50% - 20px");
      margin: 10px;

      display: flex;
      justify-content: center;
      align-items: center;

      .toilet-chart-content-title {
        width: 40px;
        // height: 100%;
      }

      .toilet-chart-content-detail {
        width: calc(~"100% - 40px");
        height: 100%;
        float: right;
      }
    }
  }

  .dv-water-pond-level {
    max-width: 80%;
    margin-top:40px;
    width: 140px;
    height: 140px;
    border: 10px solid #19c3eb;
    border-radius: 50%;
    ellipse

  {
    stroke: transparent !important;
  }

  text {
    font-size: 20px;
  }

  }

  .dc-toilet-text {
    display: flex;
    flex-direction: column;
    height: 70px;
    font-size: 20px;
    padding: 5px;
    box-sizing: border-box;
  }
  }
</style>
