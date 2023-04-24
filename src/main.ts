import { createApp } from 'vue';
import { MessagePlugin, ErrorMessagePlugin } from '@/utils/message';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import 'materialize-css/dist/js/materialize.min';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDKoWdNv3h2ze59MMuoc7lMe6iuyjidhgI',
  authDomain: 'vue-crm-app-f89ae.firebaseapp.com',
  projectId: 'vue-crm-app-f89ae',
  storageBucket: 'vue-crm-app-f89ae.appspot.com',
  messagingSenderId: '247795061085',
  appId: '1:247795061085:web:36ac904999175a8d4658b4',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);
    app.use(store);
    app.use(router);
    app.use(MessagePlugin);
    app.use(ErrorMessagePlugin);
    app.mount('#app');
  }
});
