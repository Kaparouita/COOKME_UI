import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import App from './App.vue';

import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primevue/resources/themes/aura-light-green/theme.css'


const app = createApp(App);

app.use(PrimeVue);

app.component('p-Button', Button);
app.component('p-InputText', InputText);

app.mount('#app');
