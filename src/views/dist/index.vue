<template>
    <div class="group-container">
        <!-- button -->
        <div>
            <el-button type="primary" @click="addGroup()">新增客户</el-button>
            <el-button type="primary">导入客户</el-button>
            <el-button type="danger">删除客户</el-button>
        </div>

        <!-- table -->

        <!-- modal -->
        <el-dialog :title="modalTitle" :visible.sync="modalShow" center width="1000px">
            <el-form :model="form">
                <el-form-item required label="客户类型" :label-width="formLabelWidth">
                    <el-select v-model="form.type" placeholder="请选择客户类型">
                        <el-option label="普通客户" value="0"></el-option>
                        <el-option label="战略客户" value="1"></el-option>
                        <el-option label="企业客户" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="接口权限" :label-width="formLabelWidth">
                    <el-select v-model="form.auth" placeholder="请选择接口权限">
                        <el-option label="普通客户" value="0"></el-option>
                        <el-option label="战略客户" value="1"></el-option>
                        <el-option label="企业客户" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="公厕数量" :label-width="formLabelWidth">
                    <el-input v-model="form.toiletCount" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="客户名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" :label-width="formLabelWidth">
                    <el-input v-model="form.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱地址" :label-width="formLabelWidth">
                    <el-input v-model="form.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="到期时间" :label-width="formLabelWidth">
                    <el-input v-model="form.deadline" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注" :label-width="formLabelWidth">
                    <el-input v-model="form.description" autocomplete="off"></el-input>
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
  export default {
    name: "Dist",
    data() {
      return {
        modalTitle: '新增客户',
        modalShow: false,
        formLabelWidth: '120px',
        form: {
          userId: '',
          name: '',
          type: '0',
          auth: '',
          toiletCount: '',
          phone: '',
          email: '',
          deadline: '',
          description: ''
        }
      }
    },
    methods: {
      addGroup() {
        this.modalTitle = '新增客户';
        this.modalShow = true;
      },
      editGroup() {

      },
      delGroup() {

      },
      save() {
        this.modalShow = false;
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
</style>