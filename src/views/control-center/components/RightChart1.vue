<template>
  <div id="scroll-board">
    <dv-scroll-board :config="config" />
  </div>
</template>

<script>
  import { getEnv } from '@/api/show'

  export default {
    name: 'ScrollBoard',
    data() {
      return {
        config: null,
        interval: null
      }
    },
    mounted() {
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
        getEnv().then(res => {
          let header = ['名称',  '温度', '湿度', 'PM2.5','硫化氢', '氨气', '异味', '二氧化碳', '甲醛', '照明', '除臭系统', '新风系统'];
          let data = [];
          for (let one of res) {
            let oneData = [];
            oneData.push(one.toiletName);
            oneData.push(one.temp.toFixed(1));
            oneData.push(one.humi.toFixed(1));
            oneData.push(one.pm25.toFixed(1));
            oneData.push(one.h2s.toFixed(1));
            oneData.push(one.nh3.toFixed(1));
            oneData.push(one.voc.toFixed(1));
            oneData.push(one.co2.toFixed(1));
            oneData.push(one.ch2o.toFixed(1));
            oneData.push(one.lux.toFixed(1));
            oneData.push('开');
            oneData.push('开');
            data.push(oneData);
          }
          this.config = this.getConfig(header, data);
        });
      },
      getConfig(header, data) {
        return {
          header: header, // ['名称',  '温度', '湿度', 'PM2.5','硫化氢', '氨气', '噪音', '二氧化碳', '甲醛', '照明'],
          data: data,
          // [
          //   ['春熙路公厕1#','23', '15', '45', '24', '35', '15', '45', '24', '35'],
          //   ['春熙路公厕1#', '23', '15', '45', '24', '35', '15', '45', '24', '35'],
          //   ['总府路公厕3#', '22.6', '13', '34', '24', '35', '15', '45', '24', '35'],
          //   ['总府路公厕3#', '22.7', '15', '23', '24', '35', '15', '45', '24', '35'],
          //   ['天府2街公厕1#', '22.6', '13', '34', '24', '35', '15', '45', '24', '35'],
          //   ['天府2街公厕1#', '22.7', '15', '23', '24', '35', '15', '45', '24', '35'],
          //   ['世纪城公厕4#', '22.6', '13', '34', '24', '35', '15', '45', '24', '35'],
          //   ['世纪城公厕4#', '22.7', '15', '23', '24', '35', '15', '45', '24', '35'],
          //   ['世纪城公厕5#', '22.6', '13', '34', '24', '35', '15', '45', '24', '35'],
          //   ['世纪城公厕5#', '22.7', '15', '23', '24', '35', '15', '45', '24', '35'],
          // ],
          columnWidth: [100, 90, 90, 90, 90, 70, 70, 120, 70, 70, 120, 120],
          align: ['center'],
          rowNum: 4,
          headerBGC: 'rgba(44, 44, 44, 0.2)',
          headerHeight: 45,
          oddRowBGC: 'rgba(0, 44, 81, 0.8)',
          evenRowBGC: 'rgba(10, 29, 50, 0.8)'
        };
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
