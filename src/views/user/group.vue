<template>
    <div class="group-container">
        <!-- button -->
        <div class="row-div">
            <div class="row-left">
                <el-button type="primary" size="small" @click="clickAddGroup()">新增分组</el-button>
                <!-- <el-button type="danger" size="small" @click="clickDelGroup()">删除分组</el-button> -->
            </div>
            <div class="row-right">
                <span class="search-span">分组名称</span>
                <el-input class="search-input" v-model="groupName" size="small" placeholder="请输入分组名称"></el-input>
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
                <!-- <el-table-column
                        align="center"
                        header-align="center"
                        prop="groupCode"
                        label="分组编码"
                        width="300">
                </el-table-column> -->
                <el-table-column
                        align="center"
                        header-align="center"
                        prop="groupName"
                        label="分组名称"
                        width="500">
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        prop="distName"
                        label="分销商"
                        width="280">
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        prop="memo"
                        label="备注"
                        width="200">
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        fixed="right"
                        label="操作"
                        width="120">
                    <template slot-scope="scope">
                        <el-button @click="viewGroup(scope.row)" type="text" size="small">查看</el-button>
                        <el-button @click="clickUpdateGroup(scope.row)" type="text" size="small">编辑</el-button>
                        <el-button @click="clickDeleteGroup(scope.row)" type="text" size="small">删除</el-button>
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
        <el-dialog :title="modalTitle" :visible.sync="modalShow" center width="500px">
            <el-form :model="form">
                <!-- <el-form-item label="分组编码" :label-width="formLabelWidth">
                    <el-input v-model="form.groupCode" autocomplete="off"></el-input>
                </el-form-item> -->
                <el-form-item label="分组名称" :label-width="formLabelWidth">
                    <el-input v-model="form.groupName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="分销商" :label-width="formLabelWidth">
                    <el-select v-model="form.distCode" :disabled="form.groupId ? true : false" placeholder="请选择">
                        <el-option
                        v-for="item in allDists"
                        :key="item.distCode"
                        :label="item.distName"
                        :value="item.distCode">
                        </el-option>
                    </el-select>
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
        <el-dialog :title="viewModalTitle" :visible.sync="viewModalShow" center width="500px">
            <el-form class="view-form" :model="form">
                <!-- <el-form-item label="分组编码" :label-width="formLabelWidth">
                    {{ form.groupCode }}
                </el-form-item> -->
                <el-form-item label="分组名称" :label-width="formLabelWidth">
                    {{ form.groupName }}
                </el-form-item>
                <el-form-item label="分销商" :label-width="formLabelWidth">
                    {{ form.distName }}
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
            <span>确定删除分组{{ form.groupName }}?</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteModalShow = false">取 消</el-button>
                <el-button type="primary" @click="delGroup()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
  import { addGroup, deleteGroup, existGroup, updateGroup, pageGroups } from '@/api/group'
  import { getAllDists } from '@/api/dist'
  import store from '@/store'
  import { MessageBox, Message } from 'element-ui'

  export default {
    name: "Group",
    data() {
      return {
        viewModalTitle: '分组信息',
        viewModalShow: false,
        deleteModalTitle: '删除分组',
        deleteModalShow: false,
        modalTitle: '新增分组',
        modalShow: false,
        formLabelWidth: '120px',
        emptyForm: {
        //   groupId: "",
        //   groupCode: "",
          groupName: "",
          distCode: "",
          crtDate: "",
          memo: ""
        },
        form: {
          groupId: "",
          groupCode: "",
          groupName: "",
          distCode: "",
          crtDate: "",
          memo: ""
        },

        tableData: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        groupName: '',

        saveType: '',
        allDists: []
      }
    },
    mounted() {
      this.pageGroup();
    },
    methods: {
      clickAddGroup() {
        this.getAllDists(() => {
            this.modalTitle = '新增分组';
            this.form = JSON.parse(JSON.stringify(this.emptyForm));
            this.saveType = 'add';
            this.modalShow = true;
        });
      },
      clickImportGroup() {

      },
      clickDelGroup() {

      },
      viewGroup(group) {
        this.form = group;
        this.viewModalShow = true;
      },
      clickUpdateGroup(group) {
        this.modalTitle = '编辑分组';
        this.form = group;
        this.saveType = 'update';
        this.modalShow = true;
      },
      clickDeleteGroup(group) {
          this.form = group;
        this.deleteModalShow = true;
      },
      save() {
        if (this.saveType == 'add') {
          addGroup(this.form).then(res => {
            this.modalShow = false;
            // 刷新分页
            this.pageGroup();
          });
        } else if (this.saveType == 'update') {
          updateGroup(this.form).then(res => {
            this.modalShow = false;
            // 刷新分页
            this.pageGroup();
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
      delGroup() {
        deleteGroup(this.form.groupId).then(res => {
            // 刷新分页
            this.pageGroup();
            this.deleteModalShow = false;
        });
      },
      search() {
        this.pageGroup();
      },
      pageGroup() {
        pageGroups(this.pageSize, this.pageIndex, '', '', this.groupName).then(res => {
          this.tableData = res.pageData;
          this.totalPage = res.totalPage;
        })
      },
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
      },
      handleCurrentChange(pageIndex) {
        this.pageIndex = pageIndex;
        this.pageGroup();
      },
      prevClick() {
          this.handleCurrentChange(-- this.pageIndex);
      },
      nextClick() {
        this.handleCurrentChange(++ this.pageIndex);
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
        // width: 50%;
        // float: left;
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

    .view-form {
        display: inline-block;
    }
</style>