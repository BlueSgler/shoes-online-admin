<template>
  <div id="home">
    <el-container>
      <el-header>
        <AdminHeader></AdminHeader>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-affix><AdminMenu></AdminMenu></el-affix>
        </el-aside>
        <el-main>
          <RouterView></RouterView>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import AdminHeader from "@/components/layout/AdminHeader.vue";
import AdminMenu from "@/components/layout/AdminMenu.vue";
import { useUserInfoStore } from "@/stores/userInfo.store";
import { getUserinfoApi } from "@/apis/login";
import type { BkResponse } from "@/apis";
const userInfoStore = useUserInfoStore();
const getUserinfo = async () => {
  const res: BkResponse = await getUserinfoApi();
  userInfoStore.userinfo = res.data;
};
getUserinfo();
</script>

<style lang="scss" scoped>
#home {
  min-height: 100vh;
}
.el-header {
  background-color: #2b2c44;
  padding: 0;
}

.el-aside {
  background-color: #2b2c44;
  min-height: calc(100vh - 60px);
}
</style>
