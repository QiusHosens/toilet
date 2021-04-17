<template>
  <div class="bc-chart-item">
    <div class="bcci-header">
      <dv-decoration-3 style="width:200px;height:20px; float:left;" />
      SOS求救
      <dv-decoration-3 style="width:200px;height:20px; float:right;" />
    </div>
    <dv-scroll-board :config="config" style="width:90%; height:90%; margin-left:30px;" />
  </div>
</template>

<script>
  export default {
    name: 'ScrollBoard',
    data() {
      return {
        config: {
          data: [
            ['春熙路公厕1#男厕所1#蹲位正在SOS求救'],
            ['春熙路公厕1#女厕所7#蹲位正在SOS求救'],
            ['总府路公厕3#男厕所1#蹲位正在SOS求救'],
            ['总府路公厕3#女厕所7#蹲位正在SOS求救'],
            ['天府2街公厕1#女厕所7#蹲位正在SOS求救'],
            ['天府2街公厕1#女厕所7#蹲位正在SOS求救'],
            ['天府2街公厕1#女厕所7#蹲位正在SOS求救'],
            ['天府2街公厕1#女厕所7#蹲位正在SOS求救']
          ],
          align: ['left'],
          rowNum: 4,
          headerHeight: 45,
          headerBGC: '#1981f6',
          oddRowBGC: 'rgba(0, 44, 81, 0.8)',
          evenRowBGC: 'rgba(10, 29, 50, 0.8)'
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
