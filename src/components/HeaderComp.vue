<template>
    <div class="flex align-items-center justify-content-center h-8rem bg-white">
          <!-- Left Section: Logo and Address -->
          <!-- Logo-->
          <div class="flex align-items-center">
            <p-Button outlined class="w-10rem h-8rem bg-white border-none custom-button" @click="redirectToPage">
              <img src="@/assets/logo.png" alt="logo" width="100%" height="100%">
            </p-Button>
          <!-- Address -->
            <div v-if="address">
              <div class="flex align-items-center w-10rem">
                <i class="pi pi-map-marker text-xl"></i>
                <span class="text p-2">{{ address }}</span>
              </div>
            </div>
            <div v-else>
              <div class="flex align-items-center w-10rem">
                <i class="pi pi-map-marker text-xl"></i>
                <span class="text p-2">Location</span>
              </div>
            </div>
          </div>

          <!-- Center Section: Search Bar -->
          <div class="flex-grow-1 flex align-items-center justify-content-center">
            <p-AutoComplete 
              placeholder="Search" 
              class="surface-100 border-none custom-input"
              v-model="currWord" 
              :suggestions="autoCompleteSuggestions" 
              @complete="search"
              field="keyword"
            >
              <template #itemTemplate="slotProps">
                <div @click="handleSuggestionClick(slotProps.item)">
                  {{ slotProps.item.keyword }}
                </div>
              </template>
            </p-AutoComplete>
            <p-Button outlined icon="pi pi-search" @click="handleSuggestionClick(currWord)">
            </p-Button>
          </div>

          <!-- Right Section: User ID or Login / Register -->
            <div v-if="username">
              <div class="flex gap-4">
                <!-- Content when ID is present -->
                <router-link :to="`/profile/${userId}`" class="text-black no-color-change no-underline">
                  <i class="pi pi-user text-xl mt-2"></i>
                  <span class="text p-2">{{ username }}</span>
                </router-link>
                  <p-Button icon="pi pi-sign-out" @click="logout" class="text-black no-color-change no-underline" rounded/>
              </div>
            </div>
            <div v-else>
              <router-link to="/login" class="text-sm font-light p-4 no-color-change">Login / Register</router-link>
            </div>
        </div>
  </template>
  
  <script lang="ts">

  import router from '@/router';
  import { onMounted, ref, watch,toRefs,reactive  } from 'vue';
  import {getAllKeywords} from '@/services/searchKeywords';
  import { useAuthStore } from '@/stores/auth';
  

  export default {
    name: 'HeaderComp',
    props: {
      username: {
        type: String,
        default: ''
      },
      address: {
        type: String,
        default: ''
      },
      userId:{
        type: Number,
        default: 0
      }
    },
    setup(props : any) {
      const currWord = ref('');
      const autoCompleteSuggestions = ref([]) as any;
      const suggestions = ref([]) as any;
      const { username, address } = toRefs(props);
      const trimedAddress = address.value.split(',')[0] + ', ' + address.value.split(',')[1];

      const authStore = useAuthStore();
      // get user id from path home/:id
      const userId = router.currentRoute.value.params.userId;
      console.log(userId);

      const redirectToPage = () => {
        router.push('/home/'+userId);
      };

      const search = (event: any) => {
        setTimeout(() => {
          if (!event.query.trim().length) {
            autoCompleteSuggestions.value = [...suggestions.value];
          } else {
            autoCompleteSuggestions.value = suggestions.value.filter((suggestion: any) => {
              return suggestion.keyword.toLowerCase().startsWith(event.query.toLowerCase());
            });
          }
        }, 250);
      };

      const handleSuggestionClick = (suggestion: any) => {
        if(suggestion) {
          var keyword = suggestion.keyword;
          console.log(keyword);
          if(userId)
            router.push({ path: '/home/'+userId, query: {keyword} });
          else
            router.push({ path: '/home', query: {keyword} });
        }
      };

      onMounted(async () => {
        suggestions.value = await getAllKeywords();
        //if user id from props ihttps://primevue.org/checkbox/s present, get user's keywords
      });

      const logout = () => {
        authStore.logout();
        router.push('/login');
      };

      return {
        currWord,
        autoCompleteSuggestions,
        suggestions,
        redirectToPage,
        search, handleSuggestionClick,
        trimedAddress,logout
      };
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
  