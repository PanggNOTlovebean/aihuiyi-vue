import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {Button, NavBar, Field, CellGroup, Cell, Icon, Tab,Tag, Tabs, Popup} from 'vant'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'vant/lib/index.css';
import {router} from './router/index.ts'

const app = createApp(App);

app.use(router);

app.use(Button);
app.use(NavBar);
app.use(Field);
app.use(CellGroup);
app.use(Cell);
app.use(Tag);
app.use(Popup);
app.use(Icon);
app.use(Tab);
app.use(Tabs);
app.use(ElementPlus);


app.mount('#app');
