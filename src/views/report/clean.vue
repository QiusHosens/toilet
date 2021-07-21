<template>
    <div class="clean-container">
        <div class="condition">
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

        <!-- <div class="chart-container">
            <line-chart :chart-data="lineChartData" />
        </div> -->

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
                        prop="toiletSn"
                        label="厕所编号"
                        width="200">
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        prop="toiletName"
                        label="厕所名称"
                        width="200">
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        prop="toiletType"
                        label="厕所类型"
                        width="100">
                    <template slot-scope="scope">
                        {{ scope.row.toiletType == '1' ? '男' : scope.row.toiletType == '2' ? '女' : '第三' }}
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        prop="startTime"
                        label="开始时间"
                        width="200">
                    <template slot-scope="scope">
                        {{ transformTime(scope.row.startTime) }}
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        prop="endTime"
                        label="结束时间"
                        width="200">
                    <template slot-scope="scope">
                        {{ transformTime(scope.row.endTime) }}
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        prop="timeLimited"
                        label="时间限制"
                        width="100">
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        prop="clearName"
                        label="打扫人"
                        width="200">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import { allToilets } from '@/api/toilet';
    import { getStatClear } from '@/api/report';
    import { MessageBox, Message } from 'element-ui'
    import moment from "moment";

    export default {
        name: "Clean",
        // components: {
        //     LineChart,
        // },
        data() {
            return {
                reportTimeType: "date",
                from: '',
                to: '',
                toilets: [],
                selectedToilets: [],

                tableData: [],
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
                this.to = moment().toDate();
                this.from = moment().startOf('day').subtract(6, "days").toDate();
            },
            getAllToilets(callback) {
                allToilets().then(res => {
                    this.toilets = res;
                    if (callback) {
                        callback();
                    }
                });
            },
            search() {
                let from = moment(this.from).format('x');
                let to = moment(this.to).format('x');
                getStatClear(this.selectedToilets, from, to).then(res => {
                    this.tableData = res;
                })
            },
            transformTime(timestamp) {
                return moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
            }
        }
    }
</script>

<style lang="less" scoped>
    .clean-container {
        height: 100%;
        padding: 20px;
    }

    /* .date-from {
        margin-left: 20px;
    } */

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

    .table-div {
        height: calc(100% - 36px);
    }
</style>