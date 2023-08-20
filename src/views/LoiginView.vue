<template>
  <div id="login">
    <div class="login-box">
      <div class="avater">
        <el-image
          src="https://mp-02418bba-5cfe-4876-9567-75c1cabff2fa.cdn.bspapp.com/cloudstorage/4e673823-a987-4938-89cf-467733bd1f6a.png"
        />
      </div>
      <el-form :model="form" ref="formRef" :rules="rules">
        <el-form-item prop="username">
          <el-input
            class="input"
            placeholder="用户名"
            :prefix-icon="User"
            v-model="form.username"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            class="input"
            placeholder="密码"
            type="password"
            :prefix-icon="Lock"
            v-model="form.password"
          />
        </el-form-item>
        <div class="btns">
          <el-button type="primary" class="btn" @click="login">登录</el-button>
          <div class="btn reset" @click="reset">重置</div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { rules } from "@/rules/userinfo";
import type { FormInstance } from "element-plus";
import { Lock, User } from "@element-plus/icons-vue";
import { loginApi } from "@/apis/login";
import { useUserInfoStore } from "@/stores/userInfo.store";
import router from "@/router";
const userInfoStore = useUserInfoStore();
type Form = {
  username: string;
  password: string;
};

const form = ref<Form>({
  username: "admin",
  password: "admin",
});

const formRef = ref<FormInstance>();

const login = async () => {
  const res = await loginApi(form.value);
  userInfoStore.setAuth(res.data);
  router.push("/home");
};

const reset = () => {
  formRef.value?.resetFields();
};
</script>

<style lang="scss" scoped>
#login {
  height: 100vh;
  background: linear-gradient(to right, #2b2c43, #1e3158);
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-box {
  width: 360px;
  height: 450px;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  .avater {
    height: 120px;
    width: 120px;
    border-radius: 50%;
    box-shadow: 0 0 4px 2px #9fa1a5;
    margin-bottom: 30px;
    overflow: hidden;
  }

  .el-form {
    width: 90%;
    margin-top: 30px;

    .input {
      height: 40px;

      :deep(.el-input__wrapper) {
        border-radius: 20px;
      }
    }

    .btns {
      display: flex;
      flex-direction: column;
      align-items: center;

      .btn {
        width: 100%;
        height: 40px;
        border-radius: 20px;
        margin-bottom: 20px;
        cursor: pointer;
      }

      .reset {
        text-align: center;
      }
    }
  }
}</style>
