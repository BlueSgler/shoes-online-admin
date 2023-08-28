<template>
  <v-chart class="chart" :option="option" autoresize />
</template>

<script lang="ts" setup>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import {   LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from "echarts/components";
import VChart from "vue-echarts";
import { ref } from "vue";

import { getOrderApi } from "@/apis/charts";

use([
  CanvasRenderer,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  LineChart,
]);

interface DataItem {
  date: Date;
  num: number;
}

const data = ref<DataItem[]>([]);

const getData = async () => {
  const res = await getOrderApi();
  data.value = res.data;
  option.value.xAxis!.data = data.value.map((item) => item.date);
  option.value.series![0].data = data.value.map((item) => item.num);
};

getData();

type Option = {
  title?: {
    text: string;
    left: string;
  };
  tooltip?: {
    trigger: string;
    formatter: string;
  };
  legend?: {
    orient: string;
    left: string;
    data: string[];
  };
  xAxis?: {
    data: Date[];
  };
  yAxis?: {
    type: string;
  };
  series?: {
    data: number[];
    type: string;
  }[];
};

const option = ref<Option>({
  title: {
    text: "订单报表",
    left: "center",
  },
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b} : {c} ({d}%)",
  },
  xAxis: {
    data: [],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [],
      type: "line",
    },
  ],
});
</script>

<style scoped>
.chart {
  height: 100vh;
}
</style>
