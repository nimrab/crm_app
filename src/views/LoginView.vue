<template>
  <form class="card auth-card" @submit.prevent="submit">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div>
        <label for="email">
          Email
        <input
          v-model.trim="v$.email.$model"
          id="email"
          type="text"
          :class="{invalid: v$.email.$dirty && v$.email.$error}"
        >
        </label>
        <small
          v-for="(email, index) in v$.email.$errors" :key="index"
          class="helper-text invalid"
        >
          {{ email.$message }}
        </small>
      </div>
      <label for="password" class="input-field">
        Пароль
        <input
          v-model.trim="v$.password.$model"
          id="password"
          type="password"
          :class="{invalid: v$.password.$dirty && v$.password.$error}"
        >
      </label>
      <small
        v-for="(password, index) in v$.password.$errors" :key="index"
        class="helper-text invalid"
      >
        {{ password.$message }}
      </small>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>
      <p class="center">
        Нет аккаунта?
        <router-link :to="{name: 'register'}">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import M from 'materialize-css';
import messages from '@/utils/messages';
import { required, email } from '@vuelidate/validators';

required.$message = 'Обязательное поле';

const route = useRoute();
const router = useRouter();
const store = useStore();

const state = reactive({
  email: '',
  password: '',
});

const rules = {
  email: { required, email, $autoDirty: true },
  password: { required, $autoDirty: true },
};

const v$ = useVuelidate(rules, state);

v$.value.email.email.$message = 'Некорректный email';

const submit = async () => {
  await v$.value.$validate();
  if (!v$.value.$invalid) {
    const loginData = {
      email: v$.value.email.$model,
      password: v$.value.password.$model,
    };

    try {
      await store.dispatch('auth/login', loginData);
      await router.push({ name: 'home' });
    } catch {
      M.toast({ html: messages.errorLogin });
    }
  }
};

onMounted(() => {
  if (route.query?.message === 'logout') {
    M.toast({ html: messages.logout });
  }
});

</script>

<style lang="scss" scoped>

</style>
