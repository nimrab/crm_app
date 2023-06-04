<template>
<div class="col s12 m6 l4">
  <div class="card light-blue bill-card">
    <div class="card-content white-text">
      <span class="card-title">Счет в валюте</span>
      <p class="currency-line">
        <span>{{ userBill }} {{props.base}}</span>
      </p>
    </div>
  </div>
</div>
</template>

<script setup>
import { computed, defineProps } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const props = defineProps(['base']);

const userBill = computed(() => store.getters['info/userBill']);

</script>

<style scoped>

</style>
