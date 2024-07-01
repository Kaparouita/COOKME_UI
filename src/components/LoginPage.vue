<template>
  <div class="body h-auto w-full">
    <div class="grid grid-nogutter -m-2">
      <div class="col-6">
        <div class="flex bg-purple-500 h-screen w-full align-items-center justify-content-center"> 
          <img src="../assets/girl-and-astro2.png" alt="Login" class="flex h-screen w-full"/>
        </div>
      </div>
      <div class="col-6">
        <div class="card h-full surface-200">
          <div class="flex h-auto justify-content-end">
            <TabMenu :model="items" :activeIndex="activeIndex" @tab-change="onTabChange" />
          </div>
          <div v-show="activeIndex === 0" class="w-full panels">
            <!-- Content for the first tab -->
            <form class="w-full h-full flex flex-column gap-5 justify-content-center align-items-center" @submit.prevent="onLogin">
              <div class="p-fluid flex flex-column gap-5">
                <h1 class="text text-4xl font-bold">Login</h1>
                <div class="p-field flex flex-column gap-3">
                  <label for="email" class="text text-xl">Email</label>
                  <p-InputText id="email" v-model="email" />
                </div>
                <div class="p-field flex flex-column gap-3">
                  <label for="password" class="text text-xl">Password</label>
                  <div class="p-field flex flex-column gap-3">
                    <p-Password id="password" v-model="password" :feedback="false" />
                    <div class="flex p-field-checkbox">
                      <p-Checkbox v-model="checked" inputId="binary" class="text text-md" />
                      <label for="binary" class="text text-md ml-1">Remember me</label>
                      <router-link to="/forgot-password" class="text text-md font-light ml-3">Forgot password?</router-link>
                    </div>
                  </div>
                </div>
              </div>
              <p-Button type="submit" label="Sign in" class="bg-purple-500 border-purple-600" rounded/>
            </form>
          </div>
          <div v-show="activeIndex === 1" class="w-full panels">
            <!-- Content for the second tab -->
            <form class="w-full h-full flex flex-column gap-5 justify-content-center align-items-center" @submit.prevent="onRegister">
              <div class="p-fluid flex flex-column gap-3">
                <h1 class="text text-4xl font-bold">Register</h1>
                <div class="p-field flex flex-column gap-2">
                  <label for="username" class="text text-xl">Username</label>
                  <p-InputText id="username" v-model="username" />
                </div>
                <div class="p-field flex flex-column gap-2">
                  <label for="email" class="text text-xl">Email</label>
                  <p-InputText id="email" v-model="email" />
                </div>
                <div class="p-field flex flex-column gap-2">
                  <label for="password" class="text text-xl">Password</label>
                  <p-Password id="password" v-model="password" />
                </div>
                <div class="p-field flex flex-column gap-2">
                  <label for="address" class="text text-xl">Address</label>
                  <p-InputText id="address" v-model="address" 
                    v-tooltip.top="'Address, Town, Country'" type="text" placeholder="Top">
                  </p-InputText>
                </div>
              </div>
              <p-Button type="submit" label="Sign up" class="bg-purple-500 border-purple-600" rounded />
            </form>

            <Dialog header="Select Location" v-model:visible="showMap" modal :draggable="false">
              <GMapMap
                :center="center"
                :zoom="16"
                map-type-id="terrain"
                style="width: 30rem; height: 30rem;"
                @click="onMapClick"
              >
                <GMapMarker v-if="markerPosition" :position="markerPosition" />
              </GMapMap>
              <template #footer>
                <p-Button label="Confirm" icon="pi pi-check" @click="confirmLocation" />
              </template>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import TabMenu from 'primevue/tabmenu';
import Dialog from 'primevue/dialog';
import GMapMap from 'vue3-google-map'; // Make sure to import correctly
import { loadGoogleMaps } from '@/services/loadGoogleMaps';
import { createUser,getUser,checkLogin,getUserByEmail } from '@/services/userService';
import {User } from '@/models/user';
import { LoginResponse } from '@/models/loginResponse';
import router from '@/router';

export default defineComponent({
  name: 'RegistrationComponent',
  components: {
    TabMenu,
    Dialog,
    GMapMap
  },
  setup() {
    const activeIndex = ref(0);
    const items = ref([
      { label: 'Login', icon: 'pi pi-fw pi-user' },
      { label: 'Register', icon: 'pi pi-fw pi-book' },
    ]);
    const username = ref('');
    const password = ref('');
    const email = ref('');
    const address = ref('Spartis 6, Heraklion, Crete, Greece');
    const showMap = ref(false);
    const latitude = ref(null) as any;
    const longitude = ref(null) as any;
    const checked = ref(false);
    const API_KEY = 'AIzaSyCULKAWrNKbSkXtFx74rn80_sZpOlc4R7U';  // Replace with your actual API key
    const center = ref({ lat: 35.316022927650415, lng: 25.14437297990114 });

    
    const onTabChange = (e: any) => {
      activeIndex.value = e.index;
    };

    const onRegister = async () => {
      if (!address.value.trim()) {
        alert('Please enter a valid address.');
        return;
      }
      try {
        const googleMaps = await loadGoogleMaps(API_KEY);
        const geocoder = new googleMaps.Geocoder();
        geocoder.geocode({ address: address.value }, (results : any, status : any) => {
          if (status === 'OK') {
            center.value = {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng()
            };
            showMap.value = true;
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
      } catch (error) {
        console.error('Error loading Google Maps:', error);
      }
    };

    const markerPosition = ref(null) as any;

    const onMapClick = (event: any) => {
      const latLng = event.latLng;
      markerPosition.value = { lat: latLng.lat(), lng: latLng.lng() };
    };

    const confirmLocation = async () => {
      if (markerPosition.value) {
        latitude.value = markerPosition.value.lat;
        longitude.value = markerPosition.value.lng;
        showMap.value = false; // Hide the map after confirming the location
        console.log('Selected location:', markerPosition.value);
        if(checkRegisterValues()) {
          const newUser = new User(username.value,  password.value, email.value,address.value,latitude.value, longitude.value);
          var resp = await createUser(newUser);
          console.log('User created:', resp);
          if(resp) {
            alert('User created successfully');
          } else {
            alert('User creation failed');
            console.log('User creation failed',resp);
          }
        }
      }
    };

    const checkRegisterValues = () => {
      if (!username.value.trim() || !email.value.trim() || !password.value.trim() || !address.value.trim()){
        alert('Please fill in all fields.');
        return false;
      }
      return true;
    };

    const hideMap = () => {
      showMap.value = false;
    };

    const onLogin = async () => {
      var loginResponse = new LoginResponse(email.value, password.value);
      var resp = await checkLogin(loginResponse);
      if(resp.status_code == 200) {
         
         var user = await getUserByEmail(email.value);
         // navigate to /home/:userId
         router.push({ path: '/home/'+user.id });
      } else {
        alert('Login failed');
        console.log('Login failed',resp);
      }
    };

    return {
      activeIndex,
      items,
      username,
      password,
      email,
      address,
      showMap,
      latitude,
      longitude,
      checked,
      API_KEY,
      center,
      onTabChange,
      onRegister,
      onLogin, markerPosition, onMapClick, confirmLocation, hideMap
    };
  }
});
</script>


<style>

.p-tabmenu .p-tabmenu-nav .p-tabmenuitem.p-highlight .p-menuitem-link {
    color: white !important; /* Use !important to override default styles */
    background-color: var(--purple-500) !important; /* Use !important to override default styles */
}

.p-tabmenu .p-tabmenu-nav .p-tabmenu-ink-bar {
  background-color: var(--purple-500) !important; /* Use !important to override default styles */
}

.panels {
  height: 90%;
}

.map {
  height: 100%;
  width: 100%;
}

</style>