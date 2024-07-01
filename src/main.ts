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
import Dropdown from 'primevue/dropdown';
import Rating from 'primevue/rating';
import InputMask from 'primevue/inputmask';
import Dialog from 'primevue/dialog';
import Calendar from 'primevue/calendar';
import Tooltip from 'primevue/tooltip';
import Skeleton from 'primevue/skeleton';
import InputSwitch from 'primevue/inputswitch';
import Password from 'primevue/password';
import AutoComplete from 'primevue/autocomplete';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional
import ProgressSpinner from 'primevue/progressspinner';
import VueGoogleMaps from '@fawmi/vue-google-maps'
import DialogService from 'primevue/dialogservice';





import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primevue/resources/themes/aura-light-green/theme.css'
import axios from 'axios';




const app = createApp(App);

app.use(PrimeVue);
app.use(router);
app.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyCULKAWrNKbSkXtFx74rn80_sZpOlc4R7U',
    },
})
app.use(DialogService);

app.component('p-Button', Button);
app.component('p-InputText', InputText);
app.component('p-Checkbox', Checkbox);
app.component('p-RadioButton', RadioButton);
app.component('p-VirtualScroller', VirtualScroller);
app.component('p-ScrollPanel', ScrollPanel);
app.component('p-Card', Card);
app.component('p-Rating', Rating);
app.component('p-Dropdown', Dropdown);
app.component('p-Dialog', Dialog);
app.component('p-InputMask', InputMask);
app.component('p-Calendar', Calendar);
app.component('p-InputSwitch', InputSwitch);
app.component('p-Skeleton', Skeleton);
app.component('p-ProgressSpinner', ProgressSpinner);
app.component('p-Password', Password);
app.component('p-DataTable', DataTable);
app.component('p-Column', Column);
app.component('p-ColumnGroup', ColumnGroup);
app.component('p-Row', Row);
app.component('p-AutoComplete', AutoComplete);


app.directive('tooltip', Tooltip);

app.config.globalProperties.$axios = axios;


app.mount('#app');
