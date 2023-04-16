<template>
  <div id="app">
    <component v-if="layout" :is="layout"/>
  </div>
</template>
<script setup>
import EmptyLayout from '@/layouts/EmptyLayout.vue';
import MainLayout from '@/layouts/MainLayout.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const layout = computed(() => (route.meta.layout === 'main' ? MainLayout : EmptyLayout));

</script>

<style lang="scss">
@import '~materialize-css/dist/css/materialize.min.css';
@import 'assets/index.css';
</style>
