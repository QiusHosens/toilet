<template>
  <div class="bottom-charts">
    <BottomRightChart />
    <dv-decoration-2 class="decoration-1" :reverse="true" style="width:5px;" />
    <BottomLeftChart />

  </div>
</template>

<script>
  import BottomLeftChart from './BottomLeftChart'
  import BottomRightChart from './BottomRightChart'
  export default {
    name: 'BottomCharts',
    components: {
      BottomLeftChart,
      BottomRightChart
    },
    data() {
        return {};
    }
  }
</script>

<style lang="less">
.bottom-charts {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;

  .decoration-1 {
    display: absolute;
    left: 0%;
  }
}
</style>
