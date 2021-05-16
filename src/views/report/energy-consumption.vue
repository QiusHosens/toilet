<template>
    <div class="energy-container">
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
                    multiple
                    collapse-tags
                    clearable
                    filterable
                    style="margin-left: 20px;"
                    placeholder="请选择"
                    @change="selectedChange()">
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
                        width="400">
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        prop="totalWater"
                        label="用水量"
                        width="400">
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        prop="totalElc"
                        label="用电量"
                        width="400">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import LineChart from '../dashboard/admin/components/LineChart';
    import { allToilets } from '@/api/toilet';
    import { getStatWaterAndElec } from '@/api/report';
    import { MessageBox, Message } from 'element-ui'
    import moment from "moment";

    export default {
      name: "EnergyConsumption",
      components: {
          LineChart,
      },
      data() {
          return {
            reportTimeType: "date",
            from: '',
            to: '',
            toilets: [],
            selectedToilets: [],

            option: null,
            tableData: [],
            hasThird: false
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
        selectedChange() {
            // 最多选中10条,不然不能传参
            if (this.selectedToilets.length > 10) {
                Message({
                    message: '最多选择十个厕所',
                    type: 'error',
                    duration: 5 * 1000
                });

                this.selectedToilets.pop();
            }
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
            let from = moment(this.from).format("x");
            let to = moment(this.to).format("x");
            getStatWaterAndElec(this.selectedToilets.toString(), from, to, statType).then(res => {
                this.tableData = res;

                let xAxis = [];
                let warterDatas = [];
                let elcDatas = [];
                for (let data of res) {
                    xAxis.push(data.statTime);
                    warterDatas.push(data.totalWater);
                    warterDatas.push(data.totalElc);
                }

                let legend = ['用水量', '用电量']
                let series = [
                    {
                        name: '用水量',
                        type: 'bar',
                        data: warterDatas
                    },
                    {
                        name: '用电量',
                        type: 'line',
                        yAxisIndex: 1,
                        data: warterDatas
                    }
                ]

                this.option = this.getOption(xAxis, legend, series);
            });
        },
        getOption(xAxis, legend, series) {
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
                        name: '用水量',
                        // min: 0,
                        // max: 250,
                        // interval: 50,
                        axisLabel: {
                            formatter: '{value} 升'
                        }
                    },
                    {
                        type: 'value',
                        name: '用电量',
                        // min: 0,
                        // max: 250,
                        // interval: 50,
                        axisLabel: {
                            formatter: '{value} 度'
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
    .energy-container {
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
    }
</style>