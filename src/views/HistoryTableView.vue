<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>Сумма</th>
      <th>Дата</th>
      <th>Категория</th>
      <th>Тип</th>
      <th>Открыть</th>
    </tr>
    </thead>

    <tbody>
    <tr
      v-for="(record, idx) in props.records"
      :key="idx"
    >
      <td>{{idx + 1}}</td>
      <td>{{ record.amount }} {{baseCurrency}}</td>
      <td>{{ formatDate(record.date) }}</td>
      <td>{{ record.categoryName }}</td>
      <td>
        <span
          class="white-text badge"
          :class="[record.typeClass]"
        >{{ record.typeText }}
        </span>
      </td>
      <td>
        <button class="btn-small btn" @click="goToDetailRecord(record.id)">
          <i class="material-icons">open_in_new</i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script setup>
import { defineProps, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const props = defineProps(['records']);
const store = useStore();
const router = useRouter();

const baseCurrency = ref('');

const formatDate = (date) => {
  const newDate = new Date(date);
  const options = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  return new Intl.DateTimeFormat('ru-RU', options).format(newDate);
};

onMounted(async () => {
  const rates = await store.dispatch('info/getCurrency');
  if (rates) {
    baseCurrency.value = rates?.base ? rates.base : '';
  }
});

const goToDetailRecord = (id) => {
  router.push({ name: 'detail-record', params: { id } });
};
</script>

<style scoped>

</style>
