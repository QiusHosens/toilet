<template>
    <div class="control-container">
        <div ref="control" class="control-wrap">
            <el-select v-if="!isFull"
                class="toilet-select"
                size="small"
                v-model="selectedToilets"
                filterable
                style="margin-left: 20px;"
                placeholder="请选择厕所"
                @change="changeToilet">
                <el-option
                    v-for="item in toilets"
                    :key="item.toiletCode"
                    :label="item.toiletName"
                    :value="item.toiletCode">
                </el-option>
            </el-select>
            <dv-border-box-11 title="智慧公厕调度指挥中心">
                <div class="content-container">
                    <div class="left-container">
                        <dv-border-box-12>
                            <div class="inner-content-container left-content-container">
                                <div class="count-container">
                                    <div class="count-title-container" :style="'color: ' + manCountColor">
                                        男性厕位剩余
                                    </div>
                                    <div class="count-content-container">
                                        <div class="count-chart-container">
                                            <el-progress type="circle" :percentage="manProgress" :color="manCountColor" :width="60"></el-progress>
                                        </div>
                                        <div class="count-number-container">
                                            {{ manResidue }}
                                        </div>
                                    </div>
                                </div>

                                <div class="env-container">
                                    <div class="env-row-container" v-for="(item, index) in manEnvList" :key="index">
                                        <div class="env-icon-container">
                                            <svg-icon class-name="env-icon" :icon-class="item.iconClass"/>
                                        </div>
                                        <div class="env-content-container">
                                            <!-- <div :style="'width:' + item.nameWidth">{{ item.name }}</div> -->
                                            <!-- <div class="env-value-container" :style="'width:' + item.valueWidth">{{ item.vlaue }}</div> -->
                                            <!-- <div :style="'width:' + item.unitWidth">{{ item.unit }}</div> -->
                                            <div :style="'width: 80px'">{{ item.name }}</div>
                                            <div class="env-value-container" :style="'width: calc(100% - 130px)'">{{ item.vlaue }}</div>
                                            <div class="env-content-symbol" :style="'width: 50px'">{{ item.unit }}</div>
                                        </div>
                                    </div>
                                </div>
                                <div ref="toiletEvaluate" class="side-bottom-container"></div>
                            </div>
                        </dv-border-box-12>
                    </div>
                    <div class="center-container">
                        <div class="top-container">
                            <div class="inner-container">
                                <dv-border-box-12>
                                    <div ref="manContainer" class="inner-content-container top-content-container">
                                        <div class="svg-container" :style="'width: ' + iconContainerWidth + '; height: ' + iconContainerHeight" v-for="(item, index) in manList" :key="index">
                                            <svg t="1625054141062" class="icon-svg" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6294" width="16" height="16"><path d="M276.002265 441.696282C271.27824 416.501485 300.409724 393.6687 337.414582 393.6687h349.577806c37.004858 0 66.136342 22.832785 60.624979 48.027582l-48.027581 232.264533a39.36687 39.36687 0 0 1-17.321423 23.620122l-32.280833 22.045447a39.36687 39.36687 0 0 0-17.321423 23.620122l-51.176931 244.074594a58.262968 58.262968 0 0 1-61.412317 36.21752h-15.746748a58.262968 58.262968 0 0 1-60.62498-36.21752l-51.176931-244.074594a39.36687 39.36687 0 0 0-17.321423-23.620122l-33.068171-22.045447a39.36687 39.36687 0 0 1-17.321423-23.620122zM354.736005 157.46748a157.46748 157.46748 0 1 1 157.46748 157.46748 157.46748 157.46748 0 0 1-157.46748-157.46748z" :fill="item ? '#FA425D' : '#22D76B'" p-id="6295"></path></svg>
                                        </div>
                                    </div>
                                </dv-border-box-12>
                            </div>
                            <div class="inner-container">
                                <dv-border-box-12>
                                    <div class="inner-content-container top-content-container">
                                        <div class="svg-container" :style="'width: ' + iconContainerSize + '; height: ' + iconContainerSize" v-for="(item, index) in womanList" :key="index">
                                            <svg t="1625058178578" class="icon-svg" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7722" width="16" height="16"><path d="M274.645071 736.865655l170.04592-314.899853A51.958476 51.958476 0 0 1 493.500468 393.624816h35.426234a51.958476 51.958476 0 0 1 45.660478 25.191988L746.994849 736.865655a21.25574 21.25574 0 0 1 0 23.617489 31.489985 31.489985 0 0 1-25.191988 11.021495h-62.97997a48.809477 48.809477 0 0 0-49.596727 35.426233l-36.213483 181.854665a48.809477 48.809477 0 0 1-54.320225 34.638984h-15.744992a48.809477 48.809477 0 0 1-49.596727-35.426234l-36.213483-181.854665a48.809477 48.809477 0 0 0-49.596727-35.426233h-62.97997a31.489985 31.489985 0 0 1-25.191988-11.021495 21.25574 21.25574 0 0 1-4.723498-22.830239zM353.370034 157.449926a157.449926 157.449926 0 1 1 157.449926 157.449926 157.449926 157.449926 0 0 1-157.449926-157.449926z" :fill="item ? '#FA425D' : '#22D76B'" p-id="7723"></path></svg>
                                        </div>
                                    </div>
                                </dv-border-box-12>
                            </div>
                        </div>
                        <div class="bottom-container">
                            <div class="bottom-top-container">
                                <div class="inner-container">
                                    <dv-border-box-12>
                                        <div class="inner-content-container bottom-content-container row-content-container">
                                            <div class="last-child-div">第三厕所</div>
                                            <div class="last-child-div">{{ threeUse > 0 ? '有人' : '无人' }}</div>
                                        </div>
                                    </dv-border-box-12>
                                </div>
                                <div class="inner-container">
                                    <dv-border-box-12>
                                        <div class="inner-content-container bottom-content-container row-content-container">
                                            <div class="last-child-div">母婴室</div>
                                            <div class="last-child-div">{{ mbUse > 0 ? '有人' : '无人' }}</div>
                                        </div>
                                    </dv-border-box-12>
                                </div>
                            </div>
                            <div class="bottom-bottom-container">
                                <dv-border-box-12>
                                    <div class="inner-content-container bottom-content-container">
                                        <dv-scroll-board class="consum-table" :config="consumTableConfig"/>
                                    </div>
                                </dv-border-box-12>
                            </div>
                        </div>
                    </div>
                    <div class="right-container">
                        <dv-border-box-12>
                            <div class="inner-content-container left-content-container">
                                <div class="count-container">
                                    <div class="count-title-container" :style="'color: ' + womanCountColor">
                                        女性厕位剩余
                                    </div>
                                    <div class="count-content-container">
                                        <div class="count-chart-container">
                                            <el-progress type="circle" :percentage="femaleProgress" :color="womanCountColor" :width="60"></el-progress>
                                        </div>
                                        <div class="count-number-container">
                                            {{ femaleResidue }}
                                        </div>
                                    </div>
                                </div>

                                <div class="env-container">
                                    <div class="env-row-container" v-for="(item, index) in womanEnvList" :key="index">
                                        <div class="env-icon-container">
                                            <svg-icon class-name="env-icon" :icon-class="item.iconClass"/>
                                        </div>
                                        <div class="env-content-container">
                                            <!-- <div :style="'width:' + item.nameWidth">{{ item.name }}</div> -->
                                            <!-- <div class="env-value-container" :style="'width:' + item.valueWidth">{{ item.vlaue }}</div> -->
                                            <!-- <div :style="'width:' + item.unitWidth">{{ item.unit }}</div> -->
                                            <div :style="'width: 80px'">{{ item.name }}</div>
                                            <div class="env-value-container" :style="'width: calc(100% - 130px)'">{{ item.vlaue }}</div>
                                            <div class="env-content-symbol" :style="'width: 50px'">{{ item.unit }}</div>
                                        </div>
                                    </div>
                                </div>

                                <div ref="toiletWaterAndElec" class="side-bottom-container"></div>
                            </div>
                        </dv-border-box-12>
                    </div>
                </div>
            </dv-border-box-11>
        </div>

        <div class="show-screenfull-div" @mouseenter="showScreenfull = true;" @mouseleave="showScreenfull = false;">
            <screenfull v-if="showScreenfull" :el="el" id="show-screenfull" class="show-screenfull" />
        </div>
    </div>
</template>

<script>
import { allToilets } from '@/api/toilet';
import { getSingleToiletKspUse, getSingleToiletKspEnv, getSingleToiletConsum, getSingleToiletWaterAndElec, getSingleToiletEvaluate } from "@/api/toilet-show";
import echarts from 'echarts';
require('echarts/theme/macarons') // echarts theme
import Screenfull from '@/components/Screenfull'

export default {
    name: "DeviceControl",
    components: {
        Screenfull
    },
    data() {
        return {
            el: null,
            showScreenfull: false,
            isFull: false,
            
            toilets: [],
            selectedToilets: [],

            womanCountColor: '#FC28F4',
            manCountColor: '#1BA3FC',
            
            manResidue: 0,
            femaleResidue: 0,
            manProgress: 0,
            femaleProgress: 0,

            threeUse: 0,
            mbUse: 0,

            manEnvList: [
                {
                    iconClass: 'temperature',
                    nameWidth: '32px',
                    valueWidth: 'calc(100% - 49px)',
                    unitWidth: '17px',
                    name: '温度',
                    vlaue: 0,
                    unit: '°C'
                },
                {
                    iconClass: 'humidity',
                    nameWidth: '32px',
                    valueWidth: 'calc(100% - 46px)',
                    unitWidth: '14px',
                    name: '湿度',
                    vlaue: 0,
                    unit: '%'
                },
                {
                    iconClass: 'pm25',
                    nameWidth: '46px',
                    valueWidth: 'calc(100% - 89px)',
                    unitWidth: '43px',
                    name: 'PM2.5',
                    vlaue: 0,
                    unit: 'ug/m³'
                },
                {
                    iconClass: 'nh3',
                    nameWidth: '32px',
                    valueWidth: 'calc(100% - 79px)',
                    unitWidth: '47px',
                    name: '氨气',
                    vlaue: 0,
                    unit: 'mg/m³'
                },
                {
                    iconClass: 'h2s',
                    nameWidth: '48px',
                    valueWidth: 'calc(100% - 95px)',
                    unitWidth: '47px',
                    name: '硫化氢',
                    vlaue: 0,
                    unit: 'mg/m³'
                },
                {
                    iconClass: 'voc',
                    nameWidth: '48px',
                    valueWidth: 'calc(100% - 95px)',
                    unitWidth: '47px',
                    name: '异味',
                    vlaue: 0,
                    unit: 'mg/m³'
                },
                {
                    iconClass: 'co2',
                    nameWidth: '48px',
                    valueWidth: 'calc(100% - 95px)',
                    unitWidth: '47px',
                    name: '二氧化碳',
                    vlaue: 0,
                    unit: 'mg/m³'
                },
                {
                    iconClass: 'ch2o',
                    nameWidth: '48px',
                    valueWidth: 'calc(100% - 95px)',
                    unitWidth: '47px',
                    name: '甲醛',
                    vlaue: 0,
                    unit: 'mg/m³'
                },
                {
                    iconClass: 'lux',
                    nameWidth: '48px',
                    valueWidth: 'calc(100% - 95px)',
                    unitWidth: '47px',
                    name: '照明',
                    vlaue: 0,
                    unit: 'mg/m³'
                }
            ],
            womanEnvList: [
                {
                    iconClass: 'temperature',
                    nameWidth: '32px',
                    valueWidth: 'calc(100% - 49px)',
                    unitWidth: '17px',
                    name: '温度',
                    vlaue: 0,
                    unit: '°C'
                },
                {
                    iconClass: 'humidity',
                    nameWidth: '32px',
                    valueWidth: 'calc(100% - 46px)',
                    unitWidth: '14px',
                    name: '湿度',
                    vlaue: 0,
                    unit: '%'
                },
                {
                    iconClass: 'pm25',
                    nameWidth: '46px',
                    valueWidth: 'calc(100% - 89px)',
                    unitWidth: '43px',
                    name: 'PM2.5',
                    vlaue: 0,
                    unit: 'ug/m³'
                },
                {
                    iconClass: 'nh3',
                    nameWidth: '32px',
                    valueWidth: 'calc(100% - 79px)',
                    unitWidth: '47px',
                    name: '氨气',
                    vlaue: 0,
                    unit: 'mg/m³'
                },
                {
                    iconClass: 'h2s',
                    nameWidth: '48px',
                    valueWidth: 'calc(100% - 95px)',
                    unitWidth: '47px',
                    name: '硫化氢',
                    vlaue: 0,
                    unit: 'mg/m³'
                },
                {
                    iconClass: 'voc',
                    nameWidth: '48px',
                    valueWidth: 'calc(100% - 95px)',
                    unitWidth: '47px',
                    name: '异味',
                    vlaue: 0,
                    unit: 'mg/m³'
                },
                {
                    iconClass: 'co2',
                    nameWidth: '48px',
                    valueWidth: 'calc(100% - 95px)',
                    unitWidth: '47px',
                    name: '二氧化碳',
                    vlaue: 0,
                    unit: 'mg/m³'
                },
                {
                    iconClass: 'ch2o',
                    nameWidth: '48px',
                    valueWidth: 'calc(100% - 95px)',
                    unitWidth: '47px',
                    name: '甲醛',
                    vlaue: 0,
                    unit: 'mg/m³'
                },
                {
                    iconClass: 'lux',
                    nameWidth: '48px',
                    valueWidth: 'calc(100% - 95px)',
                    unitWidth: '47px',
                    name: '照明',
                    vlaue: 0,
                    unit: 'mg/m³'
                }
            ],

            iconContainerWidth: '20%',
            iconContainerHeight: '20%',
            iconContainerSize: '20%',
            manList: [],
            womanList: [],

            consumTableConfig: null
        }
    },
    mounted() {
        window.onresize = e => {
            this.isFull = !this.isFull;

            this.getSingleToiletKspUse();
        };
        let tioletSn = this.$route.query.tioletSn;
        this.getAllToilets(() => {
            if (this.toilets && this.toilets.length > 0) {
                if (tioletSn) {
                    this.selectedToilets = this.tioletSn;
                } else {
                    this.selectedToilets = this.toilets[0].toiletCode;
                }
                
                this.changeToilet(this.selectedToilets);
            }
        });

        this.el = this.$refs.control;
    },
    methods: {
        getAllToilets(callback) {
            allToilets().then(res => {
                this.toilets = res;
                if (callback) {
                    callback();
                }
            });
        },
        changeToilet(toiletCode) {
            this.selectedToilets = toiletCode;
            this.getSingleToiletKspUse();
            this.getSingleToiletKspEnv();
            this.getSingleToiletConsum();
            this.getSingleToiletWaterAndElec();
            this.getSingleToiletEvaluate();
        },
        getDistStatus() {
            console.log(this.$refs.manContainer);
            const totalWidth = this.$refs.manContainer.clientWidth;
            const totalHeight = this.$refs.manContainer.clientHeight;
            this.manList = [];
            this.womanList = [];
            let count = 9;
            for (let index = 0; index < count; index ++) {
                this.manList.push(index % 2);
                this.womanList.push(index % 2);
            }


        },
        getSingleToiletKspUse() {
            const totalWidth = this.$refs.manContainer.clientWidth - 20;
            const totalHeight = this.$refs.manContainer.clientHeight - 20;
            getSingleToiletKspUse(this.selectedToilets).then(res => {
                this.manResidue = res.manResidue;
                this.femaleResidue = res.femaleResidue;

                this.manProgress = Number((res.manResidue * 100 / res.manTotal).toFixed(0));
                this.femaleProgress = Number((res.femaleResidue * 100 / res.femaleTotal).toFixed(0));

                this.threeUse = res.threeUse;
                this.mbUse = res.mbUse;
                
                let manToilet = [];
                let womanToilet = [];
                for (let one of res.kspInfo) {
                    if (one.toiletType == 1) {
                        manToilet.push(one);
                    } else if (one.toiletType == 2) {
                        womanToilet.push(one);
                    }
                }
                let manCount = manToilet.length;
                let womanCount = womanToilet.length;
                let maxCount = Math.max(manCount, womanCount);
                let per1 = Math.sqrt(totalWidth * totalHeight / maxCount);
                let row = totalHeight % per1 == 0 ? totalHeight / per1 : Math.ceil(totalHeight / per1);
                let column = totalWidth % per1 == 0 ? totalWidth / per1 : Math.ceil(totalWidth / per1);
                while (row * column < maxCount) {
                    if (totalHeight / row > totalWidth / column) {
                        row ++;
                    } else {
                        column ++;
                    }
                }

                let size = Math.min(totalWidth / column, totalHeight / row);
                // this.iconContainerWidth = totalWidth / column + 'px';
                // this.iconContainerHeight = totalHeight / row + 'px';

                this.iconContainerWidth = size + 'px';
                this.iconContainerHeight = size + 'px';
                this.iconContainerSize = size + 'px';

                this.manList = [];
                for (let one of manToilet) {
                    this.manList.push(one.kspUse);
                }

                this.womanList = [];
                for (let one of womanToilet) {
                    this.womanList.push(one.kspUse);
                }
            });
        },
        getSingleToiletKspEnv() {
            getSingleToiletKspEnv(this.selectedToilets).then(res => {
                for (let data of res) {
                    if (data.toiletType == 1) {
                        this.manEnvList[0].vlaue = data.temp;
                        this.manEnvList[1].vlaue = data.humi;
                        this.manEnvList[2].vlaue = data.pm25;
                        this.manEnvList[3].vlaue = data.nh3;
                        this.manEnvList[4].vlaue = data.h2s;
                        this.manEnvList[5].vlaue = data.voc;
                        this.manEnvList[6].vlaue = data.co2;
                        this.manEnvList[7].vlaue = data.ch2o;
                        this.manEnvList[8].vlaue = data.lux;
                    } else if (data.toiletType == 2) {
                        this.womanEnvList[0].vlaue = data.temp;
                        this.womanEnvList[1].vlaue = data.humi;
                        this.womanEnvList[2].vlaue = data.pm25;
                        this.womanEnvList[3].vlaue = data.nh3;
                        this.womanEnvList[4].vlaue = data.h2s;
                        this.womanEnvList[5].vlaue = data.voc;
                        this.womanEnvList[6].vlaue = data.co2;
                        this.womanEnvList[7].vlaue = data.ch2o;
                        this.womanEnvList[8].vlaue = data.lux;
                    }
                }
            });
        },
        getSingleToiletConsum() {
            getSingleToiletConsum(this.selectedToilets).then(res => {
                let header = ['耗材名', '剩余量', '电量'];
                let data = [];
                for (let one of res) {
                    data.push([one.consumName, one.residue.toFixed(0) + '%', one.bat.toFixed(0) + '%']);
                }
                this.consumTableConfig = {
                    header: header,
                    data: data,
                    columnWidth: [300, 200, 200]
                }
            });
        },
        getSingleToiletWaterAndElec() {
            let waterAndElecCharts = echarts.init(this.$refs.toiletWaterAndElec, 'macarons');
            getSingleToiletWaterAndElec(this.selectedToilets).then(res => {
                let legend = ['用水量', '用电量'];
                let xAxis = [];
                let water = [];
                let elec = [];

                let maxWater = 0;
                let maxElec = 0;
                if (res) {
                    for (let data of res) {
                        xAxis.push(data.statTime);
                        water.push(data.totalWater);
                        elec.push(data.totalElc);
                        if (data.totalWater > maxWater) {
                            maxWater = data.totalWater
                        }
                        if (data.totalElc > maxElec) {
                            maxElec = data.totalElc
                        }
                    }
                }

                const leftGrid = (6 + maxWater.toString().length * 4) + '%';
                const rightGrid = (6 + maxElec.toString().length * 4) + '%';
                
                let option = option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#999'
                            }
                        }
                    },
                    toolbox: {
                        feature: {
                            dataView: {show: false, readOnly: false},
                            magicType: {show: false, type: ['line', 'bar']},
                            restore: {show: false},
                            saveAsImage: {show: false}
                        }
                    },
                    legend: {
                        data: legend,
                        textStyle: { //图例文字的样式
                            color:'#fff',
                            // fontSize:16
                        }
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: xAxis,
                            axisPointer: {
                                type: 'shadow'
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '用水量',
                            // min: 0,
                            // max: 250,
                            // interval: 50,
                            splitNumber : 2,
                            axisLabel: {
                                formatter: '{value} L'
                            }
                        },
                        {
                            type: 'value',
                            name: '用电量',
                            // min: 0,
                            // max: 25,
                            // interval: 5,
                            splitNumber : 2,
                            axisLabel: {
                                formatter: '{value} °'
                            }
                        }
                    ],
                    series: [
                        {
                            name: '用水量',
                            type: 'bar',
                            data: water
                        },
                        {
                            name: '用电量',
                            type: 'line',
                            yAxisIndex: 1,
                            data: elec
                        }
                    ],
                    grid: {
                        left: leftGrid,
                        right: rightGrid
                    }
                };

                // let option = {
                //     legend: {
                //         textStyle: { //图例文字的样式
                //             color:'#fff',
                //             // fontSize:16
                //         }
                //     },
                //     tooltip: {},
                //     dataset: {
                //         dimensions: dimensions,
                //         source: source
                //     },
                //     xAxis: {
                //         type: 'category'
                //     },
                //     yAxis: {
                //         type: 'value',
                //         splitNumber : 2,
                //     },
                //     // Declare several bar series, each will be mapped
                //     // to a column of dataset.source by default.
                //     series: [
                //         {type: 'bar'},
                //         {type: 'bar'}
                //     ],
                //     grid: {
                //         left: '15%'
                //     }
                // };
                waterAndElecCharts.setOption(option);
            });
        },
        getSingleToiletEvaluate() {
            let evaluateCharts = echarts.init(this.$refs.toiletEvaluate, 'macarons');
            getSingleToiletEvaluate(this.selectedToilets).then(res => {
                let data = [];
                if (res) {
                    for (let one of res) {
                        data.push({
                            value: one.evaCount,
                            name: one.evaText
                        })
                    }
                }
                let option = {
                    tooltip: {
                        type: 'showTip',
                        x: 0,
                        y: 0,
                        formatter: function(arg) {
                          return arg.name + ':' + arg.value
                        }
                    },
                    legend: {
                        orient: 'horizontal',
                        left: 'top',
                        // bottom:'50%',
                        textStyle: { //图例文字的样式
                            color:'#fff',
                            // fontSize:16
                        }
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: '80%',
                            hoverAnimation: false,
                            label: {
                                show: false,
                            },
                            labelLine: {
                                show: false
                            },
                            data: data,
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
                evaluateCharts.setOption(option);
            });
        }
    }
}
</script>

<style lang="less" scoped>
    .control-container {
        width: 100%;
        height: 100%;
        color: white;

        background-color: #282c34;

        .control-wrap {
            width: 100%;
            height: 100%;

            .toilet-select {
                position: absolute;
                left: 10px;
                top: 3px;
                z-index: 10;
            }

            .content-container {
                width: 100%;
                height: 100%;
                padding: 60px 20px 20px 20px;
            }

            .left-container {
                float: left;
                width: 25%; // calc(~"25% - 5px");
                height: 100%;
                padding: 0 5px;
            }
            .center-container {
                float: left;
                width: 50%; // calc(~"50% - 10px");
                height: 100%;
                // padding: 0 5px;

                .top-container {
                    width: 100%;
                    height: 60%;
                    padding-bottom: 5px;
                    display: flex;
                }
                
                .bottom-container {
                    width: 100%;
                    height: 40%;
                    padding-top: 5px;
                    display: inline-block;

                    .bottom-top-container {
                        width: 100%;
                        height: 20%;
                        padding-bottom: 5px;
                        display: flex;
                    }

                    .bottom-bottom-container {
                        width: 100%;
                        height: 80%;
                        padding: 5px 5px 0 5px;

                        .consum-table {
                            width: 100%;
                            height: 100%;
                        }
                    }
                }

                .inner-container {
                    width: 50%;
                    height: 100%;
                    padding: 0 5px;

                    .top-content-container {
                        padding: 10;
                        display: inline-block;

                        .svg-container {
                            float: left;
                            padding: 10px 0;

                            .icon-svg {
                                width: 100%;
                                height: 100%;
                            }
                        }
                    }
                }
            }
            .right-container {
                float: left;
                width: 25%; // calc(~"25% - 5px");
                height: 100%;
                padding: 0 5px;
            }
        }

        .inner-content-container {
            width: 100%;
            height: 100%;
            padding: 10px;
        }

        .row-content-container {
            display: flex;
            // justify-content: center;
            align-items: center;

            .last-child-div {
                margin-left: 20px;
            }
        }

        .count-container {
            text-align: center;
            width: 100%;
            height: 23%;

            .count-title-container {
                width: 100%;
                height: 42%;
                font-size: 24px;

                display: flex;
                justify-content: center;
                align-items: center;
            }

            .count-content-container {
                width: 100%;
                height: 58%;
                
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .count-chart-container {
                width: 50%;
            }

            .count-number-container {
                width: 50%;
                font-size: 40px;
            }
        }

        .env-container {
            width: 100%;
            height: 50%;

            .env-row-container {
                width: 100%;
                height: 11.111111%;
                padding: 0 20px;

                display: flex;
                justify-content: center;
                align-items: center;

                .env-icon-container {
                    width: 15%;

                    .env-icon {
                        font-size: 24px;
                    }
                }

                .env-content-container {
                    width: 88%;
                    height: 70%;
                    
                    border-bottom: 1px white solid;
                    font-size: 16px;
                    display: flex;

                    .env-value-container {
                        text-align: center;
                    }

                    .env-content-symbol {
                        text-align: right;
                    }
                }
            }
        }
    }

    .side-bottom-container {
        width: 100%;
        height: 27%;
        padding: 0 20px;
    }

    .show-screenfull-div {
        position: absolute;
        left: 10px;
        top: 10px;
        width: 32px;
        height: 100%;
    }

    /deep/ .el-progress--circle .el-progress__text {
        color: white;
    }

    /deep/ .el-input--small .el-input__inner {
        height: 24px;
        line-height: 24px;
    }

    /deep/ .el-input--small .el-input__icon {
        line-height: 24px;
    }
</style>
