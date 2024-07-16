<template>
    <div class="header">
      <div class="grid grid-nogutter -m-2 shadow-bottom w-full h-auto bg-white">
            <!-- Top Grid-->
            <div class="col-12">
                <HeaderComp  :username="user.username" :address="user.address"/>
            </div>
            <div class="col-12">
              <div class="flex justify-content-between align-items-center flex-row">
                <div class="flex profile flex-row">
                  <div class="w-13rem h-13rem bg-white ml-7 border-none">
                    <img src="@/assets/profile-astro.png" alt="logo" width="100%" height="100%">
                  </div>
                  <div class="flex flex-column mt-5 justify-content-start">
                    <p class="text text-xl font-semibold mb-1">{{ user.username }}</p> <!-- Adjusted margin-bottom -->
                    <p class="text text-md font-light mb-1">Astrologer</p> <!-- Adjusted margin-bottom -->
                    <p class="text text-md font-light">{{ user.address }}</p>
                  </div>
                </div>
                <div class="w-20rem h-20rem bg-white border-none mr-7 ">
                  <img src="@/assets/airballon-astro.png" alt="logo" width="100%" height="100%">
                </div>
                <div class="flex flex-column gap-3 buttons mr-7">
                  <p-Button label="Orders" icon="pi pi-box" class="bg-purple-500 border-none" rounded @click="changeProducts('Orders')"/>
                  <p-Button label="Favorites" icon="pi pi-heart" class="border-none" rounded @click="changeProducts('Favorites')"/>
                  <p-Button label="Reviews" icon="pi pi-star" class="bg-purple-500 border-none" rounded @click="changeProducts('Reviews')"/>
                </div>
              </div>
            </div>
        </div>
    </div>
    <div class="body h-full w-full surface-300">
      <div class="card surface-300">
        <p-DataTable :value="products" tableStyle="min-width: 50rem">
            <template #header>
                <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                    <span class="text-xl text-900 font-bold">{{ text}}</span>
                    <p class="text-md font-light">  In total there are {{ products ? products.length : 0 }} products. </p>
                    <p-Button icon="pi pi-refresh" rounded raised @click="changeProducts(text)" />
                </div>
            </template>
            <p-Column field="name" header="Name"></p-Column>
            <p-Column header="Recipe">
                <template #body="slotProps">
                    <img :src="slotProps.data.image" alt="product" width="100" height="100" />
                </template>
            </p-Column>
            <div v-if="text == 'Orders'">     
              <p-Column field="address" header="Address"/>       
              <p-Column field="price" header="Price"/>
              <p-Column field="status" header="Status"/>
              <p-Column field="rating" header="Review">
                  <template #body="slotProps">
                    <div v-if="slotProps.data.status == 'Completed'">
                      <p-Rating v-model="slotProps.data.rating"
                        @click="addTheReview(slotProps.data.id, slotProps.data.rating)" :cancel="false"
                      v-tooltip.top="'You can review this Recipe!'" type="text" />
                    </div>
                    <div v-else>
                      <p-Rating v-model="slotProps.data.rating" readonly :cancel="false" 
                      v-tooltip.top="'You can only review Completed packages'" type="text" placeholder="Top"/>
                    </div>
                  </template>
              </p-Column>        
              <p-Column field="favorite" header="Favorite">
                <template #body="slotProps">
                    <div v-if="slotProps.data.favorite">
                      <p-Button icon="pi pi-heart-fill" v-tooltip.top="'Remove from Favorites!'" class="bg-pink-700 border-none" rounded @click="removeFavorite(slotProps.data.id)"/>
                    </div>
                    <div v-else>
                      <p-Button icon="pi pi-heart" v-tooltip.top="'Add to Favorites!'" class="bg-pink-700 border-none" rounded @click="addToFavorites(slotProps.data.id)"/>
                    </div>
                    </template>
              </p-Column>
              <p-Column field="statusAction" header="Action">
                <template #body="slotProps">
                  <div v-if="slotProps.data.status == 'In Progress'">
                    <p-Button icon="pi pi-times" v-tooltip.top="'Cancel your Order!'" severity="danger" class="border-none" rounded @click="cancelOrder(slotProps.data.id)" />
                  </div>
                  <div v-else-if="slotProps.data.status == 'Completed'">
                    <p-Button icon="pi pi-check" v-tooltip.top="'Order Completed!'" severity="success" class="border-none" rounded />
                  </div>
                  <div v-else>
                    <p-Button icon="pi pi-times" v-tooltip.top="'Order Declined!'" severity="info" class="border-none" rounded disabled/>
                  </div>
                </template>
              </p-Column>
              <p-ConfirmDialog></p-ConfirmDialog>
            </div>
            <div v-else-if="text == 'Favorites'">
              <p-Column field="cuisine" header="Cuisine"/>
              <p-Column field="description" header="Description"/>
              <p-Column field="skill_level" header="Skill Level"/>
              <p-Column field="post_date" header="Post Date"/>
              <p-Column field="favorite" header="Favorite">￼
                ￼
                  <template #body="slotProps">
                    <div v-if="slotProps.data.favorite">
                      <p-Button icon="pi pi-heart-fill" v-tooltip.top="'Remove from Favorites!'" class="bg-pink-700 border-none" rounded @click="removeFavorite(slotProps.data.id)"/>
                    </div>
                    <div v-else>
                      <p-Button icon="pi pi-heart" v-tooltip.top="'Add to Favorites!'" class="bg-pink-700 border-none" rounded @click="addToFavorites(slotProps.data.id)"/>
                    </div>
                    </template>
              </p-Column>
            </div>
            <div v-else-if="text == 'Reviews'">
              <p-Column field="cooking_time" header="Cooking Time"/>
              <p-Column field="prep_time" header="Preparation Time"/>
              <p-Column field="protein" header="Protein"/>
              <p-Column field="calories" header="Calories"/>
              <p-Column field="serves" header="Serves"/>
              <p-Column field="rating" header="Review">
                <template #body="slotProps">
                    <div v-if="slotProps.data.status == 'Completed'">
                      <p-Rating v-model="slotProps.data.rating"
                        @click="addTheReview(slotProps.data.id, slotProps.data.rating)" :cancel="false"
                      v-tooltip.top="'You can review this Recipe!'" type="text" />
                    </div>
                    <div v-else>
                      <p-Rating v-model="slotProps.data.rating" readonly :cancel="false" 
                      v-tooltip.top="'You can only review Completed packages'" type="text" placeholder="Top"/>
                    </div>
                  </template>
              </p-Column>
            </div>
            <template #footer>  </template>
        </p-DataTable>
        <p-Toast />
      </div>
    </div>
</template>

<script lang="ts">

import HeaderComp from '@/components/HeaderComp.vue';
import { useConfirm } from "primevue/useconfirm";
import { onMounted, ref,reactive,toRefs } from 'vue';
import { User } from '@/models/user';
import { getUser } from '@/services/userService';
import { fetchRecipe } from '@/services/recipeService';
import { useToast } from "primevue/usetoast";
import {getProfileRecipes,addFavoriteRecipe,getReviewsByUserID,getFavoriteRecipes,addReview,removeFavoriteRecipe
  ,removeOrder
} from '@/services/userService';
import { ProfileRecipeResponse } from '@/models/profileResponse';
import { Recipe } from '@/models/recipe';
import { Review } from '@/models/review';

export default  {
  name: 'ProfilePage',

  components: {
    HeaderComp,
  },
  props: {
    userId: {
      type: Number,
      required: true,
    },
  },

  setup(props: any) {
    const toast = useToast();

    var text = ref('Orders');
    const user = reactive<User>({id:0,created_at:''});
    const { userId } = toRefs(props);

    var products = ref<any[]>([]);

    const changeProducts = (type : string) => {
      text.value = type;
      if (type == 'Orders') {
        getOrdersProducts().then((resp) => {
          products.value = resp;
        });
      } else if (type == 'Favorites') {
        getFavoriteProducts().then((resp) => {
          products.value = resp;
        });
      } else if (type == 'Reviews') {
        getReviewProducts().then((resp) => {
          products.value = resp;
        });
      }
      console.log("Products : ", products);
    }

    async function getReviewProducts(){
      var resp = await getReviewsByUserID(user.id);
      if (resp == null) {
        return [];
      }
      var reviewRecipes = [];
      for (var i = 0; i < resp.length; i++) {
        var recipe = await fetchRecipe(resp[i].recipe_id);
        reviewRecipes.push({
          id: recipe.id,
          name: trimString(recipe.title?recipe.title:'', 25),
          image: recipe.image,
          price:  trimString(recipe.cuisine?recipe.cuisine:'', 10),
          rating: resp[i].rating,
          favorite: false,
          cooking_time : recipe.cooking_time,
          prep_time : recipe.prep_time,
          protein : recipe.nutrition_info.protein,
          calories : recipe.nutrition_info.kcal,
          serves : recipe.serves
        });
      }

      var reviewProducts = reviewRecipes.map((product: any) => {
        return {
          id: product.id,
          name: product.name,
          image: product.image,
          cuisine: product.cuisine,
          address: user.address,
          rating: product.rating,
          status : 'Completed',
          favorite: false,
          cooking_time : product.cooking_time,
          prep_time : product.prep_time,
          protein : product.protein,
          calories : product.calories,
          serves : product.serves

        }
      });
      
      return reviewProducts;
    }
    function decodeDate(timestamp :string) {
      let fullTimestamp = parseInt(timestamp) * 1000;
      let date = new Date(fullTimestamp);
      return date.toLocaleDateString(); 
    }
    async function getFavoriteProducts(){
      var resp = await getFavoriteRecipes(user.id);
      if (resp == null) {
        return [];
      }
      var favProducts  = resp.map((product: Recipe) => {
        const date = decodeDate(product.post_dates?product.post_dates:'');
        return {
          id: product.id,
          name: trimString(product.title?product.title:'', 20),
          image: product.image,
          cuisine: trimString(product.cuisine?product.cuisine:'', 10),
          description: trimString(product.description?product.description:'', 30),
          favorite: true,
          skill_level: product.skill_level,
          post_date: date
        }
      });
      return favProducts;
    }

    async function getOrdersProducts(){
      var resp = await getProfileRecipes(user.id);
      if (resp == null) {
        return [];
      }
      var orderProducts = resp.map((product: ProfileRecipeResponse) => {
        return {
          id: product.recipe_id,
          name: trimString(product.recipe_name?product.recipe_name:'', 10),
          image: product.recipe_image,
          price: product.total_price,
          address: trimString(user.address?user.address:'', 10),
          status: product.order_status,
          rating: product.review.rating,
          favorite: product.is_favorite
        }
      });
      return orderProducts;
    }

    function trimString(str: string, length: number) {
      return str.length > length ? str.substring(0, length) + '...' : str;
    }

    onMounted(async () => {
      if (userId.value) {
        const fetchedUser = await getUser(props.userId);
        Object.assign(user, fetchedUser);
      }
      changeProducts('Orders');
    });


    const confirm = useConfirm() as any;

    const cancelOrder = (recipe_id: number) => {
      confirm.require({
          message: 'Are you sure you want to cancel this order?',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          rejectProps: {
              label: 'No',
              severity: 'secondary',
              outlined: true
          },
          acceptProps: {
              label: 'Yes'
          },
          accept:async () => {
              var resp = await removeOrder(recipe_id,user.id);
              if (resp.status_code == 200) {
                const product = products.value.find((product: any) => product.id === recipe_id);
                if (product) {
                  product.status = 'Declined';
                  toast.add({ severity: 'success', summary: 'Success', detail: 'Order canceled', life: 3000 });
                }
              } else {
                toast.add({ severity: 'error', summary: 'Error', detail: 'Order could not be canceled', life: 3000 });
              }
          },
          reject: () => {
              toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
          }
      });
    };


    async function addToFavorites(id: number) {
      var resp = await addFavoriteRecipe(user.id, id);
      if (resp) {
        const product = products.value.find((product: any) => product.id === id);
        if (product) {
          product.favorite = true;
          toast.add({ severity: 'success', summary: 'Success', detail: 'Recipe added to Favorites', life: 3000 });
        }
      }else {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Recipe could not be added to Favorites', life: 3000 });
      }
    }

    async function addTheReview(id: number, rating: number) {
      const review = new Review(id, user.id,'', rating);
      var resp = await addReview(review);
      if (resp.status_code == 200) {
        toast.add({ severity: 'success', summary: 'Success', detail: 'Review added', life: 3000 });
      } else {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Review could not be added', life: 3000 });
      }

    }

    async function removeFavorite(id: number) {
      var resp = await removeFavoriteRecipe(user.id, id);
      if (resp) {
        const product = products.value.find((product: any) => product.id === id);
        if (product) {
          product.favorite = false;
          toast.add({ severity: 'success', summary: 'Success', detail: 'Recipe removed from Favorites', life: 3000 });
        }
      } else {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Recipe could not be removed from Favorites', life: 3000 });
      }
    }

    return {products,text, changeProducts,user, cancelOrder, addToFavorites, addTheReview, removeFavorite};
  },
  

}
</script>

<style scoped>

  .shadow-bottom {
    box-shadow: 0 1rem 6rem rgba(0, 0, 0, 0.2);
    size: 3rem;
    position: fixed;
    z-index: 2;
  }

  .body {
    padding-top: 27rem;
  }
</style>
