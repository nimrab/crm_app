<template>
  <div>
    <div class="page-title">
      <h3>{{ localizeFilter('ProfileTitle')}}</h3>
    </div>

    <form class="form" @submit.prevent="submit">
      <div>
        <label for="name">
          Имя
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
      <div class="switch">
        <label for="checkbox">English
        <input v-model="isRuLocale" id="checkbox" type="checkbox">
        <span class="lever"></span>
        Русский
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script setup>
import {
  onMounted, reactive, ref,
} from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import M from 'materialize-css';
import messages from '@/utils/messages';
import { required } from '@vuelidate/validators';
import localizeFilter from '@/filters/localize.filter';

required.$message = 'Обязательное поле';

const router = useRouter();
const store = useStore();

const state = reactive({
  name: '',
});

const isRuLocale = ref(true);

const rules = {
  name: { required, $autoDirty: true },
};

const v$ = useVuelidate(rules, state);

const submit = async () => {
  await v$.value.$validate();
  if (!v$.value.$invalid) {
    const name = v$.value.name.$model;
    try {
      await store.dispatch('info/editUserName', name);
      await store.dispatch('info/editUserLocale', isRuLocale.value ? 'RU-ru' : 'EN-en');
      M.toast({ html: messages.successProfileChange });
    } catch {
      M.toast({ html: messages.errorProfileChange });
    }
  }
};

onMounted(async () => {
  await store.dispatch('info/getUserInfo');
  state.name = store.getters['info/userName'];
  isRuLocale.value = store.getters['info/userLocale'] === 'RU-ru';
});

</script>

<style scoped lang="scss">
.switch {
  margin: 20px 0 30px 0;
}
</style>
