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
                    <p class="text text-xl font-semibold mb-1">Stivaktakis Giorgos</p> <!-- Adjusted margin-bottom -->
                    <p class="text text-md font-light mb-1">Astrologer</p> <!-- Adjusted margin-bottom -->
                    <p class="text text-md font-light">Athens, Greece</p>
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
                    <p-Button icon="pi pi-refresh" rounded raised />
                </div>
            </template>
            <p-Column field="name" header="Name"></p-Column>
            <p-Column header="Recipe">
                <template #body="slotProps">
                    <img :src="slotProps.data.image" alt="product" width="100" height="100" />
                </template>
            </p-Column>
            <p-Column field="order_number" header="Order Number"/>
            <p-Column field="address" header="Address"/>       
            <p-Column field="price" header="Price">
            </p-Column>
            <p-Column field="status" header="Status"/>
            <p-Column field="rating" header="Reviews">
                <template #body="slotProps">
                    <p-Rating :modelValue="slotProps.data.rating" readonly :cancel="false" 
                    v-tooltip.top="'You can only review Completed packages'" type="text" placeholder="Top"/>
                </template>
            </p-Column>
            <template #footer>  </template>
        </p-DataTable>
      </div>
    </div>
</template>

<script lang="ts">

import HeaderComp from '@/components/HeaderComp.vue';
import { useRoute } from 'vue-router';
import { onMounted, ref,reactive,toRefs } from 'vue';
import { User } from '@/models/user';
import { getUser } from '@/services/userService';

interface Order {
  id: number;
  order_number: string;
  address: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  status: string;
}

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
    var text = ref('Orders');
    const user = reactive<User>({});
    const { userId } = toRefs(props);

    var products = ref([
      {id: 1, name: 'Pizza', image: 'https://images.pexels.com/photos/4237243/pexels-photo-4237243.jpeg', 
      price: 10, order_number: '1234', address: 'Athens, Greece', rating: 4, status: 'Delivered'},
      {id: 2, name: 'Burger', image: 'https://images.pexels.com/photos/14883752/pexels-photo-14883752.jpeg',
      price: 5, order_number: '1235', address: 'Athens, Greece', rating: 3, status: 'Delivered'},
      {id: 3, name: 'Fries', image: 'https://images.pexels.com/photos/19062750/pexels-photo-19062750.jpeg',
      price: 3, order_number: '1236', address: 'Athens, Greece', rating: 5, status: 'Declined'},
      {id: 4, name: 'Hotdog', image: 'https://images.pexels.com/photos/4202381/pexels-photo-4202381.jpeg',
      price: 4, order_number: '1237', address: 'Athens, Greece', rating: 2, status: 'In Progress'},
      {id: 5, name: 'Ice Cream', image: 'https://images.pexels.com/photos/2983099/pexels-photo-2983099.jpeg',
      price: 2, order_number: '1238', address: 'Athens, Greece', rating: 4, status: 'Delivered'},
      {id: 6, name: 'Donut', image: 'https://images.pexels.com/photos/4033634/pexels-photo-4033634.jpeg',
      price: 1, order_number: '1239', address: 'Athens, Greece', rating: 3, status: 'Delivered'},
    ])

    const changeProducts = (type : string) => {
      text.value = type;
      // Change the products based on the type
    }

    onMounted(async () => {
      if (userId.value) {
        const fetchedUser = await getUser(props.userId);
        Object.assign(user, fetchedUser);
      }
    });

    return {products,text, changeProducts,user};
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
