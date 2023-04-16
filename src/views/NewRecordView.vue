<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <form class="form">
      <div>
        <label for="select">
          Выберите категорию
          <select id="select">
            <option
            >name cat</option>
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

<script>

</script>

<style scoped>

</style>
