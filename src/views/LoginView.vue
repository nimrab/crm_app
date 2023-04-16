<template>
  <form class="card auth-card">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div>
        <label for="email">
          Email
        <input
          id="email"
          type="text"
          class="validate"
        >
        </label>
        <small class="helper-text invalid">Email</small>
      </div>
      <label for="password" class="input-field">
        Пароль
        <input
          id="password"
          type="password"
          class="validate"
        >
      </label>
        <small class="helper-text invalid">Password</small>
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
        <a href="/">Зарегистрироваться</a>
      </p>
    </div>
  </form>
</template>

<script>

</script>

<style lang="scss" scoped>

</style>
