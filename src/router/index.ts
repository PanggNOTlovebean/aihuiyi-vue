import { createWebHashHistory, createRouter } from 'vue-router'; 
import Main from '../views/main/index.vue';
import Learn from '../views/Learn/index.vue';

const routes = [
  { path: '/main', name: 'main', component: Main },
  { path: '/learn', name: 'learn', component: Learn },
  { path: '/', redirect: '/main' }
]


export const router = createRouter({
  routes : routes,
  history: createWebHashHistory(),
})