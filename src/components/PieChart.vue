<template>
<Pie :data="chartData" :options="chartOptions"/>
</template>

<script setup>
import { Pie } from 'vue-chartjs';
import {
  Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale,
  ArcElement,
} from 'chart.js';
import { computed, defineProps } from 'vue';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

const props = defineProps(['categories', 'records']);

const chartOptions = {
  responsive: true,
};

const chartData = computed(() => ({
  labels: props.categories.map(({ name }) => name),
  datasets: [{
    label: 'Расходы по категориям',
    data: props.categories.map((category) => props.records.reduce((total, record) => {
      if (record.categoryId === category.id && record.type === 'outcome') {
        // eslint-disable-next-line no-param-reassign
        total += record.amount;
      }
      return total;
    }, 0)),
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(255, 159, 64, 0.2)',
    ],
  }],
}));

</script>
