<!-- 账号管理页面 -->
<template>
  <div class="user-mgmt-container">
    <!-- 搜索栏 -->
    <el-card style="margin: 8px">
      <avue-form
        ref="formRef"
        :option="searchOption"
        v-model="form"
        @submit="handleSubmit"
      ></avue-form>
      <!-- 表格区 -->
      <avue-crud
        ref="crudRef"
        v-model="form"
        :option="tableOption"
        @row-save="rowSave"
        @row-update="rowUpdate"
        @row-del="rowDel"
        :data="data"
      >
      </avue-crud>
    </el-card>
  </div>
</template>
<script setup>
import { ref, getCurrentInstance } from "vue";
import { searchOption, tableOption } from "@/const/user/qualificationAuth";
// //获取this
// let { proxy } = getCurrentInstance();
// const option = ref(null);
// const data = ref(null);
// const form = ref({});
// function handleSubmit(form, done) {
//   console.log(form);
//   done();
// }
// data.value = [
//   {
//     name: "张三",
//     age: 12,
//     username: "admin123",
//     sex: "男",
//     nickname: "PandaGuo",
//     email: "597857284@qq.com",
//     applyTime: "2024.01.09 21:06",
//   },
//   {
//     name: "李四",
//     age: 13,
//     username: "admin123",
//     sex: "男",
//     nickname: "PandaGuo",
//     email: "597857284@qq.com",
//     applyTime: "2024.01.09 21:06",
//   },
//   {
//     name: "李四",
//     age: 13,
//     username: "admin123",
//     sex: "男",
//     nickname: "PandaGuo",
//     email: "597857284@qq.com",
//     applyTime: "2024.01.09 21:06",
//   },
//   {
//     name: "李四",
//     age: 13,
//     age: 12,
//     username: "admin123",
//     sex: "男",
//     nickname: "PandaGuo",
//     email: "597857284@qq.com",
//     applyTime: "2024.01.09 21:06",
//   },
// ];
// function rowSave(row, done, loading) {
//   done(row);
// }
// function rowDel(row, index, done) {
//   done(row);
// }
// function rowUpdate(row, index, done, loading) {
//   done(row);
// }
</script>
<style
  lang="less"
  src="../../assets/style/user/qualificationAuth/index.less"
  scoped
></style>
