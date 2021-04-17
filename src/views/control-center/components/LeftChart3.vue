<template>
  <div class="top-right-cmp">
    <div class="dc-text">
      好评率
      <dv-decoration-3 style="width:200px;height:20px;" />
    </div>
    <dv-active-ring-chart :config="config" />
  </div>
</template>
<script>
  import LabelTag from './LabelTag'
  export default {
    name: 'BottomCharts',
    components: {
      LabelTag
    },
    data() {
      return {
        config: {
          data: [
            {
              name: '好评',
              value: 356
            },
            {
              name: '中评',
              value: 215
            },
            {
              name: '差评',
              value: 90
            }
          ],
          color: ['#4169E1', '#DC143C', '#FFFFFF'],
          radius: '75%',
          activeRadius: '80%'
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

  .dv-active-ring-chart {
    margin-top:45px;
    height: 70%;
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
