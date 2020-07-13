import Vue from 'vue';
import Router from 'vue-router';

import Analysis from './views/Analysis.vue';
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/analysis/:id',
      name: 'analysis',
      component: Analysis,
    },
  ]
})
