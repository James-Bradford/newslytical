import Vue from 'vue';
import Router from 'vue-router';

import Analysis from './views/Analysis.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/analysis/:id',
      name: 'analysis',
      component: Analysis,
    },
  ]
})
