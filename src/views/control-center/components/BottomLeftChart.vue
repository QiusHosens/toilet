<template>
  <div class="bc-chart-item">
    <div class="bcci-header">
      <dv-decoration-3 style="width:200px;height:20px; float:left;" />
      打扫记录
      <dv-decoration-3 style="width:200px;height:20px; float:right;" />
    </div>
    <dv-scroll-ranking-board :config="config" style="width:90%; height:90%; margin-left:30px;" />
  </div>
</template>

<script>
  export default {
    name: 'BottomCharts',
    data() {
      return {
        config: {
          data: [
            {
              name: '春熙路公厕1#',
              value: 55
            },
            {
              name: '世纪城公厕1#',
              value: 120
            },
            {
              name: '世纪城公厕2#',
              value: 78
            },
            {
              name: '骡马市公厕3#',
              value: 66
            },
            {
              name: '天府3街道公厕1#',
              value: 80
            },
            {
              name: '天府3街公厕2#',
              value: 45
            },
            {
              name: '天府5街公厕1#',
              value: 29
            }
          ],
          rowNum: 4
        }
      }
    }
  }
</script>

<style scoped>
  .bc-chart-item {
    width: 50%;
    height: 100%;
    padding-top: 10px;
    box-sizing: border-box;
   
  }
  .bcci-header {
    height: 30px;
    text-align: center;
    line-height: 30px;
    font-size: 20px;
  }
</style>
