<template>
  <div id="overview">
    <div class="userinfo">
      <el-avatar :src="userInfoStore.userinfo?.avater" />
      <span class="username">{{ userInfoStore.userinfo?.nickname }}</span>
    </div>
    <div class="overview-list">
      <div
        class="overview-item"
        v-for="item in overviewData?.allData"
        :key="item.id"
      >
        <div class="title">{{ item.name }}</div>
        <div class="number">{{ item.number }}</div>
      </div>
    </div>
    <div class="overview-list">
      <div
        class="overview-item"
        v-for="item in overviewData?.orderData"
        :key="item.id"
      >
        <div class="title">{{ item.name }}</div>
        <div class="number">{{ item.number }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserInfoStore } from "@/stores/userInfo.store";
const userInfoStore = useUserInfoStore();
import { ref } from "vue";

interface SingleData {
  id: number;
  name: string;
  number: string;
}

interface OverviewData {
  allData: SingleData[];
  orderData: SingleData[];
}
const overviewData = ref<OverviewData>({
  allData: [
    {
      id: 1,
      name: "总销售额",
      number: "836,387",
    },
    {
      id: 2,
      name: "总访问量",
      number: "1,342,629",
    },
    {
      id: 3,
      name: "总支付量",
      number: "993,851",
    },
    {
      id: 4,
      name: "总收藏量",
      number: "1,031,753",
    },
  ],
  orderData: [
    {
      id: 1,
      name: "今日订单数",
      number: "264",
    },
    {
      id: 2,
      name: "累计金额",
      number: "3,564",
    },
    {
      id: 3,
      name: "本月订单数",
      number: "4,523",
    },
    {
      id: 4,
      name: "累计金额",
      number: "125,551",
    },
  ],
});
</script>

<style lang="scss" scoped>
#overview {
  .userinfo {
    display: flex;
    align-items: center;
    .username {
      margin-left: 10px;
    }
  }
  .overview-list {
    margin-top: 40px;
    display: flex;
    justify-content: space-between;
    .overview-item {
      width: 22%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-shadow: var(--el-box-shadow-light);
      border-radius: 10px;
      padding: 20px;
      .title {
        font-weight: 600;
        margin-bottom: 10px;
      }
      .number {
        font-size: 18px;
      }
    }
  }
}
</style>
