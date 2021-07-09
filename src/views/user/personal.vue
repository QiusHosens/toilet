<template>
    <div class="group-container">
        <el-tabs v-model="activeName">
            <el-tab-pane label="个人信息" name="first">
                <el-form v-if="!isEdit" class="view-form" :model="userInfo">
                    <el-form-item label="人员真名" :label-width="formLabelWidth">
                        {{ userInfo.realName }}
                    </el-form-item>
                    <el-form-item label="性别" :label-width="formLabelWidth">
                        {{ userInfo.sex == '1' ? '女' : '男' }}
                    </el-form-item>
                    <el-form-item label="联系电话" :label-width="formLabelWidth">
                        {{ userInfo.contactTel }}
                    </el-form-item>
                    <el-form-item label="邮箱地址" :label-width="formLabelWidth">
                        {{ userInfo.email }}
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="clickChangeUserInfo()">修改信息</el-button>
                    </el-form-item>
                </el-form>
                <el-form v-if="isEdit" class="view-form" :model="userInfo">
                    <el-form-item label="人员真名" :label-width="formLabelWidth">
                        <el-input class="modal-input" v-model="userInfo.realName" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" :label-width="formLabelWidth">
                        <el-select class="modal-input" v-model="userInfo.sex" placeholder="请选择">
                            <el-option
                                    v-for="item in sexs"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="联系电话" :label-width="formLabelWidth">
                        <el-input class="modal-input" v-model="userInfo.contactTel" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱地址" :label-width="formLabelWidth">
                        <el-input class="modal-input" v-model="userInfo.email" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitUserInfo()">提交</el-button>
                        <el-button @click="resetUserInfo()">重置</el-button>
                        <el-button @click="cancelUserInfo()">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="修改密码" name="second">
                <el-form class="view-form" :model="pwdInfo">
                    <el-form-item label="旧密码" :label-width="formLabelWidth">
                        <el-input type="password" class="modal-input" v-model="pwdInfo.oldPwd" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" :label-width="formLabelWidth">
                        <el-input type="password" class="modal-input" v-model="pwdInfo.newPwd" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" :label-width="formLabelWidth">
                        <el-input type="password" class="modal-input" v-model="pwdInfo.confirmNewPwd" @input="checkNewPwd()" autocomplete="off"></el-input>
                        <i v-if="confirm" class="el-icon-success icon-password-confirm"></i>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitPwd()">提交</el-button>
                        <el-button @click="resetPwd()">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
        
    </div>
</template>

<script>
  import { getInfo, changePwd, editPersonal } from '@/api/user';
  import store from '@/store'
  import { MessageBox, Message } from 'element-ui'

  export default {
    name: "Personal",
    data() {
      return {
        activeName: 'first',
        isEdit: false,

        formLabelWidth: '120px',
        sexs: [{
          value: 0,
          label: '男'
        }, {
          value: 1,
          label: '女'
        }],
        oldUserInfo: {
          realName: "",
          sex: "",
          contactTel: "",
          email: "",
          headImgUrl: ""
        },
        userInfo: {
          realName: "",
          sex: "",
          contactTel: "",
          email: "",
          headImgUrl: ""
        },
        oldPwdInfo: {
            oldPwd: "",
            newPwd: "",
            confirmNewPwd: ""
        },
        pwdInfo: {
            oldPwd: "",
            newPwd: "",
            confirmNewPwd: ""
        },
        confirm: false
      }
    },
    mounted() {
      this.getUserInfo();
    },
    methods: {
      getUserInfo() {
          let userName = store.getters.name;
          getInfo(userName).then(res => {
              this.oldUserInfo = res;
              this.userInfo = JSON.parse(JSON.stringify(this.oldUserInfo));
          });
      },
      clickChangeUserInfo() {
          this.isEdit = true;
      },
      submitUserInfo() {
          let userName = store.getters.name;
          editPersonal(userName, this.userInfo.realName, this.userInfo.sex, this.userInfo.contactTel, this.userInfo.email).then(res => {
              this.isEdit = false;
              this.oldUserInfo = JSON.parse(JSON.stringify(this.userInfo));;
          })
      },
      resetUserInfo() {
          this.userInfo = JSON.parse(JSON.stringify(this.oldUserInfo));
      },
      cancelUserInfo() {
          this.isEdit = false;
      },
      checkNewPwd() {
          if (this.pwdInfo.newPwd == this.pwdInfo.confirmNewPwd) {
              this.confirm = true;
          } else {
              this.confirm = false;
          }
      },
      submitPwd() {
          let userName = store.getters.name;
          if (this.pwdInfo.newPwd != this.pwdInfo.confirmNewPwd) {
                Message({
                    message: '两次输入新密码不一致',
                    type: 'warn',
                    duration: 3 * 1000
                });
                return;
          }
          changePwd(userName, this.pwdInfo.oldPwd, this.pwdInfo.newPwd).then(res => {
            Message({
                message: '密码修改成功',
                type: 'success',
                duration: 3 * 1000
            });
          });
      },
      resetPwd() {
          this.pwdInfo = JSON.parse(JSON.stringify(this.oldPwdInfo));
          this.confirm = false;
      }
    }
  }
</script>

<style lang="less" scoped>
    .group-container {
        padding: 20px;

        height: 100%;
    }

    .view-form {
        width: 300px;
        text-align: center;

        margin-left: calc(~"50% - 150px");
    }

    .icon-password-confirm {
        position: absolute;
        font-size: 28px;
        line-height: 40px;
        margin-left: 10px;
        color: green;
    }
</style>