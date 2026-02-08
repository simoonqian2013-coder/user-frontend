import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
import AdoptionCenter from '@/views/AdoptionCenter.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/adopt', name: 'adopt', component: AdoptionCenter }
  ],
  scrollBehavior () {
    return { x: 0, y: 0 };
  }
});
