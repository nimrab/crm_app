<template>
<div class="col s12 m6">
  <div>
    <div class="page-subtitle">
      <h4>Редактировать</h4>
    </div>
    <form>
      <div>
        <label for="select">Выберите категорию
          <select
            v-model="selectedCategory"
            id="select"
            class="category-selector"
          >
            <option
              :value="undefined"
              selected
            >
            </option>
            <option
              v-for="cat in categoriesOptions"
              :key="cat.id"
              :value="cat.id">
              {{cat.name}}
            </option>
          </select>
        </label>
      </div>

      <div>
        <label for="name">Название
          <input
            v-model.trim="v$.name.$model"
            type="text"
            id="name"
            :class="{invalid: v$.name.$dirty && v$.name.$error}"
          >
        </label>
        <small
          v-for="(name, index) in v$.name.$errors" :key="index"
          class="helper-text invalid"
        >
          {{ name.$message }}
        </small>
      </div>

      <div>
        <label for="limit">Лимит
          <input
            v-model.trim="v$.limit.$model"
            id="limit"
            type="number"
            :class="{invalid: v$.limit.$dirty && v$.limit.$error}"
          >
        </label>
        <small
          v-for="(limit, index) in v$.limit.$errors" :key="index"
          class="helper-text invalid"
        >
          {{ limit.$message }}
        </small>
      </div>

      <button
        class="btn waves-effect waves-light"
        type="submit"
        @click.prevent="submit"
      >
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</div>
</template>

<script setup>
import {
  computed, watch, defineProps, ref, reactive,
} from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import M from 'materialize-css';
import messages from '@/utils/messages';
import { useStore } from 'vuex';

const props = defineProps(['userCategories']);
const store = useStore();

required.$message = 'Обязательное поле';

const state = reactive({
  name: '',
  limit: null,
});

const rules = {
  name: { required, $autoDirty: true },
  limit: { required, $autoDirty: true },
};

const v$ = useVuelidate(rules, state);

const selectedCategory = ref(undefined);

const categoriesOptions = computed(() => props.userCategories);

watch(selectedCategory, () => {
  if (selectedCategory.value) {
    v$.value.name.$model = categoriesOptions.value.find(({ id }) => id === selectedCategory.value).name ?? '';
    v$.value.limit.$model = categoriesOptions.value.find(({ id }) => id === selectedCategory.value).limit ?? '';
  }
});

const submit = async () => {
  await v$.value.$validate();

  if (!v$.value.$invalid) {
    const categoryData = {
      categoryId: selectedCategory.value,
      name: v$.value.name.$model,
      limit: v$.value.limit.$model,
    };
    try {
      await store.dispatch('category/editCategory', categoryData);
      M.toast({ html: messages.successCategoryEdit });
      await store.dispatch('category/fetchCategories');
    } catch {
      M.toast({ html: messages.errorCategoryUpdate });
    }
  }
};

</script>

<style scoped>
.category-selector {
  display: block;
}
</style>
