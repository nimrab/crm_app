<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
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
import { useStore } from 'vuex';
import { computed, onMounted } from 'vue';
import M from 'materialize-css';
import messages from '@/utils/messages';

const store = useStore();

const userCategories = computed(() => store.getters['category/getCategories']);

const updateCategories = async () => {
  try {
    await store.dispatch('category/fetchCategories');
  } catch {
    M.toast({ html: messages.errorCategoryUpdate });
  }
};

onMounted(async () => {
  await store.dispatch('category/fetchCategories');
});

</script>

<style scoped>

</style>
