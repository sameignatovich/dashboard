import { createApp } from 'vue';

// Plugins
import Toaster from '@meforma/vue-toaster';
import VueAxios from 'vue-axios';
import axios from './plugins/axios';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import PageTitle from './plugins/PageTitle';
import FormatDate from './plugins/FormatDate';

// Components
import ModalDialogue from './components/ModalDialogue.vue';

// Global assets
import '@/assets/js/app';
import '@/assets/styles/app.scss';

// Preload routine
const token = localStorage.getItem('token');
if (token) {
  store.dispatch('auth/autologin', token);
}

// Application initialization
createApp(App)
  .use(store)
  .use(router)
  .use(VueAxios, axios)
  .use(Toaster, {
    position: 'top',
    duration: 5000,
    maxToasts: 3,
  })
  .use(PageTitle, {
    titleSuffix: 'Simple Dashboard',
  })
  .use(FormatDate)
  .component('modal-dialogue', ModalDialogue)
  .mount('#app');
