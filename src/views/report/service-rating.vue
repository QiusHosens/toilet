<template>
    <div class="service-container">
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
            name: '男厕',
            color: '#3888fa',
            data: [100, 120, 161, 134, 105, 160, 165]
        }, {
            name: '女厕',
            color: '#FF005A',
            data: [120, 82, 91, 154, 162, 140, 145]
        }]
    }

    export default {
        name: "ServiceRating",
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
    .service-container {
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