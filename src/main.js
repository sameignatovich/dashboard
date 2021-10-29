import { createApp } from 'vue';
import VueAxios from 'vue-axios';
import axios from './plugins/axios';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

import 'bootstrap';
import '@/assets/styles/app.scss';

createApp(App)
  .use(store)
  .use(router)
  .use(VueAxios, axios)
  .mount('#app');
