// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from '@/components/Loading';
import Comment from '@/components/Comment';
import Settings from '@/components/Settings';
import Modal from '@/components/Modal';
import Listing from '@/components/Listing';
import ListingList from '@/components/Listing-List';

Vue.config.productionTip = false;
window.axios = axios;
window.baseURL = 'https://www.reddit.com';
Vue.use(VueAxios, axios);

Vue.component('loader', Loading);
Vue.component('comment', Comment);
Vue.component('settings', Settings);
Vue.component('modal', Modal);
Vue.component('listing', Listing);
Vue.component('listing-list', ListingList);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
