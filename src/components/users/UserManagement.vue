<template>
  <div id="users">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div class="header">
        <el-input
          v-model="keyword"
          placeholder="请输入关键词"
          class="input"
          clearable
        >
          <template #append>
            <el-button :icon="Search" @click="search" />
          </template>
        </el-input>
        <el-button type="danger" @click="deleteUsers">批量禁用</el-button>
      </div>
      <el-table
        :data="searchRes.length ? searchRes : tableData"
        ref="multipleTableRef"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="id" width="55"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="nickname" label="昵称"></el-table-column>
        <el-table-column label="头像">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-avatar :src="scope.row.avater" />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="sex" label="gender">
          <template #default="scope">
            <span>{{ scope.row.gender === 0 ? "女" : "男" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="phoneNumber" label="电话"></el-table-column>
        <el-table-column prop="status" label="禁用状态">
          <template #default="scope">
            <el-switch
              v-model="scope.row.status"
              style="--el-switch-on-color: #3799ff"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="query.requestPage"
        v-model:page-size="query.pageSize"
        :page-sizes="[5, 8, 10, 20, 50]"
        layout="sizes, prev, pager, next"
        :total="total"
        @size-change="getUserlist"
        @current-change="getUserlist"
      />
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { getUserlistApi, deleteUsersApi } from "@/apis/users";
import { ArrowRight, Search } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import type ElTable from "element-plus/es/components/table";
import { ref } from "vue";
const total = ref<number>(10);
const keyword = ref("");
const query = ref({
  requestPage: 1,
  pageSize: 5,
});
interface User {
  avater: string;
  createTime: Date;
  email: string;
  gender: 0 | 1;
  id: number;
  integration: number;
  isDeleted: 0 | 1;
  nickname: string;
  password: string;
  phoneNumber: string;
  status: boolean;
  updateTime: Date;
  username: string;
}
const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<User[]>([]);
const handleEdit = (index: number, row: User) => {
  console.log(index, row);
};

const tableData = ref<User[]>([]);

const getUserlist = async () => {
  const res = await getUserlistApi(query.value);
  res.data.records.map((item: any) => {
    item.status = Boolean(item.status);
  });
  tableData.value = res.data.records;

  total.value = res.data.totalElements;
};
const searchRes = ref<User[]>([]);
const search = () => {
  searchRes.value = tableData.value.filter(
    (user) =>
      user.username.toLowerCase().indexOf(keyword.value.toLocaleLowerCase()) !=
      -1
  );
};

const ids = ref<number[]>([]);
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val;
  console.log(multipleSelection.value);
  multipleSelection.value.forEach((item) => {
    ids.value.push(item.id);
  });
  // 去重
  ids.value = Array.from(new Set(ids.value));
};
const deleteUsers = async () => {
  await deleteUsersApi(ids.value);
  ElMessage.error("禁用成功!");
  getUserlist();
};
getUserlist();
</script>
<style lang="scss" scoped>
.el-card {
  margin-top: 20px;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  .el-input {
    margin-right: 10px;
    width: 30%;
  }
}
.el-pagination {
  margin-top: 20px;
}
</style>
