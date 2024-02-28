<template>
    <div class="body h-auto w-full  surface-200">
        <div class="grid grid-nogutter -m-2">
            <!-- Top Grid-->
            <div class="col-12 shadow-bottom">
                <HeaderComp  />
            </div>
                <!-- Bottom Grids-->
            <div class="col-6">
                <div class="flex w-full align-items-center surface-300 justify-content-center left-grid"> 
                    <img src="@/assets/kart-astro.png" alt="Checkout" class="w-full h-full" />
                </div>
            </div>
            <div class="col-6">
                <div class="flex flex-column w-full h-full surface-300 align-items-start right-grid gap-6">
                    <div class="card flex w-full ">
                        <div class="flex flex-row justify-content-start w-full gap-8">
                            <div class="flex flex-column gap-2">
                                <p class="text text-xl font-semibold">OrderBy</p>
                                <p-Dropdown v-model="selectedOrderBy" :options="orderBy" optionLabel="name" placeholder="Select OrderBy" class="w-full md:w-14rem" />
                            </div>
                            <div class="flex flex-column gap-2">
                                <p class="text text-xl font-semibold">SuperMarket</p>
                                <p-Dropdown v-model="selectedSuperMarket" :options="superMarkets" optionLabel="name" placeholder="Select Supermarket" class="w-full md:w-14rem" />
                            </div>
                        </div>
                    </div> 
                    <div class="card flex flex-column w-full justify-content-start">
                        <p class="text text-xl font-semibold">{{ recipe.title }}</p>
                        <p class="text text-md font-semibold">Ingredients</p>
                        <div class="grid">
                            <div class="col-8">
                                <table class="table w-full justify-content-start">
                                    <thead>
                                        <tr>
                                            <th class="text-left font-semibold text-md ">Name</th>
                                            <th class="text-left font-semibold text-md">Price</th>
                                            <th class="text-left font-semibold text-md">Selected</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="ingredient in recipe.ingredients" :key="ingredient.name">
                                            <td>{{ ingredient.name }}</td>
                                            <td>{{ ingredient.price }}</td>
                                            <td><p-Checkbox v-model="selectedIngredients" :value="ingredient" /></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            
                            <div class="col-4">
                                <div class="flex flex-column justify-content-center align-items-center w-full h-full gap-3">
                                    <p class="text text-xl font-semibold">Total Price</p>
                                    <div class="circle">
                                            <p class="text text-xl font-semibold">{{ selectedIngredients.reduce((acc, ingredient) => acc + (ingredient.selected ? ingredient.price : 0), 0) }}</p>
                                    </div>
                                    <p-Button label="Checkout" class="w-auto m-3" @click="visible = true" />
                                    
                                    <!-- Checkout -->
                                    <p-Dialog v-model:visible="visible" :modal="true" :closable="false" :style="{ width: '50rem' }" header="Payment Information">
                                        <div class="grid">
                                            <div class="col-6">
                                                <div class="checkout-dialog w-full h-full flex flex-column justify-content-center align-items-start p-2 gap-3">
                                                    <div class="formgroup flex flex-column">
                                                        <label for="cardholderName">Cardholder Name</label>
                                                        <p-InputText id="cardholderName" v-model="card.cardholderName" placeholder="Enter your name"/>
                                                    </div>
                                                    <div class="formgroup flex flex-column">
                                                        <label for="cardNumber">Card Number</label>
                                                        <p-InputMask id="cardNumber" v-model="card.cardNumber" mask="9999 - 9999 - 9999 - 9999" placeholder="Enter your card number"/>
                                                    </div>
                                                    <div class="formgroup flex flex-column">
                                                        <label for="expirationDate">Expiration Date</label>
                                                        <p-InputMask id="expirationDate" v-model="card.expirationDate" mask="99/99" placeholder="MM/YY"/>
                                                    </div>
                                                    <div class="formgroup flex flex-column">
                                                        <label for="securityCode">Security Code</label>
                                                        <p-InputMask id="securityCode" v-model="card.securityCode" mask="999" placeholder="Enter your security code"/>
                                                    </div>
                                                    <div class="flex flex-column gap-1">
                                                        <label for="Delivery">Delivery Now</label>
                                                        <p-InputSwitch v-model="checkedNow" onLabel="Delivery" offLabel="Pickup" />
                                                    </div>
                                                    <div class="flex-auto">
                                                        <label for="calendar-12h">Choose date/time of delivery</label>
                                                        <p-Calendar id="calendar-12h" v-model="datetime12h" showTime hourFormat="12" :disabled="checkedNow"
                                                            v-tooltip.top="'From 8am to 9pm (Supermarket working hours)'" type="text" placeholder="Top">
                                                            <template #date="{date}">
                                                                <span :class="{ 'sunday': isSunday(date) }">{{ date.day }}</span>
                                                            </template>
                                                        </p-Calendar>
                                                    </div>                                              
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <div class="flex w-full align-items-center justify-content-center"> 
                                                    <img src="@/assets/card.png" alt="Card" class="w-full h-full" />
                                                </div>
                                            </div>
                                        </div>
                                        <template #footer>
                                            <div class="flex justify-content-end gap-2">
                                                <p-Button label="Cancel" icon="pi pi-times" @click="visible = false" class="bg-indigo-400"></p-Button>
                                                <p-Button label="Order" icon="pi pi-shopping-cart"  class="bg-indigo-400" @click="visibleConfirm = true"></p-Button>

                                                <p-Dialog v-model:visible="visibleConfirm" :modal="true" :closable="false" :style="{ width: '30rem' }" header="Order Confirmation">
                                                    <p-ProgressSpinner v-if="showSpinner" class="p-button-text" />
                                                    <div v-else class="flex flex-column justify-content-center align-items-center p-2 gap-3">
                                                        <p class="text text-xl font-semibold">Order has been placed successfully</p>
                                                        <div class="flex w-full align-items-center justify-content-center"> 
                                                            <img src="@/assets/success.svg" alt="Success" class="w-8rem" />
                                                        </div>
                                                    </div>  
                                                    <template #footer>
                                                        <div class="flex justify-content-end gap-2" v-if="!showSpinner">
                                                            <p-Button label="Return home" icon="pi " @click="returnHome" class="p-button-text"></p-Button>
                                                        </div>
                                                    </template>
                                                </p-Dialog>
                                            </div>
                                        </template>
                                    </p-Dialog>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import HeaderComp from '@/components/HeaderComp.vue';
import { ref,watch } from 'vue';
import router from '@/router';


interface Card {
    cardholderName: string;
    cardNumber: string;
    expirationDate: string;
    securityCode: string;
}

export default {
    name: 'CheckoutPage',

    components: {
        HeaderComp
    },

    data() {
        const userId = "2";
        const userName =  'Stivaktakis Giorgos';
        const checkedNow = ref(true);

        const orderBy = ref([
            { name:"Price", value : "price" },
            { name:"Distance", value : "distance" }
        ])

        const superMarkets = ref([
            { name:"Lidl", value : "lidl" },
            { name:"AB", value : "ab" },
            { name:"Carrefour", value : "carrefour" }
        ])

        const recipe = ref({
            name: "Recipe",
            title: "Greek Salad",
            ingredients: [
                { name: "Tomato", quantity: 2, price: 0.5 ,selected: true },
                { name: "Cucumber", quantity: 1, price: 0.5 ,selected: true },
                { name: "Feta", quantity: 200, price: 2.5 ,selected: true },
                { name: "Olives", quantity: 100, price: 1.5 ,selected: true },
                { name: "Olive Oil", quantity: 100, price: 1.5 ,selected: true },
                { name: "Salt", quantity: 100, price: 1.5 ,selected: true },
                { name: "Pepper", quantity: 100, price: 1.5 ,selected: true },
                { name: "Oregano", quantity: 100, price: 1.5 ,selected: true },
                { name: "Onion", quantity: 100, price: 1.5 ,selected: true },
                { name: "Green Pepper", quantity: 100, price: 1.5 ,selected: true },
                { name: "Red Pepper", quantity: 100, price: 1.5 ,selected: true },
                { name: "Vinegar", quantity: 100, price: 1.5 ,selected: true },
                { name: "Lemon", quantity: 100, price: 1.5 ,selected: true },
                { name: "Garlic", quantity: 100, price: 1.5 ,selected: true },
            ]
        
        });

        const columns = ref([
            { field: 'name', header: 'Name' },
            { field: 'price', header: 'Price' },
            { field: 'selected', header: 'Selected' }
        ]);
        

        const selectedOrderBy = ref([]);
        const selectedSuperMarket = ref([]);
        const selectedIngredients = ref(recipe.value.ingredients.map((ingredient) => {
            return { ...ingredient, selected: true };
        }));

        const visible = ref(false);
        const visibleConfirm = ref(false);
        const showSpinner = ref(false);

        watch(visibleConfirm, (newValue) => {
            if (newValue) {
                showSpinner.value = true;
                setTimeout(() => {
                    showSpinner.value = false;
                }, 4000); // Show spinner for 4 seconds
            }
        });

        const card = ref<Card>({
            cardholderName: '',
            cardNumber: '',
            expirationDate: '',
            securityCode: ''
        });

        function returnHome() {
            visibleConfirm.value = false;
            visible.value = false;
            router.push('/home');
        }

        return {
            userId,userName,checkedNow,
            orderBy,superMarkets,
            selectedOrderBy,selectedSuperMarket,
            recipe,selectedIngredients,
            columns,visible,card,visibleConfirm,
            returnHome,showSpinner

        };
    },
    setup() {
        const datetime12h = ref<Date | null>(null);

        watch(datetime12h, (newValue, oldValue) => {
        if (newValue) {
            const hours = newValue.getHours();
            const startHour = 8;  // 8 AM
            const endHour = 21;   // 9 PM

            if (hours < startHour || hours > endHour) {
            const adjustedDate = new Date(newValue);
            if (hours < startHour) {
                adjustedDate.setHours(startHour);
            } else {
                adjustedDate.setHours(endHour);
            }
            datetime12h.value = adjustedDate;
            }
        }
        });

        function isSunday(date: { year: number, month: number, day: number, otherMonth: boolean }): boolean {
            const dayDate = new Date(date.year, date.month, date.day);
            return dayDate.getDay() === 0; // 0 is Sunday
        }
        

        return { datetime12h , isSunday};
    },
    methods: {
        
    },
    computed: {
        // Your computed properties here
    },
    mounted() {
        // Your mounted hook code here
    },
};
</script>

<style scoped>
    .shadow-bottom {
    box-shadow: 0 1rem 6rem rgba(0, 0, 0, 0.2);
    size: 3rem;
    position: fixed;
    z-index: 2;
    }

    .circle {
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    background-color: #b526f7;
    border: black 2px solid;
    display: flex;
    justify-content: center;
    align-items: center;
    }


    .left-grid {
    padding-top: 8rem;
    height: 100vh;
    top: 0;
    left: 0;
    overflow: auto;
    }

    .checkout-dialog {
    /* background-image: url('../assets/bag-astro.png'); */
    background-size: cover; /* Cover the entire container */
    background-position: center; /* Center the image in the container */
    background-repeat: no-repeat; /* Do not repeat the image */
    }

    .sunday {
    text-decoration: line-through;
    color: red;
    }


</style>
