<template>
    <div class="group-container">
        <!-- button -->
        <div class="row-div">
            <div class="row-left">
                <el-button type="primary" size="small" @click="clickAddUser()">新增人员</el-button>
                <el-button type="primary" size="small" @click="clickImportUser()">导入人员</el-button>
                <el-button type="danger" size="small" @click="clickDelUser()">删除人员</el-button>
            </div>
            <div class="row-right">
                <span class="search-span">人员名称</span>
                <el-input class="search-input" v-model="userName" size="small" placeholder="请输入人员名称"></el-input>
                <span class="search-span search-button">分销商编码</span>
                <el-input class="search-input" v-model="distCode" size="small" placeholder="请输入分销商编码"></el-input>
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
                        prop="userName"
                        label="人员名"
                        width="100">
                </el-table-column>
                <el-table-column
                        fixed
                        align="center"
                        header-align="center"
                        prop="userType"
                        label="人员类型"
                        width="100">
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
                        align="center"
                        header-align="center"
                        prop="realName"
                        label="人员真名"
                        width="100">
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        prop="duty"
                        label="职责"
                        width="150">
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        prop="sex"
                        label="性别"
                        width="100">
                    <template slot-scope="scope">
                        {{ scope.row.sex == '1' ? '女' : '男' }}
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        prop="contactTel"
                        label="联系电话"
                        width="120">
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        prop="emall"
                        label="邮箱地址"
                        width="150">
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        prop="headImgUrl"
                        label="头像"
                        width="100">
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        prop="lastLoginTime"
                        label="最近登陆时间"
                        width="200">
                </el-table-column>
                <el-table-column
                        align="center"
                        header-align="center"
                        fixed="right"
                        label="操作"
                        width="160">
                    <template slot-scope="scope">
                        <el-button @click="viewUser(scope.row)" type="text" size="small">查看</el-button>
                        <el-button @click="clickUpdateUser(scope.row)" type="text" size="small">编辑</el-button>
                        <el-button @click="clickBindToilet(scope.row)" type="text" size="small">绑定</el-button>
                        <el-button @click="clickDeleteUser(scope.row)" type="text" size="small">删除</el-button>
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
                <el-form-item class="item-no-width" label="人员名" :label-width="formLabelWidth">
                    <el-input class="modal-input" v-model="form.userName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item class="item-no-width" label="人员类型" :label-width="formLabelWidth">
                    <el-input class="modal-input" v-model="form.userType" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item class="item-no-width" label="分销商编码" :label-width="formLabelWidth">
                    <el-input class="modal-input" v-model="form.distCode" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item class="item-no-width" label="人员真名" :label-width="formLabelWidth">
                    <el-input class="modal-input" v-model="form.realName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item class="item-no-width" label="职责" :label-width="formLabelWidth">
                    <el-input class="modal-input" v-model="form.duty" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item class="item-no-width" label="性别" :label-width="formLabelWidth">
                    <el-select class="modal-input" v-model="value" placeholder="请选择">
                        <el-option
                                v-for="item in sexs"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="item-no-width" label="联系电话" :label-width="formLabelWidth">
                    <el-input class="modal-input" v-model="form.contactTel" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item class="item-no-width" label="邮箱地址" :label-width="formLabelWidth">
                    <el-input class="modal-input" v-model="form.emall" autocomplete="off"></el-input>
                </el-form-item>
                <div class="item-avatar">
                    <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="modalShow = false">取 消</el-button>
                <el-button type="primary" @click="save()">确 定</el-button>
            </div>
        </el-dialog>

        <!-- view model -->
        <el-dialog :title="viewModalTitle" :visible.sync="viewModalShow" center width="1000px">
            <el-form class="view-form" :model="form">
                <el-form-item label="人员名" :label-width="formLabelWidth">
                    {{ form.userName }}
                </el-form-item>
                <el-form-item label="人员类型" :label-width="formLabelWidth">
                    {{ form.userType }}
                </el-form-item>
                <el-form-item label="分销商编码" :label-width="formLabelWidth">
                    {{ form.distCode }}
                </el-form-item>
                <el-form-item label="人员真名" :label-width="formLabelWidth">
                    {{ form.realName }}
                </el-form-item>
                <el-form-item label="职责" :label-width="formLabelWidth">
                    {{ form.duty }}
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                    {{ form.sex == '1' ? '女' : '男' }}
                </el-form-item>
                <el-form-item label="联系电话" :label-width="formLabelWidth">
                    {{ form.contactTel }}
                </el-form-item>
                <el-form-item label="邮箱地址" :label-width="formLabelWidth">
                    {{ form.emall }}
                </el-form-item>
                <div class="item-avatar">
                    <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
                </div>
            </el-form>
        </el-dialog>

        <!-- bind toilet -->
        <el-dialog :title="bindModalTitle" :visible.sync="bindModalShow" center width="1000px">
            <el-transfer
                    filterable
                    :filter-method="filterMethod"
                    filter-placeholder="请输入公厕名"
                    v-model="userToilets"
                    :data="toilets">
            </el-transfer>
            <div slot="footer" class="dialog-footer">
                <el-button @click="bindModalShow = false">取 消</el-button>
                <el-button type="primary" @click="saveBind()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
  import { addUser, deleteUser, existUser, updateUser, pageUsers, getUserPower, setUserPower } from '@/api/user';
  import { pageToilets } from '@/api/toilet';

  export default {
    name: "User",
    data() {
      return {
        viewModalTitle: '人员信息',
        viewModalShow: false,
        modalTitle: '新增人员',
        modalShow: false,
        bindModalTitle: '绑定公厕',
        bindModalShow: false,
        formLabelWidth: '120px',
        sexs: [{
          value: '0',
          label: '男'
        }, {
          value: '1',
          label: '女'
        }],
        emptyForm: {
          userId: "",
          userName: "",
          userType: "",
          distCode: "",
          realName: "",
          duty: "",
          sex: "",
          contactTel: "",
          emall: "",
          headImgUrl: "",
          lastLoginTime: ""
        },
        form: {
          userId: "",
          userName: "",
          userType: "",
          distCode: "",
          realName: "",
          duty: "",
          sex: "",
          contactTel: "",
          emall: "",
          headImgUrl: "",
          lastLoginTime: ""
        },

        condition: {
          name: ''
        },
        tableData: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        userName: '',
        distCode: '',

        saveType: '',

        imageUrl: '',

        toilets: [],
        toiletPage: 0,
        userToilets: [],
        filterMethod(query, item) {
          return item.label.indexOf(query) > -1;
        }
      }
    },
    mounted() {
      this.pageUser();
    },
    methods: {
      clickAddUser() {
        this.modalTitle = '新增人员';
        this.form = this.emptyForm;
        this.saveType = 'add';
        this.modalShow = true;
      },
      clickImportUser() {

      },
      clickDelUser() {

      },
      viewUser(user) {
        this.form = user;
        this.viewModalShow = true;
      },
      clickUpdateUser(user) {
        this.modalTitle = '编辑人员';
        this.form = user;
        this.saveType = 'update';
        this.modalShow = true;
      },
      clickDeleteUser(user) {
        deleteUser(user.userId).then(res => {
          // 刷新分页
          this.pageUser();
        });
      },
      save() {
        console.log(this.form);
        if (this.saveType == 'add') {
          addUser(this.form).then(res => {
            this.modalShow = false;
          });
        } else if (this.saveType == 'update') {
          updateUser(this.form).then(res => {
            this.modalShow = false;
          })
        } else {
          this.modalShow = false;
        }
      },
      saveBind() {
        let powers = [];
        this.userToilets.forEach(userToilet => {
          powers.push({
            toiletCode: userToilet.key
          });
        });
        setUserPower(this.form.userName, powers).then(res => {
          this.bindModalShow = false;
        });
      },
      search() {
        this.pageUser();
      },
      pageUser() {
        pageUsers(this.pageSize, this.pageIndex, '', '', this.userName, this.distCode).then(res => {
          this.tableData = res.pageData;
          this.totalPage = res.totalPage;
        })
      },
      clickBindToilet(user) {
        this.form = user;
        this.pageToilet(() => {
          this.bindModalShow = true;
        });
        this.getUserToilets(user);
      },
      getUserToilets(user) {
        getUserPower(user.userName).then(res => {
          this.userToilets = [];
          res.forEach(userToilet => {
            this.userToilets.push({
              label: userToilet.toiletCode,
              key: userToilet.toiletCode,
            })
          });
        });
      },
      pageToilet(callback) {
        pageToilets(this.pageSize, this.pageIndex, '', '', '').then(res => {
          this.toilets = [];
          res.pageData.forEach(toilet => {
            this.toilets.push({
              label: toilet.toiletName,
              key: toilet.toiletCode,
            })
          });
          this.toiletPage = res.totalPage;

          if (callback) {
            callback();
          }
        })
      },
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
      },
      handleCurrentChange(pageIndex) {
        this.pageIndex = pageIndex;
        this.pageToilet();
      },

      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
  }
</script>

<style lang="less" scoped>
    .group-container {
        padding: 20px;
    }

    .modal-input {
        width: 240px;
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

    /deep/ .el-form {
        float: left;
        position: relative;
    }

    .item-no-width {
        margin-bottom: 22px;
        width: unset;
        float: left;
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

    /deep/ .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    /deep/ .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

    .item-avatar {
        position: absolute;
        right: 20px;
        top: 25px;
    }

    .view-form {
        display: inline-block;
    }

    /deep/ .el-dialog__body {
        display: inline-block;
    }
</style>