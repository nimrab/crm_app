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
          >
        </label>
        <small class="helper-text invalid">Email</small>
      </div>
      <div>
        <label for="password">
          Пароль
          <input
            id="password"
            type="password"
            class="validate"
          >
        </label>
        <small class="helper-text invalid">Password</small>
      </div>
      <div>
        <label for="name">
          Имя
          <input
            id="name"
            type="text"
            class="validate"
          >
        </label>
        <small class="helper-text invalid">Name</small>
      </div>
      <p>
        <label for="checkbox">
          <input id="checkbox" type="checkbox" />
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <a href="/">Войти!</a>
      </p>
    </div>
  </form>
</template>

<script>

</script>

<style scoped>

</style>
