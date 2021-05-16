<template>
    <div class="consumable-container">
        <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="卫生纸" name="first">卫生纸</el-tab-pane>
            <el-tab-pane label="洗手液" name="second">洗手液</el-tab-pane>
            <el-tab-pane label="喷香" name="third">喷香</el-tab-pane>
            <el-tab-pane label="垃圾桶" name="fourth">垃圾桶</el-tab-pane>
            <el-tab-pane label="干手器" name="five">干手器</el-tab-pane>
        </el-tabs> -->
        <div class="condition">
            <el-radio-group v-model="reportTimeType" size="small">
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
                <el-button class="search-button" type="primary" size="small"  icon="el-icon-search" @click="search()">搜索</el-button>
            </div>
        </div>

        <div class="chart-container">
            <line-chart :chart-data="lineChartData" />
        </div>
    </div>
</template>

<script>
    import LineChart from '../dashboard/admin/components/LineChart';
    const lineChartData = {
        xAxisData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datas: [{
            name: '卫生纸',
            color: '#3888fa',
            data: [100, 120, 161, 134, 105, 160, 165]
        }, {
            name: '洗手液',
            color: '#EF005A',
            data: [120, 82, 91, 154, 162, 140, 145]
        }, {
            name: '喷香',
            color: '#AF005A',
            data: [200, 192, 120, 144, 160, 130, 140]
        }, {
            name: '垃圾桶',
            color: '#7F005A',
            data: [180, 160, 151, 106, 145, 150, 130]
        }, {
            name: '干手器',
            color: '#8F005A',
            data: [80, 100, 121, 104, 105, 90, 100]
        }]
    }

    export default {
        name: "Consumables",
        components: {
            LineChart,
        },
        data() {
            return {
                reportTimeType: "date",
                from: '',
                to: '',

                lineChartData: lineChartData
            }
        },
        methods: {
            
        }
    }
</script>

<style scoped>
    .consumable-container {
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
    }

    .chart-container {
        height: calc(100% - 36px);
    }
</style>