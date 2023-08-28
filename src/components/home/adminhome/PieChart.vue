<template>
  <v-chart class="chart" :option="option" autoresize />
</template>

<script lang="ts" setup>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import VChart from "vue-echarts";
import { ref } from "vue";
import { getMarketingApi } from "@/apis/charts";

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

interface DataItem {
  typeName: string;
  num: number;
  percentage: number;
}

const data = ref<DataItem[]>([]);

const getData = async () => {
  const res = await getMarketingApi();
  data.value = res.data;
  option.value.legend.data = data.value.map((item) => item.typeName);
  option.value.series[0].data = data.value.map((item) => ({
    value: item.num,
    name: item.typeName,
  }));
};

getData();

type SeriesItem = {
  value: number;
  name: string;
};

type Option = {
  title: {
    text: string;
    left: string;
  };
  tooltip: {
    trigger: string;
    formatter: string;
  };
  legend: {
    orient: string;
    left: string;
    data: string[];
  };
  series: {
    name: string;
    type: string;
    radius: string;
    center: [string, string];
    data: SeriesItem[];
    emphasis: {
      itemStyle: {
        shadowBlur: number;
        shadowOffsetX: number;
        shadowColor: string;
      };
    };
  }[];
};

const option = ref<Option>({
  title: {
    text: "营销报表",
    left: "center",
  },
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b} : {c} ({d}%)",
  },
  legend: {
    orient: "vertical",
    left: "left",
    data: [],
  },
  series: [
    {
      name: "Traffic Sources",
      type: "pie",
      radius: "55%",
      center: ["50%", "60%"],
      data: [],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
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
