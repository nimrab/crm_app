<template>
  <div>
    <div>
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">История</router-link>
        <a class="breadcrumb" @click.prevent>
          {{ recordDetail.type }}
        </a>
      </div>
      <CommonLoader v-if="loading"/>
      <p v-else-if="!record.amount"> Записи с ID "<strong>{{recordId}} </strong>" не найдено.</p>
      <div v-else class="row">
        <div class="col s12 m6">
          <div class="card" :class="[recordDetail.class]">
            <div class="card-content white-text">
              <p>Описание: {{recordDetail.description}}</p>
              <p>Сумма: {{recordDetail.amount}} {{baseCurrency}}</p>
              <p>Категория: {{recordDetail.category}}</p>

              <small>{{ recordDetail.date }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import M from 'materialize-css';
import messages from '@/utils/messages';
import CommonLoader from '@/components/app/CommonLoader.vue';

const store = useStore();
const route = useRoute();

const recordId = route.params.id;
const baseCurrency = ref('');

const loading = ref(false);
const record = ref({
  description: '',
  amount: 0,
  category: '',
  type: '',
  date: '',
  class: '',
});

const categories = computed(() => store.getters['category/getCategories']);
const categoryName = computed(() => categories.value.find((c) => c.id === record.value.categoryId)?.name ?? '');
const recordDate = computed(() => {
  const options = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  };
  return record.value.date ? new Intl.DateTimeFormat('ru-RU', options).format(record.value.date.value) : '';
});

const recordDetail = computed(() => ({
  description: record.value.description,
  amount: record.value.amount,
  category: categoryName.value,
  type: record.value.type === 'income' ? 'Доход' : 'Расход',
  date: recordDate.value,
  class: record.value.type === 'income' ? 'green' : 'red',
}));

onMounted(async () => {
  try {
    loading.value = true;

    await store.dispatch('category/fetchCategories');
    const data = await store.dispatch('records/fetchRecordById', recordId);
    if (data) {
      record.value = data;
    }
    const rates = await store.dispatch('info/getCurrency');
    if (rates) {
      baseCurrency.value = rates?.base ? rates.base : '';
    }
  } catch {
    M.toast({ html: messages.errorDataFetch });
  } finally {
    loading.value = false;
  }
});

</script>

<style scoped>

</style>
