<template>
  <div class="top-right-cmp">
    <div class="dc-text">
      人流量统计
      <dv-decoration-3 style="width:200px;height:20px;" />
    </div>
    <dv-charts class="flow-chart" :option="option" />
    <dv-decoration-2 style="height:10px;" />
  </div>
</template>

<script>
  export default {
    name: 'TopRightCmp',
    data() {
      return {
        option: {
          legend: {
            data: [
              {
                name: '男',
                color: '#4169E1'
              },
              {
                name: '女',
                color: '#DC143C'
              },
              {
                name: '第三',
                color: '#FFFFFF'
              }
            ],
            textStyle: {
              fill: '#fff'
            }
          },
          xAxis: {
            data: [
              '10/01', '10/02', '10/03', '10/04', '10/05', '10/06', '10/07'
            ],
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
            max: 800
          },
          series: [
            {
              name: '男',
              data: [
                300, 260, 345, 456, 467, 700, 245
              ],
              type: 'bar',
              barStyle: {
                fill: '#4169E1'
              }
            },
            {
              name: '女',
              data: [
                150, 260, 370, 367, 257, 689, 72
              ],
              type: 'bar',
              barStyle: {
                fill: '#DC143C'
              }
            },
            {
              name: '第三',
              data: [
                2, 3, 0, 0, 5, 7, 10
              ],
              type: 'bar',
              smooth: true,
              barStyle: {
                fill: '#FFFFFF'
              }
            }
          ]
        }
      }
    }
  }
</script>

<style lang="less">
  .top-right-cmp {
    width: 100%;
    height: 33%;
    display: flex;
    flex-direction: column;
    .chart-name

  {
    position: absolute;
    right: 70px;
    text-align: right;
    font-size: 20px;
    top: 10px;
  }
  .flow-chart {
    height: calc(~"100% - 15px");
  }
  .dc-text {
    display: flex;
    flex-direction: column;
    height: 0%;
    font-size: 20px;
    padding: 5px;
    box-sizing: border-box;
  }
  }
</style>
