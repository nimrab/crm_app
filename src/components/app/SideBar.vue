<template>
  <ul :class="sidebarClass">
    <li v-for="(link, idx) in links" :key="idx">
      <router-link
        :to="{ name: link.name}"
        class="waves-effect waves-orange pointer"
        active-class="active"
        exact
      >
        {{link.title}}
      </router-link>
    </li>
  </ul>
</template>

<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps(['isOpen']);

const links = [
  { title: 'Счет', name: 'home' },
  { title: 'История', name: 'history' },
  { title: 'Планирование', name: 'planning' },
  { title: 'Новая запись', name: 'record' },
  { title: 'Категории', name: 'categories' },
];

const sidebarClass = computed(() => (props.isOpen ? ['sidenav', 'app-sidenav', 'open'] : ['sidenav', 'app-sidenav']));

</script>

<style scoped>

</style>
