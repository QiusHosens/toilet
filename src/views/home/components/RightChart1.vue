<template>
  <div id="scroll-board">
    <dv-scroll-board :config="config" />
  </div>
</template>

<script>
  export default {
    name: 'ScrollBoard',
    data() {
      return {
        config: {
          header: ['名称',  '温度', '湿度', 'PM2.5','硫化氢', '氨气'],
          data: [
            ['春熙路公厕1#','23', '15', '45', '24', '35'],
            ['春熙路公厕1#', '23', '15', '45', '24', '35'],
            ['总府路公厕3#', '22.6', '13', '34', '24', '35'],
            ['总府路公厕3#', '22.7', '15', '23', '24', '35'],
            ['天府2街公厕1#', '22.6', '13', '34', '24', '35'],
            ['天府2街公厕1#', '22.7', '15', '23', '24', '35'],
            ['世纪城公厕4#', '22.6', '13', '34', '24', '35'],
            ['世纪城公厕4#', '22.7', '15', '23', '24', '35'],
            ['世纪城公厕5#', '22.6', '13', '34', '24', '35'],
            ['世纪城公厕5#', '22.7', '15', '23', '24', '35'],
          ],
          columnWidth: [175, 70, 70, 85, 90, 70],
          align: ['center'],
          rowNum: 7,
          headerBGC: 'rgba(44, 44, 44, 0.2)',
          headerHeight: 45,
          oddRowBGC: 'rgba(0, 44, 81, 0.8)',
          evenRowBGC: 'rgba(10, 29, 50, 0.8)'
        }
      }
    }
  }
</script>

<style lang="less">
  #scroll-board {
    width: 100%;
    box-sizing: border-box;
    margin: 5px;
    font-size:10px;
    height: calc(100%-2px);
    overflow: hidden;
  }
</style>
