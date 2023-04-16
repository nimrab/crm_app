<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">
        <div class="col s12 m6">
          <div>
            <div class="page-subtitle">
              <h4>Создать</h4>
            </div>

            <form>
              <div>
                <label for="name">Название
                  <input
                    id="name"
                    type="text"
                  >
                </label>
                <span class="helper-text invalid">Введите название</span>
              </div>
              <div>
                <label for="limit">Лимит
                  <input
                    id="limit"
                    type="number"
                  >
                </label>
                <span class="helper-text invalid">Минимальная величина</span>
              </div>

              <button class="btn waves-effect waves-light" type="submit">
                Создать
                <i class="material-icons right">send</i>
              </button>
            </form>
          </div>
        </div>
        <div class="col s12 m6">
          <div>
            <div class="page-subtitle">
              <h4>Редактировать</h4>
            </div>
            <form>
              <div>
                <label for="select">Выберите категорию
                  <select id="select">
                    <option value="cat1" selected>Category</option>
                    <option value="cat2">Category</option>
                    <option value="cat3">Category</option>
                  </select>
                </label>
              </div>

              <div>
                <label for="name">Название
                  <input type="text" id="name">
                </label>
                <span class="helper-text invalid">TITLE</span>
              </div>

              <div>
                <label for="limit">Лимит
                  <input
                    id="limit"
                    type="number"
                  >
                </label>
                <span class="helper-text invalid">LIMIT</span>
              </div>

              <button class="btn waves-effect waves-light" type="submit">
                Обновить
                <i class="material-icons right">send</i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'CategoriesView',
};
</script>

<style scoped>

</style>
