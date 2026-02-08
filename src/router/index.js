import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
import AdoptionCenter from '@/views/AdoptionCenter.vue';
import Donation from '@/views/Donation.vue';
import RescueStories from '@/views/RescueStories.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/adopt', name: 'adopt', component: AdoptionCenter },
    { path: '/donation', name: 'donation', component: Donation },
    { path: '/stories', name: 'stories', component: RescueStories }
  ],
  scrollBehavior () {
    return { x: 0, y: 0 };
  }
});
