<template>
    <div class="group-container">
        <!-- button -->
        <div class="row-div">
            <div class="row-left">
                <el-button type="primary" size="small" @click="clickAddDist()">新增客户</el-button>
                <el-button type="primary" size="small" @click="clickImportDist()">导入客户</el-button>
                <el-button type="danger" size="small" @click="clickDelDist()">删除客户</el-button>
            </div>
            <div class="row-right">
                <span class="search-span">客户名称</span>
                <el-input class="search-input" v-model="distSname" size="small" placeholder="请输入客户名称"></el-input>
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
                        fixed
                        align="center"
                        header-align="center"
                        prop="distCode"
                        label="分销商编码"
                        width="300">
                </el-table-column>
                <el-table-column
                        fixed
                        align="center"
                        header-align="center"
                        prop="distSName"
                        label="分销商名"
                        width="100">
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        prop="distFName"
                        label="分销商全名"
                        width="100">
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        prop="supDistCode"
                        label="父级分销商编码"
                        width="150">
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        prop="contactAdr"
                        label="联系地址"
                        width="100">
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        prop="contactPerson"
                        label="联系人"
                        width="100">
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        prop="contactTel"
                        label="联系电话"
                        width="100">
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        prop="contactEmail"
                        label="邮箱地址"
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
                        <el-button @click="viewDist(scope.row)" type="text" size="small">查看</el-button>
                        <el-button @click="clickUpdateDist(scope.row)" type="text" size="small">编辑</el-button>
                        <el-button @click="clickDeleteDist(scope.row)" type="text" size="small">删除</el-button>
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
                <el-form-item label="分销商名" :label-width="formLabelWidth">
                    <el-input v-model="form.distSName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="分销商全名" :label-width="formLabelWidth">
                    <el-input v-model="form.distFName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="父级分销商编码" :label-width="formLabelWidth">
                    <el-input v-model="form.supDistCode" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系地址" :label-width="formLabelWidth">
                    <el-input v-model="form.contactAdr" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系人" :label-width="formLabelWidth">
                    <el-input v-model="form.contactPerson" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" :label-width="formLabelWidth">
                    <el-input v-model="form.contactTel" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱地址" :label-width="formLabelWidth">
                    <el-input v-model="form.contactEmail" autocomplete="off"></el-input>
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
                <el-form-item label="分销商编码" :label-width="formLabelWidth">
                    {{ form.distCode }}
                </el-form-item>
                <el-form-item label="分销商名" :label-width="formLabelWidth">
                    {{ form.distSName }}
                </el-form-item>
                <el-form-item label="分销商全名" :label-width="formLabelWidth">
                    {{ form.distFName }}
                </el-form-item>
                <el-form-item label="父级分销商编码" :label-width="formLabelWidth">
                    {{ form.supDistCode }}
                </el-form-item>
                <el-form-item label="联系地址" :label-width="formLabelWidth">
                    {{ form.contactAdr }}
                </el-form-item>
                <el-form-item label="联系人" :label-width="formLabelWidth">
                    {{ form.contactPerson }}
                </el-form-item>
                <el-form-item label="联系电话" :label-width="formLabelWidth">
                    {{ form.contactTel }}
                </el-form-item>
                <el-form-item label="邮箱地址" :label-width="formLabelWidth">
                    {{ form.contactEmail }}
                </el-form-item>
                <el-form-item label="创建日期" :label-width="formLabelWidth">
                    {{ form.crtDate }}
                </el-form-item>
                <el-form-item label="备注" :label-width="formLabelWidth">
                    {{ form.memo }}
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="modalShow = false">取 消</el-button>
                <el-button type="primary" @click="save()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
  import { addDist, deleteDist, existDist, updateDist, pageDists } from '@/api/dist'

  export default {
    name: "Dist",
    data() {
      return {
        viewModalTitle: '客户信息',
        viewModalShow: false,
        modalTitle: '新增客户',
        modalShow: false,
        formLabelWidth: '120px',
        emptyForm: {
          distId: "",
          distCode: "",
          distSName: "",
          distFName: "",
          supDistCode: "",
          contactAdr: "",
          contactPerson: "",
          contactTel: "",
          contactEmail: "",
          crtDate: "",
          memo: ""
        },
        form: {
          distId: "",
          distCode: "",
          distSName: "",
          distFName: "",
          supDistCode: "",
          contactAdr: "",
          contactPerson: "",
          contactTel: "",
          contactEmail: "",
          crtDate: "",
          memo: ""
        },

        condition: {
          name: ''
        },
        tableData: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        distSname: '',

        saveType: ''
      }
    },
    mounted() {
      this.pageDist();
    },
    methods: {
      clickAddDist() {
        this.modalTitle = '新增客户';
        this.form = this.emptyForm;
        this.saveType = 'add';
        this.modalShow = true;
      },
      clickImportDist() {

      },
      clickDelDist() {

      },
      viewDist(dist) {
        this.form = dist;
        this.viewModalShow = true;
      },
      clickUpdateDist(dist) {
        this.modalTitle = '编辑客户';
        this.form = dist;
        this.saveType = 'update'
        this.modalShow = true;
      },
      clickDeleteDist(dist) {
        deleteDist(dist.distId).then(res => {
          // 刷新分页
          this.pageDist();
        });
      },
      save() {
        console.log(this.form);
        if (this.saveType == 'add') {
          addDist(this.form).then(res => {
            this.modalShow = false;
          });
        } else if (this.saveType == 'update') {
          updateDist(this.form).then(res => {
            this.modalShow = false;
          })
        } else {
          this.modalShow = false;
        }
      },
      search() {
        this.pageDist();
      },
      pageDist() {
        pageDists(this.pageSize, this.pageIndex, '', '', this.distSname).then(res => {
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