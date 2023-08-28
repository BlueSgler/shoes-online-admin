<template>
  <div class="wrap">
    <AdminOverview class="item"></AdminOverview>
    <PieChart class="item"></PieChart>
    <BarChart class="item" />
    <LineChat class="item" />
  </div>
</template>

<script setup lang="ts">
import AdminOverview from "./adminhome/AdminOverview.vue";
import BarChart from "./adminhome/BarChart.vue";
import LineChat from "./adminhome/LineChat.vue";
import PieChart from "./adminhome/PieChart.vue";
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  flex-wrap: wrap;
  box-shadow: var(--el-box-shadow-light);
  .item {
    width: 50%;
    height: calc((100vh - 100px) / 2);
    min-height: 360px;
    padding: 20px;
    border: 1px solid #f5f5f7;
  }
}
</style>
