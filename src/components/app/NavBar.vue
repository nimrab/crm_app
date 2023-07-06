<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="toggleNavbar">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{ formattedDate }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown"
            ref="dropdown"
          >
            {{ userName }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id='dropdown' class='dropdown-content'>
            <li>
              <a href="#" class="black-text" @click.prevent="profile">
                <i class="material-icons">account_circle</i>Профиль
              </a>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <i class="material-icons">assignment_return</i>Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import {
  defineEmits, onMounted, onBeforeUnmount, ref, computed,
} from 'vue';
import { useRouter } from 'vue-router';

import M from 'materialize-css';
import { useStore } from 'vuex';

const emit = defineEmits(['toggleNavbar']);

const router = useRouter();
const store = useStore();

const dropdown = ref(null);
const date = ref(new Date());
const interval = ref(0);

const formattedDate = computed(() => {
  const options = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  return new Intl.DateTimeFormat('ru-RU', options).format(date.value);
});

const userName = computed(() => store.getters['info/userName']);

const toggleNavbar = () => {
  emit('toggleNavbar');
};

const logout = async () => {
  store.commit('info/resetUserInfo');
  await store.dispatch('auth/logout');
  await router.push('/login?message=logout');
};

const profile = () => {
  router.push({ name: 'profile' });
};

onMounted(() => {
  M.Dropdown.init(dropdown.value, {
    constantWidth: true,
  });

  interval.value = setInterval(() => {
    date.value = new Date();
  }, 1000);
});

onBeforeUnmount(() => {
  clearInterval(interval.value);

  if (dropdown.value && dropdown.value.destroy) {
    dropdown.value.destroy();
  }
});

</script>
