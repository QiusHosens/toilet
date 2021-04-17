<template>
  <div class="top-right-cmp">
    <div class="dc-text">
      蹲位使用情况
      <dv-decoration-3 style="width:200px;height:20px;" />
    </div>
    <div class="chart-container">
      <dv-water-level-pond :config="config" />
    </div>
    <dv-decoration-2 style="height:10px;" />
  </div>
</template>

<script>
  export default {
    name: 'WaterLevelChart',
    data() {
      return {
        config: {
          data: [45],
          shape: 'round',
          waveHeight: 25,
          waveNum: 2
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
    top: 20px;
  }

  .chart-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
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
