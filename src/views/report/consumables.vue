<template>
    <div class="flow-container">
        <div class="condition">
            <el-radio-group v-model="reportTimeType" size="small" @change="initTime()">
                <el-radio-button label="date">日</el-radio-button>
                <el-radio-button label="week">周</el-radio-button>
                <el-radio-button label="month">月</el-radio-button>
                <el-radio-button label="year">年</el-radio-button>
            </el-radio-group>
            <el-date-picker
                class="date-from"
                size="small"
                v-model="from"
                :type="reportTimeType"
                placeholder="选择日期">
            </el-date-picker>
            <el-date-picker
                class="date-to"
                v-model="to"
                size="small"
                :type="reportTimeType"
                placeholder="选择日期">
            </el-date-picker>
            
            <div class="condition-right">
                <el-select
                    size="small"
                    v-model="selectedToilets"
                    clearable
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
            <line-chart :option="option" />
        </div>

        <!-- table -->
        <div class="table-div">
            <div class="table-left">
                <el-table
                        :data="residueTableData"
                        highlight-current-row
                        height="100%"
                        style="width: 100%">
                    <el-table-column
                            align="center"
                            header-align="center"
                            prop="toiletName"
                            label="厕所名"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            header-align="center"
                            prop="toiletType"
                            label="厕所类型"
                            width="100">
                            <template slot-scope="scope">
                                {{ scope.row.toiletType == 1 ? '男厕' : scope.row.toiletType == 2 ? '女厕' : '第三厕' }}
                            </template>
                    </el-table-column>
                    <el-table-column
                            align="center"
                            header-align="center"
                            prop="consumName"
                            label="耗材名"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            header-align="center"
                            prop="residue"
                            label="剩余量"
                            width="100">
                    </el-table-column>
                </el-table>
            </div>
            <div class="table-right">
                <el-table
                        :data="tableData"
                        highlight-current-row
                        height="100%"
                        style="width: 100%">
                    <el-table-column
                            align="center"
                            header-align="center"
                            prop="statTime"
                            label="时间"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            header-align="center"
                            prop="consumName"
                            label="耗材名"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            header-align="center"
                            prop="useTimes"
                            label="使用次数"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            header-align="center"
                            prop="replaceTimes"
                            label="更换次数"
                            width="100">
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
    import LineChart from '../dashboard/admin/components/LineChart';
    import { allToilets } from '@/api/toilet';
    import { getStatConsumResidue, getStatConsum } from '@/api/report';
    import { MessageBox, Message } from 'element-ui'
    import moment from "moment";

    export default {
      name: "Flow",
      components: {
          LineChart,
      },
      data() {
          return {
            reportTimeType: "date",
            from: '',
            to: '',
            toilets: [],
            selectedToilets: '',

            option: null,

            tableData: [],
            residueTableData: []
          }
      },
      mounted() {
          this.initTime();
          this.getAllToilets();
          this.search();
      },
      methods: {
        initTime() {
            // 默认查询七日/周/月/年
            switch(this.reportTimeType) {
                case "date":
                    this.to = moment().toDate();
                    this.from = moment().startOf('day').subtract(6, "days").toDate();
                    break;
                case "week":
                    this.to = moment().toDate();
                    this.from = moment().startOf('isoWeek').subtract(6, "weeks").toDate();
                    break;
                case "month":
                    this.to = moment().toDate();
                    this.from = moment().startOf('month').subtract(6, "months").toDate();
                    break;
                case "year":
                    this.to = moment().toDate();
                    this.from = moment().startOf('year').subtract(6, "years").toDate();
                    break;
            }
        },
        getAllToilets() {
            allToilets().then(res => {
                this.toilets = res;
            });
        },
        search() {
            let statType = 0;
            switch(this.reportTimeType) {
                case "week":
                    statType = 1;
                    break;
                case "month":
                    statType = 2;
                    break;
                case "year":
                    statType = 4;
                    break;
            }
            let from = moment(this.from).format('x');
            let to = moment(this.to).format('x');
            getStatConsumResidue(this.selectedToilets.toString()).then(res => {
                this.residueTableData = res;
            });
            getStatConsum(this.selectedToilets, from, to, statType).then(res => {
                // console.log(res);
                // 根据时间分类,并找出所有类型
                let timesData = {};
                let types = {};
                types['use'] = {};
                types['replace'] = {};
                for (let data of res) {
                    // 如果没有该时间,则加上该时间
                    if (!timesData[data.statTime]) {
                        timesData[data.statTime] = [];
                    }
                    timesData[data.statTime].push(data);

                    if (!types['use'][data.consumName]) {
                        types['use'][data.consumName] = [];
                        types['replace'][data.consumName] = [];
                    }
                }
                let xAxis = [];
                let find;
                for (let time in timesData) {
                    xAxis.push(time);
                    for (let type in types['use']) {
                        find = false;
                        for (let timeData of timesData[time]) {
                            if (type == timeData.consumName) {
                                find = true;
                                types['use'][type].push(timeData.useTimes);
                                types['replace'][type].push(timeData.replaceTimes);
                            }
                        }
                        if (!find) {
                            types['use'][type].push(0);
                            types['replace'][type].push(0);
                        }
                    }
                }
                this.tableData = res;

                let legend = [];
                for (let type in types['use']) {
                    legend.push('使用次数-' + type);
                }
                for (let type in types['replace']) {
                    legend.push('更换次数-' + type);
                }

                let series = [];
                for (let type in types['use']) {
                    series.push({
                        name: '使用次数-' + type,
                        type: 'bar',
                        emphasis: {
                            focus: 'series'
                        },
                        stack: 'use',
                        data: types['use'][type]
                    })
                }

                for (let type in types['replace']) {
                    series.push({
                        name: '更换次数-' + type,
                        type: 'bar',
                        emphasis: {
                            focus: 'series'
                        },
                        stack: 'replace',
                        data: types['replace'][type]
                    })
                }

                console.log(legend, series);
                this.option = this.getOption(xAxis, legend, series);


            });
        },
        getOption(xAxis, legend, series) {
            return {
                // tooltip: {
                //     trigger: 'axis',
                //     axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                //         type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                //     }
                // },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }, formatter: function (params) {
                        //x轴的名称
                        var htmlStr = params[0].name + '<br/>';
                        for (var i = 0; i < params.length; i++) {
                            var param = params[i];
                            if (param.value > 0) {
                                htmlStr += '<div>';
                                //为了保证和原来的效果一样，复制的是：param.marker的源码，圆点样式：param.color
                                htmlStr += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + param.color + ';"></span>';
                                // 名称颜色设置
                                // htmlStr += '<span style="color:'+param.color+'">';
                                //圆点后面显示的名称
                                htmlStr += param.seriesName + '：' + param.value;
                                // htmlStr += '</span>';
                                htmlStr += '</div>';
                            }
                        }
                        return htmlStr;
                    }
                },
                legend: {
                    data: xAxis
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: xAxis
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: series
            };
        }
      }
    }
</script>

<style lang="less" scoped>
    .flow-container {
        height: 100%;
        padding: 20px;
    }

    .date-from {
        margin-left: 20px;
    }

    .date-to {
        margin-left: 20px;
    }

    .condition {
        height: 36px;
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
        height: calc(~"100% - 386px");
        float: left;

        .table-left {
            float: left;
            width: 50%;
            height: 100%;
        }

        .table-right {
            float: left;
            width: 50%;
            height: 100%;
        }
    }
</style>