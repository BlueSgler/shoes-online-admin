<template>
  <v-chart class="chart" :option="option" autoresize />
</template>

<script lang="ts" setup>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { BarChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from "echarts/components";
import VChart from "vue-echarts";
import { ref } from "vue";

import { getChievementApi } from "@/apis/charts";

use([
  CanvasRenderer,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
]);

interface DataItem {
  shoeName: string;
  num: number;
  percentage: number;
}

const data = ref<DataItem[]>([]);

const getData = async () => {
  const res = await getChievementApi();
  data.value = res.data;
  option.value.xAxis!.data = data.value.map((item) => item.shoeName);
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
    tyep: string;
    data: string[];
  };
  yAxis?: {
    type: string;
  };
  series?: {
    data: number[];
    type: string;
    showBackground: boolean;
    backgroundStyle: {
      color: string;
    };
  }[];
};

const option = ref<Option>({
  title: {
    text: "业绩报表",
    left: "center",
  },
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b} : {c} ({d}%)",
  },
  xAxis: {
    tyep: "category",
    data: [],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [],
      type: "bar",
      showBackground: true,
      backgroundStyle: {
        color: "rgba(180, 180, 180, 0.2)",
      },
    },
  ],
});
</script>

<style scoped>
.chart {
  height: 100vh;
}
</style>
