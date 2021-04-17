<template>
  <div id="data-view">
    <dv-full-screen-container>
      <div class="main-header">
        <div id="top-header">
          <dv-decoration-8 class="header-left-decoration" />
          <dv-decoration-5 class="header-center-decoration" />
          <dv-decoration-8 class="header-right-decoration" :reverse="true" />
          <div class="center-title">智慧公厕调度指挥中心</div>
        </div>
      </div>

      <dv-border-box-1 class="main-container">
        <dv-border-box-3 class="left-chart-container">
          <Left-Chart-1 />
          <Left-Chart-2 />
          <Left-Chart-3 />
        </dv-border-box-3>

        <div class="right-main-container">
          <div class="rmc-top-container">
            <dv-border-box-3 class="rmctc-left-container">
              <Center-Cmp />
            </dv-border-box-3>

            <div class="rmctc-right-container">
              <dv-border-box-3 class="rmctc-chart-1">
                <Right-Chart-1 />
              </dv-border-box-3>
            </div>
          </div>

          <dv-border-box-4 class="rmc-bottom-container">
            <Bottom-Charts />
          </dv-border-box-4>
        </div>
      </dv-border-box-1>

    </dv-full-screen-container>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import LeftChart1 from './components/LeftChart1'
import LeftChart2 from './components/LeftChart2'
import LeftChart3 from './components/LeftChart3'
import CenterCmp from './components/CenterCmp'
import RightChart1 from './components/RightChart1'
import BottomCharts from './components/BottomCharts'

export default {
  name: 'Home',
  components: {
      LeftChart1,
      LeftChart2,
      LeftChart3,
      CenterCmp,
      RightChart1,
      BottomCharts
  },
  data() {
    return {
      // currentRole: 'adminDashboard'
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
  }
}
</script>

<style lang="less">
  #data-view {
    width: 100%;
    height: 100%;
    background-color: #030409;
    color: #fff;
    #dv-full-screen-container

    {
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

    .main-container {
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
</style>