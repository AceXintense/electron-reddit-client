import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/Pages/Index';
import User from '@/components/Pages/User';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
          path: '/user/:username',
          name: 'User',
          component: User
    },
    { // Alias for users who use reddit.
        path: '/u/:username',
        name: 'User',
        component: User
    }
  ]
});
