import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import App from './App.vue';

import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import router from './router';
import Checkbox from 'primevue/checkbox';
import RadioButton from 'primevue/radiobutton';
import VirtualScroller from 'primevue/virtualscroller';
import ScrollPanel from 'primevue/scrollpanel';
import Card from 'primevue/card';

import Rating from 'primevue/rating';







import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primevue/resources/themes/aura-light-green/theme.css'


const app = createApp(App);

app.use(PrimeVue);
app.use(router);

app.component('p-Button', Button);
app.component('p-InputText', InputText);
app.component('p-Checkbox', Checkbox);
app.component('p-RadioButton', RadioButton);
app.component('p-VirtualScroller', VirtualScroller);
app.component('p-ScrollPanel', ScrollPanel);
app.component('p-Card', Card);
app.component('p-Rating', Rating);

app.mount('#app');
