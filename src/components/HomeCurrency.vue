<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">Курс валют {{baseCurrency}}</span>
        </div>
        <table>
          <thead>
          <tr>
            <th>Валюта</th>
            <th>Курс</th>
            <th>Дата</th>
          </tr>
          </thead>
          <tbody  v-if="rates.length">
          <tr
            v-for="(curr, idx) in rates"
            :key="idx"
          >
            <td>{{curr.currency}}</td>
            <td>{{curr.rate}}</td>
            <td>{{currencyDate}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue';

const props = defineProps(['rates']);

const formattedRates = (rates) => (rates ? Object.keys(rates).filter((key) => key !== 'EUR').map((el) => ({ currency: el, rate: rates[el] })) : []);

const currencyDate = computed(() => (props.rates ? props.rates?.date : ''));

const rates = computed(() => (props.rates?.rates ? formattedRates(props.rates.rates) : []));

const baseCurrency = computed(() => (props.rates ? ` (${props.rates.base})` : ''));

</script>

<style scoped>

</style>
