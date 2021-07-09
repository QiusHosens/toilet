<template>
  <div class="scroll-board">
    <div class="scroll-switch">
      <span>
        仅显示低于30%的数据
      </span>
      <el-switch class="switch-div"
        v-model="onlyShowLower"
        @change="switchData">
      </el-switch>
    </div>
    <div class="scroll-content">
      <dv-scroll-board :config="config" />
    </div>
  </div>
</template>

<script>
  import { getConsum } from '@/api/show'

  export default {
    name: 'ScrollBoard',
    data() {
      return {
        config: null,
        interval: null,
        onlyShowLower: false,
        data: [],
        header: ['厕所名', '耗材名', '剩余量']
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
        getConsum().then(res => {
          let data = [];
          for (let one of res) {
            let oneData = [];
            oneData.push(one.toiletName);
            if (one.residue < 15) {
              oneData.push('<span style="color:#FF0000;">' + one.consumName + '</span>')
            } else if (one.residue < 30) {
              oneData.push('<span style="color:#FF8C00;">' + one.consumName + '</span>') // #FF8C00
            } else {
              oneData.push(one.consumName);
            }
            oneData.push(one.residue.toFixed(0) + '%');
            data.push(oneData);
          }
          this.data = data;

          this.config = this.getConfig(this.header, data);
        });
      },
      switchData(value) {
        let data = [];
        if (value) {
          data = this.data.filter(one => one[2] < 30);
        } else {
          data = this.data;
        }
        this.config = this.getConfig(this.header, data);
      },
      getConfig(header, data) {
        return {
          header: header, // ['名称',  '卫生纸', '洗手液', '喷香','垃圾桶', '干手器', '用水', '用电'],
          data: data,
          // [
          //   ['春熙路公厕1#','23', '15', '45', '24', '35', '15', '45'],
          //   ['春熙路公厕1#', '23', '15', '45', '24', '35', '15', '45'],
          //   ['总府路公厕3#', '22.6', '13', '34', '24', '35', '15', '45'],
          //   ['总府路公厕3#', '22.7', '15', '23', '24', '35', '15', '45'],
          //   ['天府2街公厕1#', '22.6', '13', '34', '24', '35', '15', '45'],
          //   ['天府2街公厕1#', '22.7', '15', '23', '24', '35', '15', '45'],
          //   ['世纪城公厕4#', '22.6', '13', '34', '24', '35', '15', '45'],
          //   ['世纪城公厕4#', '22.7', '15', '23', '24', '35', '15', '45'],
          //   ['世纪城公厕5#', '22.6', '13', '34', '24', '35', '15', '45'],
          //   ['世纪城公厕5#', '22.7', '15', '23', '24', '35', '15', '45'],
          // ],
          columnWidth: [100, 150, 100],
          align: ['center'],
          rowNum: 8,
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
  .scroll-board {
    width: 100%;
    box-sizing: border-box;
    padding: 3px;
    font-size:10px;
    height: 100%;
    overflow: hidden;

    .scroll-switch {
      width: 100%;
      height: 20px;

      display: flex;
      justify-content: center;
      align-items: center;

      .switch-div {
        margin-left: 20px;
      }
    }

    .scroll-content {
      width: 100%;
      height: calc(~"100% - 20px");
    }
  }
</style>
