import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {Button, NavBar, Field, CellGroup} from 'vant'
import 'vant/lib/index.css';
import {router} from './router/index.ts'

const app = createApp(App);

app.use(router);

app.use(Button);
app.use(NavBar);
app.use(Field);
app.use(CellGroup);


app.mount('#app');
