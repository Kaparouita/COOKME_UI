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
            <div class="flex  h-auto justify-content-end">
              <TabMenu :model="items" :activeIndex="activeIndex" @tab-change="onTabChange" />
            </div>
            <div v-show="activeIndex === 0" class="w-full panels">
              <!-- Content for the first tab -->
                <form class="w-full h-full flex flex-column gap-5 justify-content-center align-items-center">
                  <div class="p-fluid flex flex-column gap-5">
                    <h1 class="text text-4xl font-bold">Login</h1>
                    <div class="p-field flex flex-column gap-3">
                      <label for="username" class="text text-xl">Username</label>
                      <p-InputText id="username" v-model="username" />
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
              <form class="w-full h-full flex flex-column gap-5 justify-content-center align-items-center">
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
                    <p-InputText id="address" v-model="address" />
                  </div>
                </div>
                <p-Button type="submit" label="Sign up" class="bg-purple-500 border-purple-600" rounded/>
              </form>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import TabMenu from 'primevue/tabmenu';
import router from '@/router';

export default {
  components: {
    TabMenu,
  },
  setup() {
    const activeIndex = ref(0);
    const items = ref([
      { label: 'Login', icon: 'pi pi-fw pi-user' },
      { label: 'Register', icon: 'pi pi-fw pi-book' },
    ]);

    const onTabChange = (e: any) => {
      activeIndex.value = e.index;
    };

    return { items, activeIndex, onTabChange };
  },

  data() {
    var username = null;
    var password = null;
    var email = null;
    var address = null;

    var checked = false;


    return {
      username,password,
      email,address,
      checked
    }
  },
};
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

</style>