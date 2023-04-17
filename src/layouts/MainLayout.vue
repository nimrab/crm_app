<template>
  <div class="app-main-layout">
    <NavBar @toggleNavbar="toggleNavbar"/>

    <SideBar :isOpen="isNavbarOpen"/>

    <main :class="mainClass">
      <div class="app-page">
        <router-view/>
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link :to="{name: 'record'}" class="btn-floating btn-large blue">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import SideBar from '@/components/app/SideBar.vue';
import NavBar from '@/components/app/NavBar.vue';
import { ref, computed } from 'vue';

const isNavbarOpen = ref(true);

const toggleNavbar = () => {
  isNavbarOpen.value = !isNavbarOpen.value;
};

const mainClass = computed(() => (isNavbarOpen.value ? ['app-content'] : ['app-content', 'full']));

</script>

<style scoped>

</style>
