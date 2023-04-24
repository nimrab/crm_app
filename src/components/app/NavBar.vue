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
            USER NAME
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id='dropdown' class='dropdown-content'>
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <i class="material-icons">account_circle</i>Профиль
              </a>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <router-link to="/login?message=logout" class="black-text">
                <i class="material-icons">assignment_return</i>Выйти
              </router-link>
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

const emit = defineEmits(['toggleNavbar']);

const router = useRouter();

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

const toggleNavbar = () => {
  emit('toggleNavbar');
};

const logout = () => {
  router.push('/login?message=logout');
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
