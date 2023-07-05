<template>
<div class="col s12 m6">
  <div>
    <div class="page-subtitle">
      <h4>Создать</h4>
    </div>
    <form>
      <div>
        <label for="name">Название
          <input
            v-model.trim="v$.name.$model"
            id="name"
            type="text"
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
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</div>
</template>

<script setup>
import { reactive, defineEmits } from 'vue';
import { useStore } from 'vuex';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import M from 'materialize-css';
import messages from '@/utils/messages';

const store = useStore();

const emits = defineEmits(['createCategory']);

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

const clearState = () => {
  v$.value.name.$model = '';
  v$.value.limit.$model = '';
  v$.value.name.$dirty = false;
  v$.value.limit.$dirty = false;
};

const submit = async () => {
  await v$.value.$validate();

  if (!v$.value.$invalid) {
    const categoryData = {
      name: v$.value.name.$model,
      limit: v$.value.limit.$model,
    };
    try {
      await store.dispatch('category/createCategory', categoryData);
      M.toast({ html: messages.successCategoryCreate });
      clearState();
      emits('createCategory');
    } catch {
      M.toast({ html: messages.errorCategoryCreate });
    }
  }
};

</script>

<style scoped>

</style>
