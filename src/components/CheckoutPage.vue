<template>
    <div class="body h-auto w-full  surface-200">
        <div class="grid grid-nogutter -m-2">
            <!-- Top Grid-->
            <div class="col-12 shadow-bottom">
                <HeaderComp  :username="user.username" :address="user.address" :userId="user.id"/>
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
                                <div v-if="currMarket.distance !== 0">
                                    <p class="text text-md ">Distance: {{ currMarket.distance / 1000 }} km</p>
                                </div>
                                <div v-else>
                                    <p class="text text-md ">Distance: (Login First)</p>
                                </div>
                                
                            </div>
                        </div>
                        
                    </div> 
                    <div class="card flex flex-column w-full justify-content-start">
                        <p class="text text-xl font-semibold">{{ recipe.title }}</p>
                        <p class="text text-md font-semibold">Ingredients</p>
                        <div class="grid">
                            <div class="col-8 table-container">
                                <table class="table w-full justify-content-start">
                                    <thead>
                                        <tr>
                                            <th class="text-left font-semibold text-md ">Name</th>
                                            <th class="text-left font-semibold text-md">Price</th>
                                            <th class="text-left font-semibold text-md">Selected</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="ingredient in ingredients" :key="ingredient.name">
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
                                            <p class="text text-xl font-semibold">{{ calculateTotalPrice() }}</p>
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
                                                <p-Button label="Order" icon="pi pi-shopping-cart"  class="bg-indigo-400" @click="orderButton()"></p-Button>

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
        <div v-if="showSpinner2" class="spinner-overlay">
            <p-ProgressSpinner class="spinner" />
        </div>
    </div>
</template>

<script lang="ts">

import HeaderComp from '@/components/HeaderComp.vue';
import { ref,watch ,toRefs,reactive, onMounted} from 'vue';
import router from '@/router';
import {User} from '@/models/user';
import {getUser,findAllAvailableMarkets,findClosestMarket,order} from '@/services/userService';
import {fetchRecipe,compareMarketPrices,convertReicpeToMarketIngredients} from '@/services/recipeService';
import {Recipe} from '@/models/recipe';
import {Market} from '@/models/market';
import {Order} from '@/models/order';
import { MarketIngredient } from '@/models/marketIngredient';


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
        props: {
            recipeId: {
                type: Number,
                required: true,
            },
            userId: {
                type: Number,
                required: false,
            },
        },
    setup(props : any) {

        // datetime is default to now   
        const datetime12h = ref<Date>(new Date());
        const user = reactive<User>({id:0,created_at:''});
        const recipe = reactive<Recipe>({ingredients:[],id:0,cuisine:""});
        const ingredients = ref<MarketIngredient[]>([]);
        const { recipeId , userId } = toRefs(props);
        const currMarket = ref<Market>({
            name: 'AB',
            distance: 0,
        });


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
        const checkedNow = ref(true);

        const orderBy = ref([
            { name:"Price", value : "price" },
            { name:"Distance", value : "distance" }
        ])

        const superMarkets = ref([
            { name:"Lidl", value : "lidl" },
            { name:"AB", value : "ab" },
            { name:"Sklavenitis", value : "sklavenitis" },
            { name:"MyMarket", value : "mymarket"}
        ])

        const columns = ref([
            { field: 'name', header: 'Name' },
            { field: 'price', header: 'Price' },
            { field: 'selected', header: 'Selected' }
        ]);
        
        // Slected order by default is price
        const selectedOrderBy = ref(orderBy.value[0]);
        const selectedSuperMarket = ref(superMarkets.value[0]);
        const selectedIngredients = ref<MarketIngredient[]>([]);

        const visible = ref(false);
        const visibleConfirm = ref(false);
        const showSpinner = ref(false);
        const showSpinner2 = ref(false);



        watch(visibleConfirm, (newValue) => {
            if (newValue) {
                showSpinner.value = true;
                setTimeout(() => {
                    showSpinner.value = false;
                }, 4000); // Show spinner for 4 seconds
            }
        });


        const card = ref<Card>({
            cardholderName: 'test',
            cardNumber: '3333 - 3333 - 3333 - 3333',
            expirationDate: '12/23',
            securityCode: '123',
        });

        function returnHome() {
            visibleConfirm.value = false;
            visible.value = false;
            router.push('/home/'+userId.value);
        }
        

        function isSunday(date: { year: number, month: number, day: number, otherMonth: boolean }): boolean {
            const dayDate = new Date(date.year, date.month, date.day);
            return dayDate.getDay() === 0; // 0 is Sunday
        }
        
        onMounted(async () => {
            showSpinner2.value = true;  // Set loading state to true
            setTimeout(async () => {
                try {
                    if (userId.value) {
                        const fetchedUser = await getUser(props.userId);
                        Object.assign(user, fetchedUser);
                        const fetchedRecipe = await fetchRecipe(props.recipeId);
                        Object.assign(recipe, fetchedRecipe);
                        if (recipe.ingredients)
                            recipe.ingredients = removeDuplicateIngredients(recipe.ingredients);

                        const markets = await findAllAvailableMarkets(userId.value);
                        const cheapestMarket = await compareMarketPrices(recipeId.value, markets);
                        updateNewMarket(cheapestMarket);
                    }else {
                        const fetchedRecipe = await fetchRecipe(props.recipeId);
                        Object.assign(recipe, fetchedRecipe);
                        if (recipe.ingredients)
                            recipe.ingredients = removeDuplicateIngredients(recipe.ingredients);
                        const selectedMarket = new Market(currMarket.value.name, 0);
                        updateNewMarket(selectedMarket);
                    }
                } catch (error) {
                    console.error(error);
                }
                showSpinner2.value = false;
            }, 1000);
        });

        function updateSelectedMarket(market : Market) {
            if (market.name === 'Lidl') {
                selectedSuperMarket.value = superMarkets.value[0];
                return "Lidl";
            } else if (market.name === 'AB') {
                selectedSuperMarket.value = superMarkets.value[1]; 
                return "AB";
            } else if (market.name === 'Sklavenitis') {
                selectedSuperMarket.value = superMarkets.value[2];
                return "Sklavenitis";
            } else if (market.name === 'MyMarket') {
                selectedSuperMarket.value = superMarkets.value[3];
                return "MyMarket";
            }
            return market.name;
        }

        function removeDuplicateIngredients(ingredients : string[]): string[] {
            const uniqueIngredients = new Set(ingredients);
            return Array.from(uniqueIngredients);
        }

        function removeDuplicateMarketIngredients(ingredients : MarketIngredient[]): MarketIngredient[] {
            for (let i = 0; i < ingredients.length; i++) {
                for (let j = i + 1; j < ingredients.length; j++) {
                    if (ingredients[i].name === ingredients[j].name) {
                        ingredients[i].price = Math.min(ingredients[i].price, ingredients[j].price);
                        ingredients.splice(j, 1);
                    }
                }
            }
            return ingredients;
        }

        // !TODO: add real price calculation
        function calculateTotalPrice() {
            const result = selectedIngredients.value.reduce((acc, ingredient) => acc + ingredient.price, 0);
            return result.toFixed(2);
        }

        const updatingMarketFlag = ref(false);
        watch(selectedOrderBy, async (newValue) => {
            if (!userId.value) {
                alert('You need to be logged in order to find the closest/cheapeast market');
                return;
            }
            updatingMarketFlag.value = true;
            showSpinner2.value = true;  // Set loading state to true
            setTimeout(async () => {
                try {
                    if (newValue == orderBy.value[1]) {
                        const closestMarket = await findClosestMarket(userId.value);
                        updateNewMarket(closestMarket);
                    }else {
                        const markets = await findAllAvailableMarkets(userId.value);
                        const cheapestMarket = await compareMarketPrices(recipeId.value, markets);
                        updateNewMarket(cheapestMarket);
                    }
                } catch (error) {
                    console.error(error);
                }
                showSpinner2.value = false; 
            }, 1000); 
        });

        // function changeMarketToBasic(name : string) : string {
        //     if (name === 'Lidl') {
        //         return "Lidl";
        //     } else if (name === 'AB') {
        //         return "ΑΒ Βασιλόπουλος";
        //     } else if (name === 'Sklavenitis') {
        //         return "ΣΚΛΑΒΕΝΙΤΗΣ";
        //     } else if (name === 'MyMarket') {
        //         return "My market";
        //     }
        //     return name;
        // }

        watch(selectedSuperMarket, async (newValue) => {
            if (updatingMarketFlag.value) {
                updatingMarketFlag.value = false;
                return;
            }
            if (!userId.value) {
                const selectedMarket = new Market(newValue.name, 0);
                updateNewMarket(selectedMarket);
            }
            showSpinner2.value = true;  // Set loading state to true
            setTimeout(async () => {
                try {
                    const markets = await findAllAvailableMarkets(userId.value);
                    const selectedMarket = markets.find(market => market.name === newValue.name);
                    if (!selectedMarket){
                        alert('There is no '+ newValue.name + ' in 5km radius');
                        showSpinner2.value = false;
                        return;
                    }
                    updateNewMarket(selectedMarket);
                } catch (error) {
                    console.error(error);
                }
                showSpinner2.value = false; 
            }, 1000); 
        });

        async function updateNewMarket(newMarket : Market) {
            newMarket.name = updateSelectedMarket(newMarket);
            const marketIngredients = await convertReicpeToMarketIngredients(recipeId.value, newMarket.name);
            const marketIngredientsWithoutDuplicates = removeDuplicateMarketIngredients(marketIngredients);
            console.log(marketIngredientsWithoutDuplicates);
            ingredients.value = marketIngredientsWithoutDuplicates;
            selectedIngredients.value = ingredients.value;
            currMarket.value = newMarket;
        
        }

        async function orderButton() {
            if (!userId.value) {
                alert('You need to be logged in order to place an order');
                return;
            }
            if(!card.value.cardholderName || !card.value.cardNumber || !card.value.expirationDate || !card.value.securityCode) {
                alert('Please fill in all the fields');
                return;
            }
            const totalPrice = parseFloat(calculateTotalPrice());
            const stringDate = datetime12h.value.toISOString();
            const orderVal = new Order(user.id, recipe.id, currMarket.value.name, totalPrice,checkedNow.value, stringDate,"In Progress");
            var resp = await order(orderVal);
            visibleConfirm.value = true;
        }

        return { datetime12h , isSunday,user,checkedNow,
            orderBy,superMarkets,
            selectedOrderBy,selectedSuperMarket,
            recipe,selectedIngredients,
            columns,visible,card,visibleConfirm,
            returnHome,showSpinner,calculateTotalPrice,
            removeDuplicateIngredients,updateSelectedMarket,
            currMarket,ingredients,showSpinner2,updatingMarketFlag,orderButton
            };
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

    .table-container {
    max-height: 400px; /* Adjust the height as needed */
    overflow-y: auto;
    }

    .table-container table {
    width: 100%;
    border-collapse: collapse;
    }

    .table-container th, .table-container td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    }

    .table-container th {
    background-color: #f2f2f2;
    }

    .spinner-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999; /* Ensure it appears above all other content */
}

.spinner {
    z-index: 10000; /* Ensure it appears above the overlay */
}


</style>
