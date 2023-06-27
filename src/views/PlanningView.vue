<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{userBill}} {{baseCurrency}}</h4>
    </div>

    <CommonLoader v-if="loading"/>
    <p
      v-else-if="!categories.length"
      class="center"
    >Категорий пока нет.
      <router-link
        :to="{name: 'categories'}"
      >Добавить категорию</router-link>
    </p>
    <section v-else>
      <div
        v-for="cat in filteredCategories"
        :key="cat.id"
      >
        <p
          v-tooltip="cat.progressPercent"
        >
          <strong>{{cat.title}}</strong>
          {{ cat.spent }} {{baseCurrency}} из {{cat.limit}} {{baseCurrency}}
        </p>
        <div class="progress" >
          <div
            class="determinate"
            :class="[cat.progressColor]"
            :style="{width:`${cat.progressPercent}%`}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import CommonLoader from '@/components/app/CommonLoader.vue';
import { onMounted, ref, computed } from 'vue';
import { useStore } from 'vuex';
import M from 'materialize-css';
import messages from '@/utils/messages';

const store = useStore();

const loading = ref(false);
const baseCurrency = ref('');

const categories = computed(() => store.getters['category/getCategories']);
const records = computed(() => store.getters['records/getRecords']);
const userBill = computed(() => store.getters['info/userBill']);

const filteredCategories = computed(() => categories.value.map((cat) => {
  const spent = records.value
    .filter((r) => r.categoryId === cat.id)
    .filter((r) => r.type === 'outcome')
    .reduce((acc, el) => acc + +el.amount, 0);

  const percent = (100 * spent) / cat.limit;
  const progressPercent = percent > 100 ? 100 : percent;
  let progressColor = 'green';
  if (progressPercent > 60) {
    progressColor = 'yellow';
  }
  if (progressPercent >= 100) {
    progressColor = 'red';
  }

  return {
    ...cat,
    spent,
    progressPercent,
    progressColor,
  };
}));

onMounted(async () => {
  try {
    loading.value = true;
    await store.dispatch('category/fetchCategories');
    await store.dispatch('records/fetchRecords');
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
