<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      default: null
    },
    option: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    },
    option: {
      deep: true,
      handler(val) {
        this.chart.setOption(val);
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    resize() {
      this.chart.getDom().style.width = this.width;
      this.chart.resize();
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      if (this.option) {
        this.chart.setOption(this.option);
      } else if (this.chartData) {
        this.setOptions(this.chartData)
      }
    },
    setOptions({ xAxisData, datas } = {}) {
      let series = [];
      let legends = [];
      for (let data of datas) {
        legends.push(data.name);
        series.push({
            name: data.name, 
            itemStyle: {
              normal: {
                color: data.color,
                lineStyle: {
                  color: data.color,
                  width: 2
                }
              }
            },
            smooth: true,
            type: 'line',
            data: data.data,
            animationDuration: 2800,
            animationEasing: 'cubicInOut'
          });
      }
      this.chart.setOption({
        xAxis: {
          data: xAxisData, // ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: legends
        },
        series: series
      })
    }
  }
}
</script>
