import { createWebHashHistory, createRouter } from 'vue-router'; 
import Main from '../views/main/index.vue';
import Learn from '../views/Learn/index.vue';
import AIAssistant from '../views/AIAssistant/index.vue';
import Review from '../views/Review/index.vue';
import Word from '../views/Word/index.vue';
import Grammar from '../views/Grammar/index.vue';
const routes = [
  { path: '/main', name: 'main', component: Main },
  { path: '/learn', name: 'learn', component: Learn },
  { path: '/aiAssistant', name: 'aiAssistant', component: AIAssistant },
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
  { path: '/', redirect: '/main' }
]


export const router = createRouter({
  routes : routes,
  history: createWebHashHistory(),
})