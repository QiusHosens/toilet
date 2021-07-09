<template>
    <div class="control-container">
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
                                        <el-progress type="circle" :percentage="30" :color="manCountColor" :width="60"></el-progress>
                                    </div>
                                    <div class="count-number-container">
                                        9
                                    </div>
                                </div>
                            </div>

                            <div class="env-container">
                                <div class="env-row-container" v-for="(item, index) in envList" :key="index">
                                    <div class="env-icon-container">
                                        <svg-icon class-name="env-icon" :icon-class="item.iconClass"/>
                                    </div>
                                    <div class="env-content-container">
                                        <div :style="'width:' + item.nameWidth">{{ item.name }}</div>
                                        <div class="env-value-container" :style="'width:' + item.valueWidth">{{ item.vlaue }}</div>
                                        <div :style="'width:' + item.unitWidth">{{ item.unit }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </dv-border-box-12>
                </div>
                <div class="center-container">
                    <div class="top-container">
                        <div class="inner-container">
                            <dv-border-box-12>
                                <div ref="manContainer" class="inner-content-container top-content-container">
                                    <div class="svg-container" :style="'width: ' + iconContainerSize + '; height: ' + iconContainerSize" v-for="(item, index) in manList" :key="index">
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
                                    <div class="inner-content-container bottom-content-container">
                                    </div>
                                </dv-border-box-12>
                            </div>
                            <div class="inner-container">
                                <dv-border-box-12>
                                    <div class="inner-content-container bottom-content-container">
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
                                        <el-progress type="circle" :percentage="30" :color="womanCountColor" :width="60"></el-progress>
                                    </div>
                                    <div class="count-number-container">
                                        9
                                    </div>
                                </div>
                            </div>

                            <div class="env-container">
                                <div class="env-row-container" v-for="(item, index) in envList" :key="index">
                                    <div class="env-icon-container">
                                        <svg-icon class-name="env-icon" :icon-class="item.iconClass"/>
                                    </div>
                                    <div class="env-content-container">
                                        <div :style="'width:' + item.nameWidth">{{ item.name }}</div>
                                        <div class="env-value-container" :style="'width:' + item.valueWidth">{{ item.vlaue }}</div>
                                        <div :style="'width:' + item.unitWidth">{{ item.unit }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </dv-border-box-12>
                </div>
            </div>
        </dv-border-box-11>
    </div>
</template>

<script>
export default {
    name: "DeviceControl",
    data() {
        return {
            womanCountColor: '#FC28F4',
            manCountColor: '#1BA3FC',
            envList: [
                {
                    iconClass: 'temperature',
                    nameWidth: '32px',
                    valueWidth: 'calc(100% - 49px)',
                    unitWidth: '17px',
                    name: '温度',
                    vlaue: 30,
                    unit: '°C'
                },
                {
                    iconClass: 'humidity',
                    nameWidth: '32px',
                    valueWidth: 'calc(100% - 46px)',
                    unitWidth: '14px',
                    name: '湿度',
                    vlaue: 30,
                    unit: '%'
                },
                {
                    iconClass: 'pm25',
                    nameWidth: '46px',
                    valueWidth: 'calc(100% - 89px)',
                    unitWidth: '43px',
                    name: 'PM2.5',
                    vlaue: 30,
                    unit: 'ug/m³'
                },
                {
                    iconClass: 'nh3',
                    nameWidth: '32px',
                    valueWidth: 'calc(100% - 79px)',
                    unitWidth: '47px',
                    name: '氨气',
                    vlaue: 30,
                    unit: 'mg/m³'
                },
                {
                    iconClass: 'h2s',
                    nameWidth: '48px',
                    valueWidth: 'calc(100% - 95px)',
                    unitWidth: '47px',
                    name: '硫化氢',
                    vlaue: 30,
                    unit: 'mg/m³'
                }
            ],

            iconContainerSize: '20%',
            manList: [],
            womanList: [],

            consumTableConfig: {
                header: ['列1', '列2', '列3'],
                data: [
                    ['行1列1', '行1列2', '行1列3'],
                    ['行2列1', '行2列2', '行2列3'],
                    ['行3列1', '行3列2', '行3列3'],
                    ['行4列1', '行4列2', '行4列3'],
                    ['行5列1', '行5列2', '行5列3'],
                    ['行6列1', '行6列2', '行6列3'],
                    ['行7列1', '行7列2', '行7列3'],
                    ['行8列1', '行8列2', '行8列3'],
                    ['行9列1', '行9列2', '行9列3'],
                    ['行10列1', '行10列2', '行10列3']
                ]
            }
        }
    },
    mounted() {
        this.getDistStatus();
    },
    methods: {
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
            }
        }
        
    }

    /deep/ .el-progress--circle .el-progress__text {
        color: white;
    }
</style>
