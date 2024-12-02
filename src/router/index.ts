import { createWebHashHistory, createRouter } from 'vue-router';
import Main from '../views/main/index.vue';
import Learn from '../views/Learn/index.vue';
import Review from '../views/Review/index.vue';
import Word from '../views/Word/index.vue';
import Grammar from '../views/Grammar/index.vue';
import NoPage from '../views/NoPage.vue'
const routes = [
  { path: '/main', name: 'main', component: Main },
  { path: '/learn', name: 'learn', component: Learn },
  {
    path: '/review',
    name: 'review',
    component: Review
  },
  {
    path: '/review/word',
    name: 'review-word',
    component: Word
  },
  {
    path: '/review/grammar',
    name: 'review-grammar',
    component: Grammar
  },
  {
    path: '/review/history',
    name: 'review-history',
    component: NoPage
  },
  { path: '/', redirect: '/main' },
  {
    path: '/coming-soon',
    name: 'noPage',
    component: NoPage
  },
  {
    path: '/user',
    name: 'user',
    component: NoPage
  },
]


export const router = createRouter({
  routes: routes,
  history: createWebHashHistory(),
})