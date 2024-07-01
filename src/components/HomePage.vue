<template>
  <div class="body h-auto w-full  surface-200">
    <div class="grid grid-nogutter -m-2">
      <!-- Top Grid -->
      <div class="col-12 shadow-bottom">
        <HeaderComp :username="user.username" :address="user.address" :userId="user.id"/>
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
                    <p-Checkbox v-model="selectedCuisines" :inputId="cousine.key" name="cousine" :value="cousine.name"/>
                    <label :for="cousine.key" class="ml-3" >{{ cousine.name }} </label>
                </div>
                <p class="text text-xl font-bold">OrderBy</p>
                <div v-for="item in orderBy" :key="item.key" class="flex align-items-center">
                  <p-RadioButton v-model="selectedOrderBy" :inputId="item.key" name="dynamic" :value="item.name" onclick=""/>
                  <label :for="item.key" class="ml-2">{{ item.name }}</label>
                </div>
              </div>
            </div>
          </p-ScrollPanel>
        </div>
      </div>

      <!-- Right Grid -->
      <div class="col-9">
        <div :class="{'h-screen': isFullHeight, 'h-auto': !isFullHeight} " class= "right-grid ">
          <div class="flex justify-content-start align-items-start surface-200 h-auto">
            <!-- icons -->
            <div class="grid">
              <div class="col-12">
              <div class="flex justify-content-start flex-row flex-wrap h-auto p-6">
                <div class="flex flex-column align-items-center">
                  <p-Button outlined class="w-9rem border-none pizza-button" @click="getKeywordsButton('Pizza')">
                    <img src="@/assets/pizza.png" alt="pizza" width="100%" height="100%">
                  </p-Button>
                  <label for="pizza-button" class="text-xl font-light font-italic">Pizza</label>
                </div>
                <div class="flex flex-column align-items-center">
                  <p-Button outlined class="w-9rem border-none fish-button"  @click="getKeywordsButton('Fish')">
                    <img src="@/assets/fish.png" alt="fish" width="100%" height="100%">
                  </p-Button>
                  <label for="fish-button" class="text-xl font-light font-italic">Fish</label>
                </div>
                <div class="flex flex-column align-items-center">
                  <p-Button outlined class="w-9rem border-none pork-button" @click="getKeywordsButton('Pork')">
                    <img src="@/assets/pork.png" alt="pork" width="100%" height="100%">
                  </p-Button>
                  <label for="pork-button" class="text-xl font-light font-italic">Pork</label>
                </div>
                <div class="flex flex-column align-items-center">
                  <p-Button outlined class="w-9rem border-none cocktail-button" @click="getKeywordsButton('Cocktail')">
                    <img src="@/assets/cocktail.png" alt="cocktail" width="100%" height="100%">
                  </p-Button>
                  <label for="cocktail-button" class="text-xl font-light font-italic">Cocktail</label>
                </div>
                <div class="flex flex-column align-items-center" @click="getKeywordsButton('Quick')">
                  <p-Button outlined class="w-9rem border-none quick-button">
                    <img src="@/assets/quick.png" alt="quick" width="100%" height="100%">
                  </p-Button>
                  <label for="quick-button" class="text-xl font-light font-italic">Quick</label>
                </div>
                <div class="flex flex-column align-items-center" @click="removeFilters()">
                  <p-Button outlined class="w-9rem border-none remove-filter-button">
                    <img src="@/assets/filter-remove.png" alt="remove" width="100%" height="100%">
                  </p-Button>
                  <label for="remove-filter-button" class="text-xl font-light font-italic">Clear</label>
                </div>
              </div>
            </div>
            <!-- Recipes -->
            <div class="col-12">
              <div class="flex align-items-start recipes ml-8">
                <div class="flex flex-column gap-3">
                  <p class="text text-xl font-bold">Recipes {{ filteredRecipes?.length }}</p>
                  <div class="grid w-full align-items-start">
                    <div 
                      class="col-12 lg:col-6" 
                      v-for="(recipe) in displayedRecipes" 
                      :key="recipe.title" 
                    >
                      <p-Card style="width: 18rem; height: 20rem; overflow: hidden">
                        <template #header>
                          <p-Button outlined class="w-18rem h-12rem border-none card-button" @click="recipeButton(recipe)">
                            <img :alt="recipe.title" :src="recipe.image" class="w-full h-full"/>
                          </p-Button>
                        </template>

                        <template #title>
                          <div class="flex justify-content-between flex-row align-items-center">
                            <span class="text text-sm">{{ titleLength(recipe.title) }}</span>
                            <p-Rating v-model="recipe.ratings" readonly :cancel="false" />
                          </div>
                        </template>

                        <template #content>
                          <div class="flex flex-column align-items-start">
                            <div class="flex flex-row justify-content-between w-full">
                              <span class="text text-xs">Type · {{ getCourseType(recipe) }}</span>
                              <div class="flex flex-row gap-3">
                                <i class="pi pi-clock"></i>
                                <span class="text text-xs">{{ recipe.cooking_time }}</span>
                              </div>
                            </div>
                            <div class="flex flex-row justify-content-between w-full">
                              <span class="text text-xs">Calories · {{ recipe.nutrition_info.kcal}}</span>
                              <span class="text text-xs">Level · {{ recipe.skill_level }}</span>
                            </div>
                          </div>
                        </template>
                      </p-Card>
                    </div>
                  </div>
                  <div v-if="loading" class="loading">Loading...</div>
                  <div v-infinite-scroll="loadMore" class="scroll-anchor"></div>
                </div>
              </div>
            </div>
            <!-- recipes end  -->
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted ,watchEffect,toRefs,reactive} from 'vue';
import HeaderComp from '@/components/HeaderComp.vue';
import { fetchRecipe, deleteRecipe,getRecipes,getRecipesByCuisines,getRecipesByKeywords} from '@/services/recipeService';
import { searchKeywords } from '@/services/searchKeywords';
import { Recipe } from '@/models/recipe';
import { User } from '@/models/user';
import { getUser} from '@/services/userService';
import vInfiniteScroll from '@/services/v-infinite-scroll';

export default defineComponent({
  
  components: {
    HeaderComp
  },
  props: {
    userId: {
      type: Number,
      required: true,
    },
  },

  directives: {
    'infinite-scroll': vInfiniteScroll,
  },

  name: 'HomePage',

  setup(props: any) {
    var recipes = ref<Recipe[]>([]);
    const displayedRecipes = ref<Recipe[]>([]);
    var filteredRecipes = ref<Recipe[]>([]);
    const itemsPerPage = ref(10);
    const loading = ref(false);
    const isFullHeight = ref(false);
    const selectedCuisines = ref<string[]>([]);
    const selectedCuisinesString = computed(() => selectedCuisines.value.join(','));
    const { userId } = toRefs(props);
    const user = reactive<User>({});

    const route = useRoute();
    const router = useRouter();

    // Get the user id from the route params and turn it into number
    var keyword = ref(route.query.keyword || '').value.toString();

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

    const orderBy = ref([
      { name: "Default", key: "default" },
      { name: "Cook Time", key: "cookTime" },
      { name: "Rating", key: "rating" },
      { name: "Calories", key: "calories"},
      { name: "Protein", key: "protein"},
      { name: "Skill Level", key: "skillLevel"},
      // { name: "Course Type", key: "courseType"},
    ])
    const selectedOrderBy = ref("Default");

    const recipeButton = (recipe : Recipe) => {
      if (userId.value) {
        router.push({ path : '/checkout/'+ recipe.id +'/'+ userId.value});
      } else {
        router.push({ path : '/checkout' + '/'+ recipe.id});
      }
    };
   

    onMounted(async () => {
      if (userId.value) {
        const fetchedUser = await getUser(props.userId);
        Object.assign(user, fetchedUser);
        console.log("[LOG] User: ", user);
      }
      

      recipes.value = await getRecipes();
      filteredRecipes.value = recipes.value;
      
      if (keyword) {
        // Get the keyword from the route params and turn it into a string from a String object
        getKeywordsButton(keyword);
      } 

      const contentHeight = document.querySelector('.right-grid')?.clientHeight ?? 0;
      const viewportHeight = window.innerHeight;
      isFullHeight.value = contentHeight < viewportHeight;
    });

    

    const redirectToPage = () => {
      router.push('/home');
    };

    const titleLength = (title : any) => {
      if(title.length > 30){
        return title.slice(0,27)+"..."
      }
      return title
    };

    const updateOrderBy = computed(() => {
      var tempRecipes = filteredRecipes.value;
      const sortKey = selectedOrderBy.value;
      if (sortKey === 'Default') {
        return tempRecipes;
      } else if (sortKey === 'Calories') {
        return [...tempRecipes].sort((a, b) => (a.nutrition_info.kcal || 2000) - (b.nutrition_info.kcal || 2000));
      } else if (sortKey === 'Protein') {
        return [...tempRecipes].sort((a, b) => (a.nutrition_info.protein || 2000) - (b.nutrition_info.protein || 2000));  
      } else if (sortKey === 'Cook Time') {
        // Sort the recipes based on the cooking time
        // if cooking time is 0, it will be placed at the end
        return [...tempRecipes].sort((a, b) => (a.cooking_time || 2000) - (b.cooking_time || 2000));
      } else if (sortKey === 'Rating') {
        return [...tempRecipes].sort((a, b) => (b.ratings || 0) - (a.ratings || 0));
      }
      return tempRecipes;
    });

    const loadMore = () => {
      if (loading.value) return;
      loading.value = true;

      setTimeout(() => {
        const nextItems = filteredRecipes.value ? filteredRecipes.value.slice(displayedRecipes.value.length, displayedRecipes.value.length + itemsPerPage.value) : [];
        displayedRecipes.value.push(...nextItems);
        loading.value = false;
      }, 1000); // Simulate async loading
    };

    const getCourseType = (recipe : Recipe) => {
      return recipe.courses ? recipe.courses[0] : "N/A";
    }
    
    const updateDisplayedRecipes = () => {
      updateOrder();
      displayedRecipes.value = filteredRecipes.value.slice(0, itemsPerPage.value);
    };


    const updateOrder = () => {
      filteredRecipes.value = updateOrderBy.value;
    };

    const applyFilters = async () => {
      // Apply cuisine filters
      // console.log("[LOG] Applying filters to recipes: ",filteredRecipes.value.length);
      filteredRecipes.value = recipes.value;
      if (selectedCuisines.value.length !== 0) {
        // console.log("[LOG] Applying cuisine filters: ", selectedCuisines.value);
        filteredRecipes.value = await getRecipesByCuisines(selectedCuisines.value);
      }
      // Apply keyword filters
      if (keyword) {
        // console.log("[LOG] Applying keyword filter: ", keyword);
        let keywords = [];
        keywords = await searchKeywords(keyword);
        var recipesWithKeywords = await getRecipesByKeywords(keywords);
        filteredRecipes.value = matchCurrentRecipesWithKeywords(filteredRecipes.value ,recipesWithKeywords);
      }
      // console.log("[LOG] Filtered recipes: ", filteredRecipes.value.length) ;
      updateDisplayedRecipes();
    };


    const getKeywordsButton = (keyword : string) => {
      // clear current keyword and apply new one
      router.push({ query: { keyword } });
      // applyFilters();
    };

    const matchCurrentRecipesWithKeywords = (recipes : Recipe[],recipesWithKeywords : Recipe[]) => {
      return recipes.filter((recipe) => {
        return recipesWithKeywords.some((recipeWithKeyword) => recipeWithKeyword.title === recipe.title);
      });
    };

    const removeFilters = () => {
      router.push({ query: {} });
      selectedCuisines.value = [];
      selectedOrderBy.value = "Default"
      filteredRecipes.value = recipes.value;
      keyword = "";
      updateDisplayedRecipes();
    };

    watch(selectedCuisinesString, applyFilters);
    watch(selectedOrderBy, updateDisplayedRecipes);

    // watch query params
    watchEffect(() => {
      keyword = route.query.keyword?.toString() || '';
      // console.log("[LOG] Query params changed: ", keyword);
      applyFilters();
    });

    return { 
       redirectToPage,
      cousines, selectedCuisines, selectedCuisinesString,
      orderBy, selectedOrderBy, updateOrderBy,
      isFullHeight,recipes, displayedRecipes, itemsPerPage, loading, loadMore, getCourseType,
      recipeButton, updateDisplayedRecipes,
      titleLength, getKeywordsButton ,keyword,
      removeFilters, filteredRecipes,user
    };
  },


  created() {
    // Load the initial set of recipes
    this.loadMore();
  },

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
