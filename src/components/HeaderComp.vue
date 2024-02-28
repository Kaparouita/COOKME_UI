<template>
    <div class="flex align-items-center justify-content-center h-8rem bg-white">
          <!-- Left Section: Logo and Address -->
          <!-- Logo-->
          <div class="flex align-items-center">
            <p-Button outlined class="w-10rem h-8rem bg-white border-none custom-button" @click="redirectToPage">
              <img src="@/assets/logo.png" alt="logo" width="100%" height="100%">
            </p-Button>
          <!-- Address -->
            <div class="flex align-items-center w-10rem">
              <i class="pi pi-map-marker text-xl"></i>
              <span class="text p-2">Address example</span>
            </div>
          </div>

          <!-- Center Section: Search Bar -->
          <div class="flex-grow-1 flex align-items-center justify-content-center">
            <i class="pi pi-search p-2"></i>
            <p-InputText placeholder="Search" class="surface-100 border-none custom-input"></p-InputText>
          </div>

          <!-- Right Section: User ID or Login / Register -->
          <div v-if="userId">
            <!-- Content when ID is present -->
            <router-link :to="`/profile/${userId}`" class="text-black no-color-change no-underline">
              <i class="pi pi-user text-xl"></i>
              <span class="text p-2">Stivaktakis Giorgos: {{ userId }}</span>
            </router-link>
          </div>
          <div v-else>
            <router-link to="/login" class="text-sm font-light p-4 no-color-change">Login / Register</router-link>
          </div>
        </div>
  </template>
  
  <script lang="ts">

  import router from '@/router';

  export default {
    name: 'HeaderComp',
    setup() {
        const redirectToPage = () => {
            router.push('/home');
        };
      return {
        redirectToPage
      };
    },
    props: {
      userId: {
        type: String,
        required: false,
      },
      userName: {
        type: String,
        required: false,
      },
    },
    methods: {
      // Your methods here
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
  .no-color-change {
  color: black; 
  }

  .no-color-change:visited,
  .no-color-change:hover,
  .no-color-change:active,
  .no-color-change:focus {
    color: black; 
  }

  .no-underline {
  text-decoration: none; /* This removes the underline */
  }

  .no-underline:hover {
    text-decoration: none; /* This ensures the underline doesn't appear on hover either */
  }

</style>
  