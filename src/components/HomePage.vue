<template>
  <div class="body h-auto w-full  surface-200">
    <div class="grid grid-nogutter -m-2">
      <!-- Top Grid -->
      <div class="col-12 shadow-bottom">
        <HeaderComp  />
      </div>

      <!-- Bottom Grids -->

      <!-- Left Grid -->
      <div class="col-3">
        <div class="flex align-items-center surface-300 justify-content-center left-grid fixed"> 
          <p-ScrollPanel style="width: 100%; height: 100%" class="p-scrollpanel" >
            <div class="card flex justify-content-center">
              <div class="flex flex-column gap-3">
                <p class="text text-xl font-bold">Cousines</p>
                <div v-for="cousine of cousines" :key="cousine.key" class="flex align-items-center">
                    <p-Checkbox v-model="selectedCousines" :inputId="cousine.key" name="cousine" :value="cousine.name" />
                    <label :for="cousine.key" class="ml-3" >{{ cousine.name }} </label>
                </div>
                <p class="text text-xl font-bold">OrderBy</p>
                <div v-for="item in orderBy" :key="item.key" class="flex align-items-center">
                  <p-RadioButton v-model="selectedOrderBy" :inputId="item.key" name="dynamic" :value="item.name" />
                  <label :for="item.key" class="ml-2">{{ item.name }}</label>
                </div>
              </div>
            </div>
          </p-ScrollPanel>
        </div>
      </div>

      <!-- Right Grid -->
      <div class="col-9">
        <div :class="{'h-screen': isFullHeight, 'h-auto': !isFullHeight}" class= "right-grid">
          <div class="flex justify-content-start align-items-start h-full">
            <!-- icons -->
            <div class="grid">
              <div class="col-12">
              <div class="flex justify-content-start flex-row flex-wrap h-auto p-6">
                <div class="flex flex-column align-items-center">
                  <p-Button outlined class="w-9rem border-none pizza-button">
                    <img src="@/assets/pizza.png" alt="pizza" width="100%" height="100%">
                  </p-Button>
                  <label for="pizza-button" class="text-xl font-light font-italic">Pizza</label>
                </div>
                <div class="flex flex-column align-items-center">
                  <p-Button outlined class="w-9rem border-none fish-button">
                    <img src="@/assets/fish.png" alt="fish" width="100%" height="100%">
                  </p-Button>
                  <label for="fish-button" class="text-xl font-light font-italic">Fish</label>
                </div>
                <div class="flex flex-column align-items-center">
                  <p-Button outlined class="w-9rem border-none pork-button">
                    <img src="@/assets/pork.png" alt="pork" width="100%" height="100%">
                  </p-Button>
                  <label for="pork-button" class="text-xl font-light font-italic">Pork</label>
                </div>
                <div class="flex flex-column align-items-center">
                  <p-Button outlined class="w-9rem border-none cocktail-button">
                    <img src="@/assets/cocktail.png" alt="cocktail" width="100%" height="100%">
                  </p-Button>
                  <label for="cocktail-button" class="text-xl font-light font-italic">Cocktail</label>
                </div>
                <div class="flex flex-column align-items-center">
                  <p-Button outlined class="w-9rem border-none quick-button">
                    <img src="@/assets/quick.png" alt="quick" width="100%" height="100%">
                  </p-Button>
                  <label for="quick-button" class="text-xl font-light font-italic">Quick</label>
                </div>
              </div>
            </div>
            <!-- Recipes -->
            <div class="col-12">
              <div class="flex align-items-start recipes ml-8">
                <div class="flex flex-column gap-3">
                <p class="text text-xl font-bold">Recipes {{ images.length }}</p>
                <div class="grid w-full align-items-start">
                  <div 
                    class="col-12 lg:col-6" 
                    v-for="(image) in images" 
                    :key="image.title" 
                  >
                  <p-Card 
                    style="width: 18rem; height: 20rem; overflow: hidden"
                  >
                    <template #header>
                      <p-Button outlined class="w-18rem h-12rem border-none card-button">
                        <img :alt="image.title" :src="image.url" class="w-full h-full"/>
                      </p-Button>
                    </template>

                    <template #title>
                      <div class="flex justify-content-between flex-row align-items-center">
                        <span class="text">{{ image.title }}</span>
                        <p-Rating v-model="image.rating" readonly :cancel="false" />
                      </div>
                    </template>

                    <template #content>
                      <div class="flex flex-column align-items-start">
                        <div class="flex flex-row justify-content-between w-full">
                          <span class="text text-xs">Type · {{ image.courseType }}</span>
                          <div class="flex flex-row gap-3">
                            <i class="pi pi-clock"></i>
                            <span class="text text-xs">{{ image.cookTime }}</span>
                          </div>
                        </div>
                        <div class="flex flex-row justify-content-between w-full">
                          <span class="text text-xs">Calories · {{ image.calories }}</span>
                          <span class="text text-xs">Level · {{ image.skillLevel }}</span>
                        </div>
                      </div>
                    </template>
                  </p-Card>
                </div>
                </div>
              </div>
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

import { defineComponent, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import HeaderComp from '@/components/HeaderComp.vue';


export default defineComponent({
  
  components: {
    HeaderComp
  },

  name: 'HomePage',

  setup() {
    const username = "Stivaktakis Giorgos";
    const route = useRoute();
    const router = useRouter();
    const userId = computed(() => route.params.id);
    const cousines = ref([
      { name: "Italian", key: "Italian" },
      { name: "Greek", key: "Greek" },
      { name: "Mexican", key: "Mexican" },
      { name: "Chinese", key: "Chinese" },
      { name: "Japanese", key: "Japanese" },
      { name: "Indian", key: "Indian" },
      { name: "Thai", key: "Thai" },
      { name: "French", key: "French" },
      { name: "Spanish", key: "Spanish" },
      { name: "American", key: "American"},
    ]);
    const selectedCousines = ref([]);

    const orderBy = ref([
      { name: "Cook Time", key: "cookTime" },
      { name: "Rating", key: "rating" },
      { name: "Default", key: "default" },
      { name: "Calories", key: "calories"},
      { name: "Protein", key: "protein"},
      { name: "Skill Level", key: "skillLevel"},
      { name: "Course Type", key: "courseType"},
      { name: "Cook Time", key: "cookTime" },
      { name: "Rating", key: "rating" },
      { name: "Default", key: "default" },
      { name: "Calories", key: "calories"},
      { name: "Protein", key: "protein"},
      { name: "Skill Level", key: "skillLevel"},
      { name: "Course Type", key: "courseType"},
    ])
    const selectedOrderBy = ref([]);

    const images = ref([
      { title: "Pizza", url: "https://images.pexels.com/photos/4237243/pexels-photo-4237243.jpeg" ,cookTime: "30min",courseType: "Main Course",skillLevel: "Easy",rating : 5,calories: "200"},
      { title: "Fish", url: "https://images.pexels.com/photos/14883752/pexels-photo-14883752.jpeg", cookTime: "20min",courseType: "Main Course",skillLevel: "Easy",rating : 5,calories: "200"},
      { title: "Pork", url: "https://images.pexels.com/photos/19062750/pexels-photo-19062750.jpeg", cookTime: "20min",courseType: "Main Course",skillLevel: "Easy",rating : 4,calories: "200" },
      { title: "Cocktail", url: "https://images.pexels.com/photos/4202381/pexels-photo-4202381.jpeg", cookTime: "20min",courseType: "Main Course",skillLevel: "Easy",rating : 5,calories: "200" },
      { title: "Quick", url: "https://images.pexels.com/photos/2983099/pexels-photo-2983099.jpeg", cookTime: "20min",courseType: "Main Course",skillLevel: "Easy",rating : 5,calories: "200" },
      { title: "Pizza1", url: "https://images.pexels.com/photos/4033634/pexels-photo-4033634.jpeg", cookTime: "20min",courseType: "Main Course",skillLevel: "Easy",rating : 3,calories: "200" },
      { title: "Fish1", url: "https://images.pexels.com/photos/6605778/pexels-photo-6605778.jpeg", cookTime: "20min",courseType: "Main Course",skillLevel: "Easy",rating : 2,calories: "200" },
      { title: "Pork1", url: "https://images.pexels.com/photos/1321881/pexels-photo-1321881.jpeg", cookTime: "20min",courseType: "Main Course",skillLevel: "Easy",rating : 1,calories: "200" },
      { title: "Cocktail1", url: "https://images.pexels.com/photos/5907592/pexels-photo-5907592.jpeg", cookTime: "20min",courseType: "Main Course",skillLevel: "Easy",rating : 5,calories: "200" },
      { title: "Quick1", url: "https://images.pexels.com/photos/13111770/pexels-photo-13111770.jpeg", cookTime: "20min",courseType: "Main Course",skillLevel: "Easy",rating : 5,calories: "200" },
    ])


    const isFullHeight = ref(false);

    onMounted(() => {
      // Check if the content height is less than the viewport height
      const contentHeight = document.querySelector('.right-grid')?.clientHeight ?? 0;
      const viewportHeight = window.innerHeight;
      isFullHeight.value = contentHeight < viewportHeight;
    });

    const redirectToPage = () => {
      router.push('/home');
    };

    return { 
      userId, redirectToPage,
      cousines, selectedCousines,
      orderBy, selectedOrderBy,
      isFullHeight,images,
      username
    };
  }
});
</script>

<style>
.icons {
  /* height: 20%; */
  background-color: red;
}

.shadow-bottom {
  box-shadow: 0 1rem 6rem rgba(0, 0, 0, 0.2);
  size: 3rem;
  position: fixed;
  z-index: 2;
}

.no-color-change {
  color: black; 
}

.left-grid {
  padding-top: 8rem;
  height: 100vh;
  top: 0;  /* Adjust as necessary */
  left: 0; /* Adjust based on your layout */
  width: calc(25% - 1rem); /* Adjust the width as necessary, 30% as an example for col-3 */
  overflow-y: auto
}

.right-grid {
  padding-top: 8rem;
}

.p-scrollpanel .p-scrollpanel-bar{
  background-color: lightgrey;
}

.recipes {
  width: 80%;
}

.no-color-change:visited,
.no-color-change:hover,
.no-color-change:active,
.no-color-change:focus {
  color: black; 
}

</style>
