import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import firebase from 'firebase/compat/app';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: {
      layout: 'main',
      authRequired: true,
    },
  },
  {
    path: '/categories',
    name: 'categories',
    component: () => import('../views/CategoriesView.vue'),
    meta: {
      layout: 'main',
      authRequired: true,
    },
  },
  {
    path: '/record',
    name: 'record',
    component: () => import('../views/NewRecordView.vue'),
    meta: {
      layout: 'main',
      authRequired: true,
    },
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfileView.vue'),
    meta: {
      layout: 'main',
      authRequired: true,
    },
  },
  {
    path: '/planning',
    name: 'planning',
    component: () => import('../views/PlanningView.vue'),
    meta: {
      layout: 'main',
      authRequired: true,
    },
  },
  {
    path: '/history',
    name: 'history',
    component: () => import('../views/HistoryView.vue'),
    meta: {
      layout: 'main',
      authRequired: true,
    },
  },
  {
    path: '/detail-record/:id',
    name: 'detail-record',
    component: () => import('../views/DetailRecordView.vue'),
    meta: {
      layout: 'main',
      authRequired: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta: {
      layout: 'empty',
      authRequired: false,
    },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue'),
    meta: {
      layout: 'empty',
      authRequired: false,
    },
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const { currentUser } = firebase.auth();

  if (to.name === 'login') {
    next();
  } else if (to.meta.authRequired && !currentUser) {
    next('/login');
  } else {
    next();
  }
});

export default router;
