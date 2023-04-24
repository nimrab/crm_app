<template>

  <form class="card auth-card">
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
      <div>
        <label for="password">
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
          v-for="(password, index) in v$.name.$errors" :key="index"
          class="helper-text invalid"
        >
          {{ password.$message }}
        </small>
      </div>
      <p>
        <label for="checkbox">
          <input
            v-model="isRulesChecked"
            id="checkbox"
            type="checkbox" />
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
          @click.prevent="submit"
        >
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link :to="{name:'login'}">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';

required.$message = 'Обязательное поле';

const isRulesChecked = ref(false);

const state = reactive({
  email: '',
  password: '',
  name: '',
});

const rules = {
  email: { required, email, $autoDirty: true },
  password: { required, $autoDirty: true },
  name: { required, $autoDirty: true },
};

const v$ = useVuelidate(rules, state);

v$.value.email.email.$message = 'Некорректный email';

const submit = async () => {
  await v$.value.$validate();

  if (!v$.value.$invalid && isRulesChecked.value) {
    const registerData = {
      email: v$.value.email.$model,
      password: v$.value.password.$model,
      name: v$.value.name.$model,
    };
    console.log(registerData);
  }
};

</script>
