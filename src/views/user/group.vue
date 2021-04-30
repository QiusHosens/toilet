<template>
    <div class="group-container">
        <!-- button -->
        <div class="row-div">
            <div class="row-left">
                <el-button type="primary" size="small" @click="clickAddGroup()">新增分组</el-button>
                <el-button type="danger" size="small" @click="clickDelGroup()">删除分组</el-button>
            </div>
            <div class="row-right">
                <span class="search-span">分组名称</span>
                <el-input class="search-input" v-model="groupName" size="small" placeholder="请输入分组名称"></el-input>
                <el-button class="search-button" type="primary" size="small"  icon="el-icon-search" @click="search()">搜索</el-button>
            </div>
        </div>

        <!-- table -->
        <div class="row-div">
            <el-table
                    :data="tableData"
                    highlight-current-row
                    style="width: 100%">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        prop="groupCode"
                        label="分组编码"
                        width="300">
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        prop="groupName"
                        label="分组名称"
                        width="300">
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        prop="distCode"
                        label="分销商编码"
                        width="200">
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
                    :page-count="totalPage">
            </el-pagination>
        </div>

        <!-- add/edit modal -->
        <el-dialog :title="modalTitle" :visible.sync="modalShow" center width="1000px">
            <el-form :model="form">
                <el-form-item label="分组编码" :label-width="formLabelWidth">
                    <el-input v-model="form.groupCode" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="分组名称" :label-width="formLabelWidth">
                    <el-input v-model="form.groupName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="分销商编码" :label-width="formLabelWidth">
                    <el-input v-model="form.distCode" autocomplete="off"></el-input>
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
                <el-form-item label="分组编码" :label-width="formLabelWidth">
                    {{ form.groupCode }}
                </el-form-item>
                <el-form-item label="分组名称" :label-width="formLabelWidth">
                    {{ form.groupName }}
                </el-form-item>
                <el-form-item label="分销商编码" :label-width="formLabelWidth">
                    {{ form.distCode }}
                </el-form-item>
                <el-form-item label="备注" :label-width="formLabelWidth">
                    {{ form.memo }}
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
  import { addGroup, deleteGroup, existGroup, updateGroup, pageGroups } from '@/api/group'

  export default {
    name: "Group",
    data() {
      return {
        viewModalTitle: '分组信息',
        viewModalShow: false,
        modalTitle: '新增分组',
        modalShow: false,
        formLabelWidth: '120px',
        emptyForm: {
          groupId: "",
          groupCode: "",
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

        saveType: ''
      }
    },
    mounted() {
      this.pageGroup();
    },
    methods: {
      clickAddGroup() {
        this.modalTitle = '新增分组';
        this.form = this.emptyForm;
        this.saveType = 'add';
        this.modalShow = true;
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
        deleteGroup(group.groupId).then(res => {
          // 刷新分页
          this.pageGroup();
        });
      },
      save() {
        console.log(this.form);
        if (this.saveType == 'add') {
          addGroup(this.form).then(res => {
            this.modalShow = false;
          });
        } else if (this.saveType == 'update') {
          updateGroup(this.form).then(res => {
            this.modalShow = false;
          })
        } else {
          this.modalShow = false;
        }
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
      }
    }
  }
</script>

<style lang="less" scoped>
    .group-container {
        padding: 20px;
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