<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <CommonLoader v-if="isLoading"/>
    <section v-else>
      <div class="row">
        <CategoryCreate @createCategory="updateCategories" />
        <CategoryEdit
          :userCategories="userCategories"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import CategoryCreate from '@/components/CategoryCreate.vue';
import CategoryEdit from '@/components/CategoryEdit.vue';
import CommonLoader from '@/components/app/CommonLoader.vue';
import { useStore } from 'vuex';
import { computed, onMounted, ref } from 'vue';
import M from 'materialize-css';
import messages from '@/utils/messages';

const store = useStore();

const isLoading = ref(false);

const userCategories = computed(() => store.getters['category/getCategories']);

const updateCategories = async () => {
  try {
    isLoading.value = true;
    await store.dispatch('category/fetchCategories');
  } catch {
    M.toast({ html: messages.errorCategoryUpdate });
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  try {
    isLoading.value = true;
    await store.dispatch('category/fetchCategories');
  } catch {
    M.toast({ html: messages.errorCategoryUpdate });
  } finally {
    isLoading.value = false;
  }
});

</script>

<style scoped>

</style>
