<template>
  <div class="user-container">
      <div>
          <el-button type="primary">新增人员</el-button>
          <el-button type="primary">导入人员</el-button>
          <el-button type="danger">删除人员</el-button>
      </div>
    <el-table
            :data="tableData"
            style="width: 100%">
      <el-table-column
              prop="date"
              label="日期"
              width="180">
      </el-table-column>
      <el-table-column
              prop="name"
              label="姓名"
              width="180">
      </el-table-column>
      <el-table-column
              prop="address"
              label="地址">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  name: 'User',
  components: {  },
  data() {
    return {
    }
  },
  created() {

  }
}
</script>

<style lang="less" scoped>
    .user-container {
        padding: 20px;
    }
</style>