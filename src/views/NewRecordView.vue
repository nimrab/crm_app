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
            v-model="v$.category.$model"
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
        <small
          v-for="(category, index) in v$.category.$errors" :key="index"
          class="helper-text invalid"
        >
          {{ category.$message }}
        </small>
      </div>

      <p>
        <label for="income">
          <input
            v-model="radioType"
            id="income"
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
            v-model="radioType"
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
            v-model.number="v$.amount.$model"
            id="amount"
            type="number"
            min="1"
          >
        </label>
        <small
          v-for="(amount, index) in v$.amount.$errors" :key="index"
          class="helper-text invalid"
        >
          {{ amount.$message }}
        </small>
      </div>

      <div>
        <label for="description">
          Описание
          <input
            v-model="v$.description.$model"
            id="description"
            type="text"
          >
        </label>
        <small
          v-for="(description, index) in v$.description.$errors" :key="index"
          class="helper-text invalid"
        >
          {{ description.$message }}
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
</template>

<script setup>
import {
  computed, onMounted, ref, nextTick, reactive,
} from 'vue';
import { useStore } from 'vuex';
import M from 'materialize-css';
import CommonLoader from '@/components/app/CommonLoader.vue';
import { useVuelidate } from '@vuelidate/core';
import { integer, required } from '@vuelidate/validators';
import messages from '@/utils/messages';

required.$message = 'Обязательное поле';

const state = reactive({
  category: undefined,
  amount: 1,
  description: '',
});

const rules = {
  category: { required, $autoDirty: true },
  amount: { required, integer, $autoDirty: true },
  description: { required, $autoDirty: true },
};

const v$ = useVuelidate(rules, state);

const store = useStore();
const select = ref(null);
const isLoading = ref(false);
const radioType = ref('income');

const userBill = computed(() => store.getters['info/userBill']);
const categoriesOptions = computed(() => store.getters['category/getCategories']);
const canCreateRecord = computed(() => (radioType.value === 'income' ? true : userBill.value >= state.amount));
const newBillAmount = computed(() => (radioType.value === 'income' ? userBill.value + state.amount : userBill.value - state.amount));

const clearState = () => {
  radioType.value = 'income';
  state.category = undefined;
  state.amount = 1;
  state.description = '';
  v$.value.category.$dirty = false;
  v$.value.amount.$dirty = false;
  v$.value.description.$dirty = false;
};

const submit = async () => {
  await v$.value.$validate();

  if (!v$.value.$invalid) {
    if (!canCreateRecord.value) {
      M.toast({ html: messages.errorCategoryBill });
      return;
    }
    const recordData = {
      category: v$.value.category.$model,
      radioType: radioType.value,
      amount: v$.value.amount.$model,
      description: v$.value.description.$model,
    };
    try {
      await store.dispatch('records/createRecord', recordData);
      await store.dispatch('info/editUserBill', newBillAmount.value);
      await store.dispatch('info/getUserInfo');
      clearState();
      M.toast({ html: messages.successRecordCreate });
    } catch {
      M.toast({ html: messages.errorRecordCreate });
    }
  }
};

onMounted(async () => {
  try {
    isLoading.value = true;
    await store.dispatch('info/getUserInfo');
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
