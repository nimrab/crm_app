<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons" >refresh</i>
      </button>
    </div>

    <div class="row">
      <CommonLoader v-if="isLoading"/>
      <HomeBill
        v-if="!isLoading"
        :base="baseCurrency"
      />
      <HomeCurrency
        v-if="!isLoading"
        :rates="rates"
      />

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import HomeBill from '@/components/HomeBill.vue';
import HomeCurrency from '@/components/HomeCurrency.vue';

const store = useStore();

const isLoading = ref(false);
const rates = ref(null);

const baseCurrency = computed(() => (rates.value?.base ? rates.value?.base : ''));

const getCurrency = async () => {
  isLoading.value = true;
  try {
    const currency = await store.dispatch('info/getCurrency');
    if (currency) {
      rates.value = currency;
    }
  } finally {
    isLoading.value = false;
  }
};

const refresh = () => {
  getCurrency();
};

onMounted(() => {
  getCurrency();
});

</script>
