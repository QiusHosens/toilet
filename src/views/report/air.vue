<template>
    <div class="air-container">
        <div class="condition">
            日期:
            <el-date-picker
                class="date-from"
                size="small"
                v-model="from"
                :type="reportTimeType"
                placeholder="选择日期">
            </el-date-picker>
            
            <div class="condition-right">
                <el-select
                    size="small"
                    v-model="selectedToilets"
                    filterable
                    style="margin-left: 20px;"
                    placeholder="请选择厕所">
                    <el-option
                        v-for="item in toilets"
                        :key="item.toiletCode"
                        :label="item.toiletName"
                        :value="item.toiletCode">
                    </el-option>
                </el-select>
                <el-button class="search-button" type="primary" size="small"  icon="el-icon-search" @click="search()">搜索</el-button>
            </div>
        </div>

        <div class="chart-container">
            <el-tabs v-model="activeName" @tab-click="tabClick">
                <el-tab-pane label="温度" name="temp">
                    <!-- <line-chart ref="tempRef" class-name="temp-chart" :option="tempOption" /> -->
                </el-tab-pane>
                <el-tab-pane label="湿度" name="humi">
                    <!-- <line-chart ref="humiRef" class-name="humi-chart" :option="humiOption" /> -->
                </el-tab-pane>
                <el-tab-pane label="PM2.5" name="pm25">
                    <!-- <line-chart class-name="pm25-chart" :option="pm25Option" /> -->
                </el-tab-pane>
                <el-tab-pane label="硫化氢" name="h2s">
                    <!-- <line-chart class-name="h2s-chart" :option="h2sOption" /> -->
                </el-tab-pane>
                <el-tab-pane label="氨气" name="nh3">
                    <!-- <line-chart class-name="nh3-chart" :option="nh3Option" /> -->
                </el-tab-pane>
                <el-tab-pane label="异味" name="voc">
                    <!-- <line-chart class-name="voc-chart" :option="vocOption" /> -->
                </el-tab-pane>
                <el-tab-pane label="二氧化碳" name="co2">
                    <!-- <line-chart class-name="co2-chart" :option="co2Option" /> -->
                </el-tab-pane>
                <el-tab-pane label="甲醛" name="ch2o">
                    <!-- <line-chart class-name="ch2o-chart" :option="ch2oOption" /> -->
                </el-tab-pane>
                <el-tab-pane label="照明" name="lux">
                    <!-- <line-chart class-name="lux-chart" :option="luxOption" /> -->
                </el-tab-pane>

                <line-chart :option="option" />
            </el-tabs>
        </div>

        <!-- table -->
        <div class="table-div">
            <el-table
                    :data="tableData"
                    highlight-current-row
                    height="100%"
                    style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="男厕硫化氢">
                                <span>{{ props.row.manH2s }}</span>
                            </el-form-item>
                            <el-form-item label="男厕氨气">
                                <span>{{ props.row.manNh3 }}</span>
                            </el-form-item>
                            <el-form-item label="男厕异味">
                                <span>{{ props.row.manVoc }}</span>
                            </el-form-item>
                            <el-form-item label="男厕二氧化碳">
                                <span>{{ props.row.manCo2 }}</span>
                            </el-form-item>
                            <el-form-item label="男厕甲醛">
                                <span>{{ props.row.manCh2o }}</span>
                            </el-form-item>
                            <el-form-item label="男厕照明">
                                <span>{{ props.row.manLux }}</span>
                            </el-form-item>
                            <el-form-item label="女厕硫化氢">
                                <span>{{ props.row.womanH2s }}</span>
                            </el-form-item>
                            <el-form-item label="女厕氨气">
                                <span>{{ props.row.womanNh3 }}</span>
                            </el-form-item>
                            <el-form-item label="女厕异味">
                                <span>{{ props.row.womanVoc }}</span>
                            </el-form-item>
                            <el-form-item label="女厕二氧化碳">
                                <span>{{ props.row.womanCo2 }}</span>
                            </el-form-item>
                            <el-form-item label="女厕甲醛">
                                <span>{{ props.row.womanCh2o }}</span>
                            </el-form-item>
                            <el-form-item label="女厕照明">
                                <span>{{ props.row.womanLux }}</span>
                            </el-form-item>
                            <el-form-item v-if="hasThird" label="第三厕温度">
                                <span>{{ props.row.thirdTemp }}</span>
                            </el-form-item>
                            <el-form-item v-if="hasThird" label="第三厕湿度">
                                <span>{{ props.row.thirdHumi }}</span>
                            </el-form-item>
                            <el-form-item v-if="hasThird" label="第三厕PM2.5">
                                <span>{{ props.row.thirdPm25 }}</span>
                            </el-form-item>
                            <el-form-item v-if="hasThird" label="第三厕硫化氢">
                                <span>{{ props.row.thirdH2s }}</span>
                            </el-form-item>
                            <el-form-item v-if="hasThird" label="第三厕氨气">
                                <span>{{ props.row.thirdNh3 }}</span>
                            </el-form-item>
                            <el-form-item v-if="hasThird" label="第三厕异味">
                                <span>{{ props.row.thirdVoc }}</span>
                            </el-form-item>
                            <el-form-item v-if="hasThird" label="第三厕二氧化碳">
                                <span>{{ props.row.thirdCo2 }}</span>
                            </el-form-item>
                            <el-form-item v-if="hasThird" label="第三厕甲醛">
                                <span>{{ props.row.thirdCh2o }}</span>
                            </el-form-item>
                            <el-form-item v-if="hasThird" label="第三厕照明">
                                <span>{{ props.row.thirdLux }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        prop="statTime"
                        label="时间"
                        width="100">
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        prop="manTemp"
                        label="男厕温度"
                        width="300">
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        prop="manHumi"
                        label="男厕湿度"
                        width="200">
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        prop="manPm25"
                        label="男厕PM2.5"
                        width="200">
                </el-table-column>
                <el-table-column
                        v-if="hasThird"
                        align="center"
                        header-align="center"
                        prop="womanTemp"
                        label="女厕温度"
                        width="200">
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        prop="womanHumi"
                        label="女厕湿度"
                        width="200">
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        prop="womanPm25"
                        label="女厕PM2.5"
                        width="200">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import LineChart from '../dashboard/admin/components/LineChart';
    import { allToilets } from '@/api/toilet';
    import { getStatEnv } from '@/api/report';
    import { MessageBox, Message } from 'element-ui'
    import moment from "moment";

    export default {
      name: "Air",
      components: {
          LineChart,
      },
      data() {
          return {
            reportTimeType: "date",
            from: '',
            toilets: [],
            selectedToilets: [],

            activeName: 'temp',

            tempWidth: '100%',
            humiWidth: '0',

            option: null,
            tempOption: null,
            humiOption: null,
            pm25Option: null,
            h2sOption: null,
            nh3Option: null,
            vocOption: null,
            co2Option: null,
            ch2oOption: null,
            luxOption: null,

            tableData: [],
            hasThird: false
          }
      },
      mounted() {
          this.initTime();
          this.getAllToilets(() => {
              if (this.toilets && this.toilets.length > 0) {
                  this.selectedToilets = this.toilets[0].toiletCode;
                    this.search();
              }
          });
      },
      methods: {
        initTime() {
            this.from = moment().toDate();
        },
        getAllToilets(callback) {
            allToilets().then(res => {
                this.toilets = res;
                if (callback) {
                    callback();
                }
            });
        },
        tabClick() {
            switch(this.activeName) {
                case "temp":
                    this.option = this.tempOption;
                    break;
                case "humi":
                    this.option = this.humiOption;
                    break;
                case "pm25":
                    this.option = this.pm25Option;
                    break;
                case "h2s":
                    this.option = this.h2sOption;
                    break;
                case "nh3":
                    this.option = this.nh3Option;
                    break;
                case "voc":
                    this.option = this.vocOption;
                    break;
                case "co2":
                    this.option = this.co2Option;
                    break;
                case "ch2o":
                    this.option = this.ch2oOption;
                    break;
                case "lux":
                    this.option = this.luxOption;
                    break;
            }
        },
        search() {
            let from = moment(this.from).format('x');
            getStatEnv(this.selectedToilets, from).then(res => {
                console.log(res);
                let xAxis = [];

                let manTempDatas = [];
                let womanTempDatas = [];
                let thirdTempDatas = [];

                let manHumiDatas = [];
                let womanHumiDatas = [];
                let thirdHumiDatas = [];

                let manPm25Datas = [];
                let womanPm25Datas = [];
                let thirdPm25Datas = [];

                let manH2sDatas = [];
                let womanH2sDatas = [];
                let thirdH2sDatas = [];

                let manNh3Datas = [];
                let womanNh3Datas = [];
                let thirdNh3Datas = [];

                let manVocDatas = [];
                let womanVocDatas = [];
                let thirdVocDatas = [];

                let manCo2Datas = [];
                let womanCo2Datas = [];
                let thirdCo2Datas = [];

                let manCh2oDatas = [];
                let womanCh2oDatas = [];
                let thirdCh2oDatas = [];

                let manLuxDatas = [];
                let womanLuxDatas = [];
                let thirdLuxDatas = [];

                this.tableData = [];
                for (let data of res) {
                    let tableRowData = {};
                    tableRowData.statTime = data.statTime;
                    xAxis.push(data.statTime);
                    for (let oneData of data.data) {
                        if (oneData.toiletType == 1) {
                            tableRowData.manTemp = oneData.temp;
                            tableRowData.manHumi = oneData.humi;
                            tableRowData.manPm25 = oneData.pm25;
                            tableRowData.manH2s = oneData.h2s;
                            tableRowData.manNh3 = oneData.nh3;
                            tableRowData.manVoc = oneData.voc;
                            tableRowData.manCo2 = oneData.co2;
                            tableRowData.manCh2o = oneData.ch2o;
                            tableRowData.manLux = oneData.lux;
                            manTempDatas.push(oneData.temp);
                            manHumiDatas.push(oneData.humi);
                            manPm25Datas.push(oneData.pm25);
                            manH2sDatas.push(oneData.h2s);
                            manNh3Datas.push(oneData.nh3);
                            manVocDatas.push(oneData.voc);
                            manCo2Datas.push(oneData.co2);
                            manCh2oDatas.push(oneData.ch2o);
                            manLuxDatas.push(oneData.lux);
                        } else if (oneData.toiletType == 2) {
                            tableRowData.womanTemp = oneData.temp;
                            tableRowData.womanHumi = oneData.humi;
                            tableRowData.womanPm25 = oneData.pm25;
                            tableRowData.womanH2s = oneData.h2s;
                            tableRowData.womanNh3 = oneData.nh3;
                            tableRowData.womanVoc = oneData.voc;
                            tableRowData.womanCo2 = oneData.co2;
                            tableRowData.womanCh2o = oneData.ch2o;
                            tableRowData.womanLux = oneData.lux;
                            womanTempDatas.push(oneData.temp);
                            womanHumiDatas.push(oneData.humi);
                            womanPm25Datas.push(oneData.pm25);
                            womanH2sDatas.push(oneData.h2s);
                            womanNh3Datas.push(oneData.nh3);
                            womanVocDatas.push(oneData.voc);
                            womanCo2Datas.push(oneData.co2);
                            womanCh2oDatas.push(oneData.ch2o);
                            womanLuxDatas.push(oneData.lux);
                        } else if (oneData.toiletType == 3) {
                            tableRowData.thirdTemp = oneData.temp;
                            tableRowData.thirdHumi = oneData.humi;
                            tableRowData.thirdPm25 = oneData.pm25;
                            tableRowData.thirdH2s = oneData.h2s;
                            tableRowData.thirdNh3 = oneData.nh3;
                            tableRowData.thirdVoc = oneData.voc;
                            tableRowData.thirdCo2 = oneData.co2;
                            tableRowData.thirdCh2o = oneData.ch2o;
                            tableRowData.thirdLux = oneData.lux;
                            thirdTempDatas.push(oneData.temp);
                            thirdHumiDatas.push(oneData.humi);
                            thirdPm25Datas.push(oneData.pm25);
                            thirdH2sDatas.push(oneData.h2s);
                            thirdNh3Datas.push(oneData.nh3);
                            thirdVocDatas.push(oneData.voc);
                            thirdCo2Datas.push(oneData.co2);
                            thirdCh2oDatas.push(oneData.ch2o);
                            thirdLuxDatas.push(oneData.lux);
                        }
                    }

                    this.tableData.push(tableRowData);
                } 

                let tempLegend = ['男厕温度', '女厕温度'];
                let humiLegend = ['男厕湿度', '女厕湿度'];
                let pm25Legend = ['男厕PM2.5', '女厕PM2.5'];
                let h2sLegend = ['男厕硫化氢', '女厕硫化氢'];
                let nh3Legend = ['男厕氨气', '女厕氨气'];
                let vocLegend = ['男厕异味', '女厕异味'];
                let co2Legend = ['男厕二氧化碳', '女厕二氧化碳'];
                let ch2oLegend = ['男厕甲醛', '女厕甲醛'];
                let luxLegend = ['男厕照明', '女厕照明'];

                let tempSeries = [
                    {
                        name: '男厕温度',
                        type: 'line',
                        data: manTempDatas
                    },
                    {
                        name: '女厕温度',
                        type: 'line',
                        data: womanTempDatas
                    }
                ]

                let humiSeries = [
                    {
                        name: '男厕湿度',
                        type: 'line',
                        data: manHumiDatas
                    },
                    {
                        name: '女厕湿度',
                        type: 'line',
                        data: womanHumiDatas
                    }
                ]

                let pm25Series = [
                    {
                        name: '男厕PM2.5',
                        type: 'line',
                        data: manPm25Datas
                    },
                    {
                        name: '女厕PM2.5',
                        type: 'line',
                        data: womanPm25Datas
                    }
                ]

                let h2sSeries = [
                    {
                        name: '男厕硫化氢',
                        type: 'line',
                        data: manH2sDatas
                    },
                    {
                        name: '女厕硫化氢',
                        type: 'line',
                        data: womanH2sDatas
                    }
                ]

                let nh3Series = [
                    {
                        name: '男厕氨气',
                        type: 'line',
                        data: manNh3Datas
                    },
                    {
                        name: '女厕氨气',
                        type: 'line',
                        data: womanNh3Datas
                    }
                ]

                let vocSeries = [
                    {
                        name: '男厕异味',
                        type: 'line',
                        data: manVocDatas
                    },
                    {
                        name: '女厕异味',
                        type: 'line',
                        data: womanVocDatas
                    }
                ]

                let co2Series = [
                    {
                        name: '男厕二氧化碳',
                        type: 'line',
                        data: manCo2Datas
                    },
                    {
                        name: '女厕二氧化碳',
                        type: 'line',
                        data: womanCo2Datas
                    }
                ]

                let ch2oSeries = [
                    {
                        name: '男厕甲醛',
                        type: 'line',
                        data: manCh2oDatas
                    },
                    {
                        name: '女厕甲醛',
                        type: 'line',
                        data: womanCh2oDatas
                    }
                ]

                let luxSeries = [
                    {
                        name: '男厕照明',
                        type: 'line',
                        data: manLuxDatas
                    },
                    {
                        name: '女厕照明',
                        type: 'line',
                        data: womanLuxDatas
                    }
                ]

                if (thirdTempDatas.length > 0) {
                    this.hasThird = true;

                    tempLegend.push('第三厕温度');
                    humiLegend.push('第三厕湿度');
                    pm25Legend.push('第三厕PM2.5');
                    h2sLegend.push('第三厕硫化氢');
                    nh3Legend.push('第三厕氨气');
                    vocLegend.push('第三厕异味');
                    co2Legend.push('第三厕二氧化碳');
                    ch2oLegend.push('第三厕甲醛');
                    luxLegend.push('第三厕照明');

                    tempSeries.push({
                        name: '第三厕温度',
                        type: 'line',
                        data: thirdTempDatas
                    });

                    humiSeries.push({
                        name: '第三厕湿度',
                        type: 'line',
                        data: thirdHumiDatas
                    });

                    pm25Series.push({
                        name: '第三厕PM2.5',
                        type: 'line',
                        data: thirdPm25Datas
                    });

                    h2sSeries.push({
                        name: '第三厕硫化氢',
                        type: 'line',
                        data: thirdH2sDatas
                    });

                    nh3Series.push({
                        name: '第三厕氨气',
                        type: 'line',
                        data: thirdNh3Datas
                    });

                    vocSeries.push({
                        name: '第三厕异味',
                        type: 'line',
                        data: thirdVocDatas
                    });

                    co2Series.push({
                        name: '第三厕二氧化碳',
                        type: 'line',
                        data: thirdCo2Datas
                    });

                    ch2oSeries.push({
                        name: '第三厕甲醛',
                        type: 'line',
                        data: thirdCh2oDatas
                    });

                    luxSeries.push({
                        name: '第三厕照明',
                        type: 'line',
                        data: thirdLuxDatas
                    });
                }

                this.tempOption = this.getOption(xAxis, tempLegend, tempSeries, '温度', '摄氏度');
                this.humiOption = this.getOption(xAxis, humiLegend, humiSeries, '湿度', '摄氏度');
                this.pm25Option = this.getOption(xAxis, pm25Legend, pm25Series, 'PM2.5', '摄氏度');
                this.h2sOption = this.getOption(xAxis, h2sLegend, h2sSeries, '硫化氢', '摄氏度');
                this.nh3Option = this.getOption(xAxis, nh3Legend, nh3Series, '氨气', '摄氏度');
                this.vocOption = this.getOption(xAxis, vocLegend, vocSeries, '异味', '摄氏度');
                this.co2Option = this.getOption(xAxis, co2Legend, co2Series, '二氧化碳', '摄氏度');
                this.ch2oOption = this.getOption(xAxis, ch2oLegend, ch2oSeries, '甲醛', '摄氏度');
                this.luxOption = this.getOption(xAxis, luxLegend, luxSeries, '照明', '摄氏度');

                // 默认显示温度
                this.option = this.tempOption;
            });
        },
        getOption(xAxis, legend, series, yAxisName, unit) {
            return {
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
                        dataView: {show: true, readOnly: false},
                        magicType: {show: true, type: ['line', 'bar']},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                legend: {
                    data: legend
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
                        name: yAxisName,
                        // min: 0,
                        // max: 250,
                        // interval: 50,
                        axisLabel: {
                            formatter: '{value} ' + unit
                        }
                    }
                ],
                series: series
            };
        }
      }
    }
</script>

<style lang="less" scoped>
    .air-container {
        height: 100%;
        padding: 20px;
    }

    .condition {
        height: 36px;
    }

    .date-from {
        margin-left: 20px;
    }

    .condition-right {
        float: right;
        display: inline-block;

        .search-button {
            margin-left: 20px
        }
    }

    .chart-container {
        
    }

    .table-div {
        height: calc(~"100% - 440px");
    }

    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>