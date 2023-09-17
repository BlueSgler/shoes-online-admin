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
        <el-button type="danger" @click="disableUsers">批量禁用</el-button>
        <el-button type="primary" @click="enableUsers">批量解禁</el-button>
      </div>
      <el-table
        :data="searchRes.length ? searchRes : tableData"
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
              style="--el-switch-on-color: #ff4949"
              @change="toggleUserStatus([scope.row.id])"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="openDialog(scope.row)"
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
    <el-dialog v-model="dialogFormVisible" title="修改用户信息" width="400px">
      <el-form ref="editFormRef" :model="updateForm" :rules="rules">
        <el-form-item label="昵称" prop="nicknName">
          <el-input v-model="updateForm.nicknName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="手机" prop="phoneNumber">
          <el-input v-model="updateForm.phoneNumber" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="handleEdit"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { getUserlistApi, deleteUsersApi, updateUsersApi } from "@/apis/users";
import { ArrowRight, Search } from "@element-plus/icons-vue";
import { ElMessage, type FormInstance } from "element-plus";
import type ElTable from "element-plus/es/components/table";
import { ref } from "vue";
import { rules } from "@/rules/userinfo";
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

const dialogFormVisible = ref(false);
const updateForm = ref({
  nicknName: "",
  phoneNumber: "",
});
const editFormRef = ref<FormInstance>();
const openDialog = (row: User) => {
  dialogFormVisible.value = true;
  updateForm.value.nicknName = row.nickname;
  updateForm.value.phoneNumber = row.phoneNumber;
  editUserId.value = row.id;
};

const editUserId = ref(-1);
const handleEdit = async () => {
  await editFormRef.value?.validate()
  await updateUsersApi(editUserId.value, updateForm.value);
  ElMessage.success("修改成功！");
  dialogFormVisible.value = false;
  getUserlist();
};

const tableData = ref<User[]>([]);

const getUserlist = async () => {
  const res = await getUserlistApi(query.value);
  res.data.records.map((item: any) => {
    item.status = Boolean(item.status);
  });
  tableData.value = res.data.records;

  total.value = res.data.totalElements;
  selectedUsers.value = [];
};
const searchRes = ref<User[]>([]);
const search = () => {
  searchRes.value = tableData.value.filter(
    (user) =>
      user.username.toLowerCase().indexOf(keyword.value.toLocaleLowerCase()) !=
      -1
  );
};

const selectedUsers = ref<User[]>([]);

//手动选择
const handleSelectionChange = (val: User[]) => {
  selectedUsers.value = val;
};

//获取id函数
const getUserId = (users: User[]) => {
  return users.map((item) => item.id);
};
//批量禁用 要去禁用，所以要没有禁用的数组
const disableUsers = async () => {
  selectedUsers.value = selectedUsers.value.filter((user) => {
    return !user.status;
  });
  toggleUserStatus();
};

const toggleUserStatus = async (ids?: number[]) => {
  const targetIds = ids ? ids : getUserId(selectedUsers.value);
  const res = await deleteUsersApi(targetIds);
  ElMessage.success(res.message);
  // getUserlist();
};
//批量解禁
const enableUsers = async () => {
  selectedUsers.value = selectedUsers.value.filter((user) => {
    return user.status;
  });
  toggleUserStatus();
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
