<template>
    <div class="group-container">
        <!-- button -->
        <div class="row-div">
            <div class="row-left">
                <el-button type="primary" size="small" @click="clickAddToilet()">新增公厕</el-button>
                <!-- <el-button type="primary" size="small" @click="clickImportToilet()">导入公厕</el-button> -->
                <!-- <el-button type="danger" size="small" @click="clickDelToilet()">删除公厕</el-button> -->
            </div>
            <div class="row-right">
                <span class="search-span">公厕名称</span>
                <el-input class="search-input" v-model="toiletName" size="small" placeholder="请输入公厕名称"></el-input>
                <el-button class="search-button" type="primary" size="small"  icon="el-icon-search" @click="search()">搜索</el-button>
            </div>
        </div>

        <!-- table -->
        <div class="row-div table-div">
            <el-table class="table-info"
                    :data="tableData"
                    highlight-current-row
                    height="calc(100% - 32px)"
                    style="width: 100%">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        fixed
                        align="center"
                        header-align="center"
                        prop="toiletCode"
                        label="公厕编码"
                        width="300">
                </el-table-column>
                <el-table-column
                        fixed
                        align="center"
                        header-align="center"
                        prop="toiletName"
                        label="公厕名称"
                        width="150">
                </el-table-column>
                <el-table-column
                        fixed
                        align="center"
                        header-align="center"
                        prop="toiletAdr"
                        label="公厕地址"
                        width="100">
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        prop="toiletTel"
                        label="公厕电话"
                        width="120">
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        prop="toiletStar"
                        label="公厕星级"
                        width="150">
                    <template slot-scope="scope">
                        <el-rate
                                disabled
                                :max="scope.row.toiletStar"
                                v-model="scope.row.toiletStar"
                                :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
                        </el-rate>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        prop="distName"
                        label="所属分销商"
                        width="300">
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        prop="groupName"
                        label="分组名"
                        width="100">
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        prop="longitude"
                        label="经度"
                        width="100">
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        prop="latitude"
                        label="纬度"
                        width="100">
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        prop="numSeatMan"
                        label="蹲位数量(男)"
                        width="120">
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        prop="numSeatFemale"
                        label="蹲位数量(女)"
                        width="120">
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        prop="numSeatThird"
                        label="蹲位数量(其他)"
                        width="150">
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        prop="planUrl"
                        label="计划地址"
                        width="100">
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        prop="crtDate"
                        label="创建日期"
                        width="100">
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        prop="memo"
                        label="备注"
                        width="100">
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        fixed="right"
                        label="操作"
                        width="120">
                    <template slot-scope="scope">
                        <el-button @click="viewToilet(scope.row)" type="text" size="small">查看</el-button>
                        <el-button @click="clickUpdateToilet(scope.row)" type="text" size="small">编辑</el-button>
                        <el-button @click="clickDeleteToilet(scope.row)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- pagination -->
            <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageIndex"
                    :page-size="10"
                    layout="prev, pager, next"
                    :page-count="totalPage"
                    @prev-click="prevClick()"
                    @next-click="nextClick()">
            </el-pagination>
        </div>

        <!-- add/edit modal -->
        <el-dialog :title="modalTitle" :visible.sync="modalShow" center width="1000px">
            <el-form :model="form">
                <el-form-item label="公厕名称" :label-width="formLabelWidth">
                    <el-input v-model="form.toiletName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="公厕地址" :label-width="formLabelWidth">
                    <el-input v-model="form.toiletAdr" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="公厕电话" :label-width="formLabelWidth">
                    <el-input v-model="form.toiletTel" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="公厕星级" :label-width="formLabelWidth">
                    <el-rate
                            v-model="form.toiletStar"
                            :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
                    </el-rate>
                </el-form-item>
                <el-form-item label="所属分销商" :label-width="formLabelWidth">
                    <el-select v-model="form.distCode" :disabled="form.toiletId ? true : false" placeholder="请选择" @change="distChange">
                        <el-option
                        v-for="item in allDists"
                        :key="item.distCode"
                        :label="item.distName"
                        :value="item.distCode">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属分组" :label-width="formLabelWidth">
                    <el-select v-model="form.groupCode" :disabled="form.toiletId ? true : false" placeholder="请选择">
                        <el-option
                        v-for="item in allGroups"
                        :key="item.groupCode"
                        :label="item.groupName"
                        :value="item.groupCode">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="位置(经度/纬度)" :label-width="formLabelWidth">
                    <el-input class="position-input" v-model="form.longitude" autocomplete="off"></el-input>
                    <el-input class="position-input position-input-right" v-model="form.latitude" autocomplete="off"></el-input>
                    <div class="location-div"><i class="el-icon-location location-i" @click="showMapPosition()"></i></div>
                </el-form-item>
                <el-form-item label="蹲位数量(男/女/其他)" :label-width="formLabelWidth">
                    <el-input class="seat-input" v-model="form.numSeatMan" autocomplete="off"></el-input>
                    <el-input class="seat-input seat-input-right" v-model="form.numSeatFemale" autocomplete="off"></el-input>
                    <el-input class="seat-input seat-input-right" v-model="form.numSeatThird" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="计划地址" :label-width="formLabelWidth">
                    <el-input v-model="form.planUrl" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注" :label-width="formLabelWidth">
                    <el-input v-model="form.memo" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="modalShow = false">取 消</el-button>
                <el-button type="primary" @click="save()">确 定</el-button>
            </div>
        </el-dialog>

        <!-- view model -->
        <el-dialog :title="viewModalTitle" :visible.sync="viewModalShow" center width="1000px">
            <el-form class="view-form" :model="form">
                <el-form-item label="公厕编码" :label-width="formLabelWidth">
                    {{ form.toiletCode }}
                </el-form-item>
                <el-form-item label="公厕名称" :label-width="formLabelWidth">
                    {{ form.toiletName }}
                </el-form-item>
                <el-form-item label="公厕地址" :label-width="formLabelWidth">
                    {{ form.toiletAdr }}
                </el-form-item>
                <el-form-item label="公厕电话" :label-width="formLabelWidth">
                    {{ form.toiletTel }}
                </el-form-item>
                <el-form-item label="公厕星级" :label-width="formLabelWidth">
                    <el-rate
                            disabled
                            :max="form.toiletStar"
                            v-model="form.toiletStar"
                            :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
                    </el-rate>
                </el-form-item>
                <el-form-item label="所属分销商" :label-width="formLabelWidth">
                    {{ form.distName }}
                </el-form-item>
                <el-form-item label="所属分组" :label-width="formLabelWidth">
                    {{ form.groupName }}
                </el-form-item>
                <el-form-item label="位置(经度/纬度)" :label-width="formLabelWidth">
                    {{ form.longitude }}, {{ form.latitude }}
                    <div class="location-div"><i class="el-icon-location location-i" @click="showMapPosition()"></i></div>
                </el-form-item>
                <el-form-item label="蹲位数量(男/女/其他)" :label-width="formLabelWidth">
                    {{ form.numSeatMan }}/{{ form.numSeatFemale }}/{{ form.numSeatThird }}
                </el-form-item>
                <el-form-item label="计划地址" :label-width="formLabelWidth">
                    {{ form.planUrl }}
                </el-form-item>
                <el-form-item label="备注" :label-width="formLabelWidth">
                    {{ form.memo }}
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-dialog
            :title="deleteModalTitle"
            :visible.sync="deleteModalShow"
            width="30%">
            <span>确定删除公厕{{ form.toiletName }}?</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteModalShow = false">取 消</el-button>
                <el-button type="primary" @click="delToilet()">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog
            :title="positionMapTitle"
            :visible.sync="positionMapShow"
            width="1000px"
            @opened="getMapPosition()">
            <div id="device-map" class="device-map"></div>
        </el-dialog>
    </div>
</template>

<script>
  import { addToilet, deleteToilet, existToilet, updateToilet, pageToilets } from '@/api/toilet';
  import { getAllDists } from '@/api/dist'
  import { getAllGroups } from '@/api/group'
  import store from '@/store'
  import { MessageBox, Message } from 'element-ui'

  export default {
    name: "Device",
    data() {
      return {
        viewModalTitle: '公厕信息',
        viewModalShow: false,
        deleteModalTitle: '删除公厕',
        deleteModalShow: false,
        modalTitle: '新增公厕',
        positionMapTitle: '位置查看',
        positionMapShow: false,
        modalShow: false,
        formLabelWidth: '150px',
        emptyForm: {
        //   toiletId: "",
        //   toiletCode: "",
          toiletName: "",
          toiletAdr: "",
          toiletTel: "",
          toiletStar: "",
          distCode: "",
          groupCode: "",
          longitude: "",
          latitude: "",
          numSeatMan: "",
          numSeatFemale: "",
          numSeatThird: "",
          planUrl: "",
        //   crtDate: "",
          memo: ""
        },
        form: {
          toiletId: "",
          toiletCode: "",
          toiletName: "",
          toiletAdr: "",
          toiletTel: "",
          toiletStar: "",
          distCode: "",
          groupCode: "",
          longitude: "",
          latitude: "",
          numSeatMan: "",
          numSeatFemale: "",
          numSeatThird: "",
          planUrl: "",
          crtDate: "",
          memo: ""
        },

        toiletName: '',

        tableData: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,

        saveType: '',
        allDists: [],
        allGroups: []
      }
    },
    mounted() {
      this.pageToilet();
    },
    methods: {
      clickAddToilet() {
        this.getAllDists(() => {
            this.modalTitle = '新增公厕';
            this.form = JSON.parse(JSON.stringify(this.emptyForm));
            this.saveType = 'add';
            this.modalShow = true;
        });
      },
      clickImportToilet() {

      },
      clickDelToilet() {

      },
      viewToilet(toilet) {
        this.form = toilet;
        this.viewModalShow = true;
      },
      clickUpdateToilet(toilet) {
        this.modalTitle = '编辑公厕';
        this.form = toilet;
        this.saveType = 'update';
        this.modalShow = true;
      },
      clickDeleteToilet(toilet) {
          this.form = toilet;
        this.deleteModalShow = true;
      },
      save() {
        if (this.saveType == 'add') {
          addToilet(this.form).then(res => {
            this.modalShow = false;
            // 刷新分页
            this.pageToilet();
          });
        } else if (this.saveType == 'update') {
          updateToilet(this.form).then(res => {
            this.modalShow = false;
            // 刷新分页
            this.pageToilet();
          })
        } else {
          this.modalShow = false;
        }
      },
      getAllDists(callback) {
          let distCode = store.getters.distCode
          getAllDists(distCode).then(res => {
              if (res && res.length > 0) {
                this.allDists = res;
                this.emptyForm.distCode = this.allDists[0].distCode;
                this.getGroupsByDist(this.emptyForm.distCode);
                if (callback) {
                    callback();
                }
              } else {
                Message({
                    message: '请先添加分销商',
                    type: 'warn',
                    duration: 5 * 1000
                });
              }
          });
      },
      distChange(distCode) {
          this.getGroupsByDist(distCode);
      },
      getGroupsByDist(distCode) {
          this.allGroups = [];
          getAllGroups(distCode).then(res => {
              this.allGroups = res;
          });
      },
      delToilet() {
        deleteToilet(this.form.toiletId).then(res => {
          // 刷新分页
          this.pageToilet();
          this.deleteModalShow = false;
        });
      },
      search() {
        this.pageToilet();
      },
      pageToilet() {
        pageToilets(this.pageSize, this.pageIndex, '', '', this.toiletName).then(res => {
          this.tableData = res.pageData;
          this.totalPage = res.totalPage;
        })
      },
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.pageToilet();
      },
      handleCurrentChange(pageIndex) {
        this.pageIndex = pageIndex;
        this.pageToilet();
      },
      prevClick() {
          this.handleCurrentChange(-- this.pageIndex);
      },
      nextClick() {
        this.handleCurrentChange(++ this.pageIndex);
      },
      showMapPosition() {
        if (this.form.latitude > -180 && this.form.latitude < 180
            && this.form.longitude > -90 && this.form.longitude < 90) {
            this.positionMapShow = true;
        } else {
            Message({
                message: '经度请限制在-180~180之间,纬度请限制在-90~90之间',
                type: 'error',
                duration: 5 * 1000
            });
        }
      },
      getMapPosition() {
        let position = new qq.maps.LatLng(this.form.latitude, this.form.longitude);
        let map = new qq.maps.Map('device-map', {
            mapStyleId: 'style1',  // 该key绑定的style1对应于经典地图样式，若未绑定将弹出无权限提示窗
            zoomControl: false,
            panControl: false,
            zoom: 15,
            center: position
        });

        var listener = qq.maps.event.addListener(map, 'tilesloaded', () => {
                var marker = new qq.maps.Marker({
                    position: position,
                    map: map
                });
            }
        );
      }
    }
  }
</script>

<style lang="less" scoped>
    .group-container {
        padding: 20px;

        height: 100%;
    }

    /deep/ .el-input {
        width: 300px;
    }

    /deep/ .el-form-item {
        margin-bottom: 22px;
        width: 50%;
        float: left;
    }

    /deep/ .el-table th > .cell {
        display: inline-block;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
        vertical-align: middle;
        padding-left: 14px;
        padding-right: 14px;
        width: 100%;
    }

    /deep/ .el-pagination {
        float: right;
    }

    .row-div {
        margin-bottom: 10px;
    }

    .table-div {
        height: calc(~"100% - 42px");

        .table-info {
            margin-bottom: 10px
        }
    }

    .row-left {
        display: inline-block;
    }

    .row-right {
        float: right;
        display: inline-block;
    }

    .search-span {
        font-size: 14px;
        color: #7b7e83;
    }

    .search-input {
        margin-left: 20px;
        width: 180px;
    }

    .search-button {
        margin-left: 20px;
    }

    /deep/ .el-rate {
        height: 20px;
        line-height: 1;
        display: inline-flex;
    }

    .position-input {
        width: 120px;
    }

    .position-input-right {
        margin-left: 20px;
    }

    .seat-input {
        width: 86px;
    }

    .seat-input-right {
        margin-left: 21px;
    }

    .view-form {
        display: inline-block;
    }

    .location-div {
        float: right;
        width: 28px;
        height: 28px;
        margin-top: 4px;
        margin-right: 30px;

        .location-i {
            cursor: pointer;

            font-size: 28px;
            color: #60b960;
        }
    }

    .device-map {
        width: 100%;
        height: 400px;
    }
</style>