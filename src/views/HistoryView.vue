<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>
    <CommonLoader v-if="loading"/>
    <p
      v-else-if="!records.length"
      class="center"
    >Записей пока нет.
    <router-link to="/record">Добавить запись</router-link>
    </p>
    <section v-else >
      <HistoryTableView
        :records="tableRecords"
      />
    </section>
  </div>
</template>

<script setup>
import HistoryTableView from '@/views/HistoryTableView.vue';
import { onMounted, ref, computed } from 'vue';
import { useStore } from 'vuex';
import M from 'materialize-css';
import messages from '@/utils/messages';
import CommonLoader from '@/components/app/CommonLoader.vue';

const store = useStore();

const loading = ref(false);

const categories = computed(() => store.getters['category/getCategories']);
const records = computed(() => store.getters['records/getRecords']);

const tableRecords = computed(() => records.value.map((record) => ({
  ...record,
  categoryName: categories.value.find((c) => c.id === record.categoryId)?.name ?? '',
  typeClass: record.type === 'income' ? 'green' : 'red',
  typeText: record.type === 'income' ? 'Доход' : 'Расход',
})));

onMounted(async () => {
  try {
    loading.value = true;
    await store.dispatch('category/fetchCategories');
    await store.dispatch('records/fetchRecords');
  } catch {
    M.toast({ html: messages.errorDataFetch });
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>

</style>
