<template>
  <div ref="show" id="data-view">
    <!-- <dv-full-screen-container> -->
    <div class="data-container">
      <div class="main-header">
        <div id="top-header">
          <dv-decoration-8 class="header-left-decoration" />
          <dv-decoration-5 class="header-center-decoration" />
          <dv-decoration-8 class="header-right-decoration" :reverse="true" />
          <div class="center-title">智慧公厕调度指挥中心</div>
        </div>
      </div>

      <dv-border-box-1 class="control-container">
        <dv-border-box-3 class="left-chart-container">
          <Left-Chart-1 ref="leftChart1"/>
          <Left-Chart-2 ref="leftChart2"/>
          <!-- <Left-Chart-3 ref="leftChart3"/> -->
        </dv-border-box-3>

        <div class="right-main-container">
          <div class="rmc-top-container">
            <dv-border-box-3 class="rmctc-left-container">
              <Center-Cmp ref="centerCmp"/>
            </dv-border-box-3>

            <div class="rmctc-right-container">
              <dv-border-box-3 class="rmctc-chart-1">
                <Right-Chart-3 ref="rightChart3"/>
              </dv-border-box-3>
            </div>
          </div>

          <dv-border-box-4 class="rmc-bottom-container">
            <Bottom-Charts ref="bottomChart"/>
          </dv-border-box-4>
        </div>
      </dv-border-box-1>
    </div>
    <!-- </dv-full-screen-container> -->

    <div class="show-screenfull-div" @mouseenter="showScreenfull = true;" @mouseleave="showScreenfull = false;">
      <screenfull v-if="showScreenfull" :el="el" id="show-screenfull" class="show-screenfull" />
    </div>

    <div class="switch-warn-show-hide" @mouseenter="showSwitchWarn = true;" @mouseleave="showSwitchWarn = false;">
      <div class="switch-warn-content" v-if="showSwitchWarn">
        <div class="switch-warn-text" @click="showWarnList = !showWarnList">
          {{ showWarnList ? '隐藏告警' : '显示高级' }}
        </div>
      </div>
    </div>

    <div class="warn-list-wrap" v-if="showWarnList">
      <div class="warn-wrap" v-for="warn in warns" v-bind:key="warn.toiletSn">
        <div class="warn-content">
          <div class="warn-title">
            <svg-icon icon-class="warns"/>
            告警
          </div>
          <div class="warn-content-detail">
            <div class="warn-content-row"><div class="warn-content-name">厕所名:</div><div class="warn-content-content" :title="warn.toiletName">{{ warn.toiletName }}</div></div>
            <div class="warn-content-row" v-if="warn.switchCode != 0"><div class="warn-content-name">蹲位:</div><div class="warn-content-content">{{ warn.switchCode }}</div></div>
            <div class="warn-content-row"><div class="warn-content-name">告警类型:</div><div class="warn-content-content">{{ warn.type == 1 ? '烟雾' : warn.type == 2 ? 'SOS' : warn.type == 4 ? '下水堵塞' : '' }}</div></div>
          </div>
        </div>
        <!-- <i class="el-icon-circle-close warn-icon" @click="closeWarn(warn.toiletSn)"></i> -->
      </div>
    </div>
  </div>

</template>

<script>
// import { mapGetters } from 'vuex'
import Screenfull from '@/components/Screenfull'
import { getAlarm } from '@/api/show'

import LeftChart1 from './components/LeftChart1'
import LeftChart2 from './components/LeftChart2'
import LeftChart3 from './components/LeftChart3'
import CenterCmp from './components/CenterCmp'
import RightChart3 from './components/RightChart3'
import BottomCharts from './components/BottomCharts'

export default {
  name: 'ControlCenter',
  components: {
      LeftChart1,
      LeftChart2,
      LeftChart3,
      CenterCmp,
      RightChart3,
      BottomCharts,
      Screenfull
  },
  data() {
    return {
      // currentRole: 'adminDashboard'
      warns: [],
      notifyList: [],
      el: null,
      showScreenfull: false,
      interval: null,

      showWarnList: true,
      showSwitchWarn: false,
    }
  },
  // computed: {
  //   ...mapGetters([
  //     'roles'
  //   ])
  // },
  created() {
    // if (!this.roles.includes('admin')) {
    //   this.currentRole = 'editorDashboard'
    // }
  },
  mounted() {
    this.getWarn();
    this.interval = setInterval(() => {
      this.getWarn();
    }, 3000);

    this.el = this.$refs.show;
  },
  destroyed() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    for (let warn of this.warns) {
      if (warn.notify) {
        warn.notify.close();
      }
    }
  },
  methods: {
    getWarn() {
      getAlarm().then(res => {
        // 找到告警则不管,未在已经告警中则显示
        let addWarns = [];
        let removeWarnSns = [];

        let find = false;
        for (let alarm of res) {
          find = false;
          for (let warn of this.warns) {
            if (warn.toiletSn == alarm.toiletSn) {
              find = true;
              break;
            }
          }

          if (!find) {
            this.notifyList.push(alarm);

            addWarns.push(alarm);
          }
        }
        // 未在当前告警中则删除
        find = false;
        for (let warn of this.warns) {
          find = false;
          for (let alarm of res) {
            if (warn.toiletSn == alarm.toiletSn) {
              find = true;
              break;
            }
          }

          if (!find) {
            warn.notify.close();

            removeWarnSns.push(warn.toiletSn);
          }
        }

        this.warns = this.warns.concat(addWarns);

        this.warns = this.warns.filter(warn => removeWarnSns.indexOf(warn.toiletSn) < 0);

        // this.showNotify();
      });
    },
    showNotify() {
      if (this.notifyList.length > 0) {
        let alarm = this.notifyList.pop();
        alarm.notify = this.$notify({
          title: '告警',
          message: alarm.toiletName,
          duration: 0,
          showClose: false,
          offset: 100
        });
        setTimeout(() => {
          this.showNotify();
        }, 100);
      }
    },
    closeWarn(toiletSn) {
      this.warns = this.warns.filter(warn => toiletSn != warn.toiletSn);
    }
  }
}
</script>

<style lang="less">
  #data-view {
    width: 100%;
    height: 100%;
    background-color: #030409;
    color: #fff;
    // #dv-full-screen-container
    .data-container
    {
      width: 100%;
      height: 100%;
      background-image: url('../../assets/home/bg.png');
      background-size: 100% 100%;
      box-shadow: 0 0 3px blue;
      display: flex;
      flex-direction: column;
    }

    .main-header {
      height: 95px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      .mh-left

      {
        font-size: 20px;
        color: rgb(1,134,187);
      }

      .mh-middle {
        font-size: 30px;
      }

      .mh-left, .mh-right {
        width: 450px;
      }

    }

    .control-container {
      height: calc(~"100% - 95px");
      margin-top: -5px;
      margin-bottom: 15px;
      .border-box-content

      {
        padding: 20px;
        box-sizing: border-box;
        display: flex;
      }

    }

    .left-chart-container {
      width: 22%;
      padding: 10px;
      box-sizing: border-box;
      .border-box-content

      {
        flex-direction: column;
      }

    }

    .right-main-container {
      width: 78%;
      padding-left: 5px;
      box-sizing: border-box;
    }

    .rmc-top-container {
      height: 65%;
      display: flex;
    }

    .rmctc-left-container {
      width: 60%;
    }

    .rmctc-right-container {
      width: 40%;
    }

    .rmc-bottom-container {
      height: 35%;
    }

    .rmctc-chart-1 {
      height: 100%;
    }

    #top-header {
      position: relative;
      width: 100%;
      height: 100px;
      display: flex;
      justify-content: space-between;
      flex-shrink: 0;
      .header-center-decoration

      {
        width: 40%;
        height: 60px;
        margin-top: 30px;
      }

      .header-left-decoration, .header-right-decoration {
        width: 25%;
        height: 60px;
      }

      .center-title {
        position: absolute;
        font-size: 30px;
        font-weight: bold;
        left: 50%;
        top: 15px;
        transform: translateX(-50%);
      }

    }
  }

  .show-screenfull-div {
    position: absolute;
    left: 10px;
    top: 10px;
    width: 32px;
    height: 100%;
  }

  .warn-list-wrap {
    position: absolute;
    width: 200px;
    height: 100%;
    right: 0;
    top: 0;
    opacity: 0.9;

    .warn-wrap {
      width: 100%;
      height: 80px;
      background: #E6A23C;
      border: 2px solid #fff;
      color: #fff;
      border-radius: 5px;
      box-shadow: 0 10px 10px 0 rgba(0,0,0,.24);
      // padding: 20px;
      margin-top: 5px;

      // display: flex;
      // justify-content: center;
      // align-items: center;
      position: relative;

      .warn-icon {
        position: absolute;
        right: 10px;
        cursor: pointer;
      }
    }
  }

  .switch-warn-show-hide {
    position: absolute;
    top: 0;
    right: 0px;
    width: 15px;
    height: 100%;
    z-index: 9;

    .switch-warn-content {
      color: white;
      width: 100%;
      height: 100%;
      // display: flex;
      // justify-content: center;
      // align-items: center;

      .warn-title {

      }

      .switch-warn-text {
        width: 100%;
        height: 72px;
        color: #2593FC;
        cursor: pointer;
      }
    }
  }

  .warn-content-detail {
    padding: 0 10px;
    
    .warn-content-row {
      width: 100%;
      float: left;

      .warn-content-name {
        float: left;
        width: 80px;
      }

      .warn-content-content {
        float: left;
        width: calc(~"100% - 80px");

        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
    }
  }
</style>