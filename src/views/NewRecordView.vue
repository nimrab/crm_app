<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>
    <CommonLoader v-if="isLoading"/>
    <p
      v-else-if="!categoriesOptions.length"
      class="center"
      >Категорий пока нет.
      <router-link
        :to="{name: 'categories'}"
      >Добавить категорию</router-link>
    </p>
    <form class="form" v-else>
      <div>
        <label for="select">
          Выберите категорию
          <select
            v-model="selectedCategory"
            id="select"
            ref="select"
            class="category-selector"
          >
            <option
              :value="undefined"
              selected
            />
            <option
              v-for="cat in categoriesOptions"
              :key="cat.id"
              :value="cat.id">
              {{cat.name}}
            </option>
          </select>
        </label>
      </div>

      <p>
        <label for="income">
          <input
            id="type"
            class="with-gap"
            name="type"
            type="radio"
            value="income"
          />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label for="outcome">
          <input
            id="outcome"
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
          />
          <span>Расход</span>
        </label>
      </p>

      <div>
        <label for="amount">
          Сумма
          <input
            id="amount"
            type="number"
          >
        </label>
        <span class="helper-text invalid">amount пароль</span>
      </div>

      <div>
        <label for="description">
          Описание
          <input
            id="description"
            type="text"
          >
        </label>
        <span
          class="helper-text invalid">description пароль</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script setup>
import {
  computed, onMounted, ref, watch, nextTick,
} from 'vue';
import { useStore } from 'vuex';
import M from 'materialize-css';
import messages from '@/utils/messages';
import CommonLoader from '@/components/app/CommonLoader.vue';

const store = useStore();
const select = ref(null);
const selectedCategory = ref(undefined);
const isLoading = ref(false);

const categoriesOptions = computed(() => store.getters['category/getCategories']);

onMounted(async () => {
  try {
    isLoading.value = true;
    await store.dispatch('category/fetchCategories');
  } catch {
    M.toast({ html: messages.errorCategoryUpdate });
  } finally {
    isLoading.value = false;
  }

  await nextTick(() => {
    M.FormSelect.init(select.value, categoriesOptions.value);
    M.updateTextFields();
  });
});

</script>

<style scoped>
</style>
