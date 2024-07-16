<template>
  <div class="body h-screen w-full">
    <div class="grid grid-nogutter -m-2 h-full">
      <div class="col-12 h-full">
          <div class="card h-full">
            <div class="flex mb-2 gap-2 justify-content-center">
                <p-Button @click="active = 0" rounded label="1"  :outlined="active !== 0" />
                <p-Button @click="active = 1" rounded label="2"  :outlined="active !== 1" />
                <p-Button @click="active = 2" rounded label="3"  :outlined="active !== 2" />
                <p-Button @click="active = 3" rounded label="4"  :outlined="active !== 3" />
            </div>
            <div class="flex justify-content-end">
              <p-Button icon="pi pi-sign-out" @click="logout" class="text-black no-color-change no-underline" rounded/>
            </div>
            <p-TabMenu v-model:activeIndex="active" :model="items" />
              <!-- CHARTS -->
              <div v-show="active === 0" class="w-full panels bg-purple-200 h-full">
              
                <div class="flex">
                  <div class="w-5">
                    <p class="text text-xl font-bold font-italic text-center underline	">Recipes Cuisines</p>
                    <p-Chart type="pie" :data="chartDataCuisines" :options="chartOptionsCuisines" class="w-full md:w-[30rem]" />
                  </div>
                  <div class="w-4">
                    <p class="text text-xl font-bold font-italic text-center underline">Orders by Supermarket</p>
                    <p-Chart type="polarArea" :data="chartDataMarket" :options="chartOptionsMarket" class="w-full md:w-[30rem] " />
                  </div>
                  <div class="w-4">
                    <p class="text text-xl font-bold font-italic text-center underline">Registers by Users this Week</p>
                    <div class="w-full md:w-[30rem] mb-5">
                      <p-Chart type="bar" :data="chartDataUsers" :options="chartOptionsUsers" />
                    </div>
                  </div>
                </div>
              </div>
              <!-- RECIPES -->
              <div v-show="active === 1" class="w-full panels bg-purple-200 h-full">
                <div class="card ">
                  <p-DataTable
                    :value="displayedRecipes"
                    :scrollable="true"
                    :virtualScroll="true"
                    :virtualRowHeight="50"
                    tableStyle="min-width: 50rem"
                  >
                    <template #header>
                      <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                          <p class="text-md semi-bold">  In total there are {{ recipes ? recipes.length : 0 }} recipes. </p>
                          <div class="flex">
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
                            <p-Button outlined icon="pi pi-search" @click="handleSuggestionClick(currWord)"/>
                          </div>
                          <p-Button icon="pi pi-filter-slash" outlined rounded @click="removeFilters()"/>
                      </div>
                    </template>
                    <p-Column field="title" header="Name" class="bg-purple-200"></p-Column >
                    <p-Column header="Recipe" class="bg-purple-200">
                      <template #body="slotProps">
                          <img :src="slotProps.data.image" alt="product" width="100" height="100" />
                      </template>
                    </p-Column>
                    <p-Column field="cuisine" header="Cuisine" class="bg-purple-200"></p-Column>
                    <p-Column field="description" class="bg-purple-200" header="Description"></p-Column>
                    <p-Column field="cooking_time" class="bg-purple-200" header="Cooking Time"></p-Column>
                    <p-Column field="prep_time" class="bg-purple-200" header="Prep Time"></p-Column>
                    <p-Column field="serves" class="bg-purple-200" header="Serves"></p-Column>
                    <p-Column field="keywords" class="bg-purple-200" header="Keywords"></p-Column>
                    <p-Column field="ratings" class="bg-purple-200" header="Ratings"></p-Column>
                    <p-Column field="nutrition_info" class="bg-purple-200" header="Nutrition Info">
                      <template #body="slotProps">
                        <ul class="list-disc">
                            <li>Saturated fat: {{ slotProps.data.nutrition_info.saturated_fat }}</li>
                            <li>Protein: {{ slotProps.data.nutrition_info.protein }}</li>
                            <li>Fat: {{ slotProps.data.nutrition_info.fat }}</li>
                            <li>Kcal: {{ slotProps.data.nutrition_info.kcal }}</li>
                            <li>Added sugar: {{ slotProps.data.nutrition_info.added_sugar }}</li>
                            <li>Carbohydrate: {{ slotProps.data.nutrition_info.carbohydrate }}</li>
                            <li>Salt: {{ slotProps.data.nutrition_info.salt }}</li>
                        </ul>
                      </template>
                    </p-Column>
                    <p-Column field="ingredients" header="Ingredients" class="bg-purple-200"></p-Column>
                    <p-Column field="courses" header="Courses" class="bg-purple-200">
                      <template #body="slotProps">
                        <ul class="list-disc">
                            <li v-for="course in slotProps.data.courses" v-bind:key="course">{{ course }}</li>
                        </ul>
                      </template>
                    </p-Column>
                    <p-Column field="skill_level" header="Skill Level" class="bg-purple-200"></p-Column>
                    <p-Column field="post_dates" header="Post Date" class="bg-purple-200">
                      <template #body="slotProps">
                        <p>{{ postdate(slotProps.data.post_dates) }}</p>
                      </template>
                    </p-Column>
                    <p-Column header="Remove" class="bg-purple-200">
                      <template #body="slotProps">
                        <p-Button icon="pi pi-trash" class="bg-red-500" rounded @click="removeRecipe(slotProps.data.id)" />
                      </template>
                    </p-Column>
                  </p-DataTable>
                </div>
                <div v-if="loading" class="loading">Loading...</div>
                <div v-infinite-scroll="loadMore" class="scroll-anchor"></div>
              </div>
              <!-- USERS -->
              <div v-show="active === 2" class="w-full panels bg-purple-200 h-full">
                <div class="card">
                  <p-DataTable
                    :value="users"
                    :scrollable="true"
                    :virtualScroll="true"
                    :virtualRowHeight="50"
                    tableStyle="min-width: 50rem"
                  >
                    <template #header>
                      <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                          <p class="text-md semi-bold">  In total there are {{ users ? users.length : 0 }} users. </p>
                      </div>
                    </template>
                    <p-Column field="id" header="ID" class="bg-purple-200"></p-Column >
                    <p-Column field="username" header="Name" class="bg-purple-200"></p-Column >
                    <p-Column field="email" header="Email" class="bg-purple-200"></p-Column>
                    <p-Column field="address" header="Address" class="bg-purple-200"></p-Column>
                    <p-Column field="latitude" header="Latitude" class="bg-purple-200"></p-Column>
                    <p-Column field="longitude" header="Longitude" class="bg-purple-200"></p-Column>
                    <p-Column field="role" header="Role" class="bg-purple-200"></p-Column>
                    <p-Column field="created_at" header="Created At" class="bg-purple-200">
                      <template #body="slotProps">
                        <p>{{ decodeUserDate(slotProps.data.created_at) }}</p>
                      </template>
                    </p-Column>
                    <p-Column field="favorites_recipes" header="Favorites Recipes" class="bg-purple-200"/>
                    <p-Column header="Remove" class="bg-purple-200">
                      <template #body="slotProps">
                        <p-Button icon="pi pi-trash" class="bg-red-500" rounded @click="removeUser(slotProps.data.id)" />
                      </template>
                    </p-Column>
                  </p-DataTable>
                </div>
              </div>
              <!-- ADD RECIPES -->
              <div v-show="active === 3" class="w-full panels bg-purple-200 h-full">
                <div class="align-items-start flex flex-column">
                  <div class="w-full flex flex-row flex-wrap justify-content-between">
                    <div class="surface-overlay border-round border-1 my-3 p-3 w-5 h-10rem mt-5">
                      <p>How to add Recipes</p>
                      <ul class="list-decimal">
                          <li>Create a new recipe</li>
                          <li>Create a json/xml file with the recipe data</li>
                          <li>Upload the json/xml file</li>
                          <li>(You can add multiple recipes at once)</li>
                      </ul> 
                    </div>
                    <div class="w-5 flex flex-wrap justify-center flex-column gap-1">
                          <p-FileUpload 
                            class="bg-black-alpha-60 mt-8" 
                            ref="fileupload" 
                            mode="basic" 
                            name="demo[]" 
                            :customUpload="true" 
                            accept=".json,.xml" 
                            :maxFileSize="1000000" 
                            @select="onSelect" 
                          />
                          <p-Button label="Upload" class="border-none w-3" r @click="upload" />
                    </div>
                  </div>
                  <div class="w-full flex flex-row flex-wrap justify-content-start gap-8 bg-purple-200">
                    <div class="surface-overlay border-round border-1 my-3 p-3 w-5 ">
                      <p>Json file format:</p>
                      <pre>
                        [
                          {
                            "description": "Delicious recipe",
                            "cooking_time": 30,
                            "prep_time": 15,
                            "serves": 4,
                            "keywords": ["easy", "quick"],
                            "ratings": 95,
                            "ingredients": ["1 cup flour", "2 eggs"],
                            "courses": ["main"],
                            "cuisine": "Italian",
                            "nutrition_info": {
                              "saturated_fat": 10.5,
                              "protein": 5.4,
                              "fat": 20.3,
                              "kcal": 350,
                              "added_sugar": 5.0,
                              "carbohydrate": 50.0,
                              "salt": 1.2
                            },
                            "skill_level": "easy",
                            "post_dates": "2024-06-28",
                            "title": "Pizza",
                            "image": "http://example.com/pizza.jpg"
                          },
                          {
                            recipe 2
                          },
                          ...
                        ]
                      </pre>
                    </div>
                    <div class="surface-overlay border-round border-1 my-3 p-3 w-5 h-auto flex flex-wrap justify-center">
                      <p>Xml file format:</p>
                      <pre>
                        &lt;recipes&gt;
                          &lt;recipe&gt;
                            &lt;title&gt;Recipe Title&lt;/title&gt;
                            &lt;image&gt;Image URL&lt;/image&gt;
                            &lt;cuisine&gt;Cuisine&lt;/cuisine&gt;
                            &lt;description&gt;Description&lt;/description&gt;
                            &lt;cooking_time&gt;Cooking Time&lt;/cooking_time&gt;
                            &lt;prep_time&gt;Prep Time&lt;/prep_time&gt;
                            &lt;serves&gt;Serves&lt;/serves&gt;
                            &lt;keywords&gt;
                              &lt;keyword&gt;Keywords&lt;/keyword&gt;
                            &lt;/keywords&gt;
                            &lt;ratings&gt;1-100&lt;/ratings&gt;
                            &lt;nutrition_info&gt;
                              &lt;saturated_fat&gt;Saturated Fat&lt;/saturated_fat&gt;
                              &lt;protein&gt;Protein&lt;/protein&gt;
                              &lt;fat&gt;Fat&lt;/fat&gt;
                              &lt;kcal&gt;Kcal&lt;/kcal&gt;
                              &lt;added_sugar&gt;Added Sugar&lt;/added_sugar&gt;
                              &lt;carbohydrate&gt;Carbohydrate&lt;/carbohydrate&gt;
                              &lt;salt&gt;Salt&lt;/salt&gt;
                            &lt;/nutrition_info&gt;
                            &lt;ingredients&gt;
                              &lt;ingredient&gt;Ingredients&lt;/ingredient&gt;
                            &lt;/ingredients&gt;
                            &lt;courses&gt;
                              &lt;course&gt;Courses&lt;/course&gt;
                            &lt;/courses&gt;
                            &lt;skill_level&gt;Skill Level&lt;/skill_level&gt;
                            &lt;post_dates&gt;Post Date&lt;/post_dates&gt;
                          &lt;/recipe&gt;

                          &lt;recipe&gt;
                            recipe 2
                          &lt;/recipe&gt;>
                          ...
                        &lt;/recipes&gt;
                      </pre>
                    </div>
                  </div>
                </div>
            </div>
          </div>
      </div>
    </div>
    <p-Toast />
  </div>
</template>

  <script lang="ts">
  import { defineComponent,ref,onMounted,watch } from 'vue';
  import { getRecipes ,createRecipe,saveRecipes,deleteRecipe,getRecipesByKeywords} from '@/services/recipeService';
  import {Recipe} from '@/models/recipe';
  import {getOrders,getUsers,deleteUser} from '@/services/userService';
  import { Order } from '@/models/order';
  import { User } from '@/models/user';
  import vInfiniteScroll from '@/services/v-infinite-scroll';
  import { useToast } from "primevue/usetoast";
  import {getAllKeywords,searchKeywords} from '@/services/searchKeywords';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '@/stores/auth';
 
  type Records = Record<string, number>;
  
  export default defineComponent({
    name: 'AdminPage',
    components: {
    
    },
    directives: {
      'infinite-scroll': vInfiniteScroll,
    },

    setup() {

      const active = ref(0);
      const recipes = ref<Recipe[]>([]);
      

      const items = ref([
        { label: 'Dashboard', icon: 'pi pi-home' },
        { label: 'Recipes', icon: 'pi pi-book' },
        { label: 'Users', icon: 'pi pi-user' },
        { label: 'Add Recipes', icon: 'pi pi-plus' },
      ]);

      const displayedRecipes = ref<any[]>([]);
      const rows = ref(10); // Number of items per page
      const totalRecords = ref(0);
      const loading = ref(false);
      const currWord = ref('');
      const autoCompleteSuggestions = ref([]) as any;
      const suggestions = ref([]) as any;
      const users = ref<User[]>([]);
      const toast = useToast();
      const fileupload = ref();
      const jsonData = ref();
      const xmlData = ref();
      const lastFile = ref();
 
      // UPLOADING FILES -------------------------------------

      const upload =async () => {
        if (lastFile.value === "json") {
          if (jsonData.value) {
            const recipes = JSON.parse(jsonData.value);
            const response = await saveRecipes(recipes);
            if(response.status_code === 200){
              toast.add({ severity: "success", summary: "Success", detail: "Recipes added" ,life: 3000 });
            }else{
              toast.add({ severity: "error", summary: "Error", detail: "Error adding recipes" ,life: 3000});
            }
            jsonData.value = null;
          } else {
            toast.add({ severity: "error", summary: "Error", detail: "No data found" ,life: 3000});
          }
        } else if (lastFile.value === "xml") {
          if (xmlData.value) {
            const recipes = parseXML(xmlData.value);
            const response = await saveRecipes(recipes);
            if(response.status_code === 200){
              toast.add({ severity: "success", summary: "Success", detail: "Recipes added" ,life: 3000});
            }else{
              toast.add({ severity: "error", summary: "Error", detail: "Error adding recipes" ,life: 3000});
            }
            xmlData.value = null;
          } else {
            toast.add({ severity: "error", summary: "Error", detail: "No data found" ,life: 3000});
          }
        } else {
          toast.add({ severity: "error", summary: "Error", detail: "No file selected" ,life: 3000});
        }
      };

      const processFile = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (file.type === 'application/json' || file.name.endsWith('.json')) {
            try {
              if(!e.target) return;
              jsonData.value = e.target.result;
              lastFile.value = "json"
            } catch (error) {
              console.error('Error parsing JSON:', error);
            }
          } else if (file.type === 'application/xml' || file.name.endsWith('.xml')) {
            try {
              if(!e.target) return;
              xmlData.value = e.target.result as string;
              lastFile.value = "xml"
            } catch (error) {
              console.error('Error parsing XML:', error);
            }
          } else {
            console.error('Unsupported file type');
          }
        };
        
        reader.readAsText(file);
      };

      const onSelect = (event: any) => {
        const files = event.files;
        if (files && files.length > 0) {
          const file = files[0];
          processFile(file);
        }
      };

      function parseXML(xml: string): Recipe[] {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xml, 'text/xml');
        const recipes: Recipe[] = [];
        const recipeNodes = xmlDoc.getElementsByTagName('recipe');
        for (let i = 0; i < recipeNodes.length; i++) {
          const recipeNode = recipeNodes[i];
          const recipe: Recipe = {
            id: 0,
            title: recipeNode.getElementsByTagName('title')[0]?.textContent || '',
            image: recipeNode.getElementsByTagName('image')[0]?.textContent || '',
            cuisine: recipeNode.getElementsByTagName('cuisine')[0]?.textContent || '',
            description: recipeNode.getElementsByTagName('description')[0]?.textContent || '',
            cooking_time: parseInt(recipeNode.getElementsByTagName('cooking_time')[0]?.textContent || '0'),
            prep_time: parseInt(recipeNode.getElementsByTagName('prep_time')[0]?.textContent || '0'),
            serves: parseInt(recipeNode.getElementsByTagName('serves')[0]?.textContent || '0'),
            keywords: Array.from(recipeNode.getElementsByTagName('keyword')).map(keyword => keyword.textContent || ''),
            ratings: parseInt(recipeNode.getElementsByTagName('ratings')[0]?.textContent || '0'),
            nutrition_info: {
              saturated_fat: parseFloat(recipeNode.getElementsByTagName('saturated_fat')[0]?.textContent || '0'),
              protein: parseFloat(recipeNode.getElementsByTagName('protein')[0]?.textContent || '0'),
              fat: parseFloat(recipeNode.getElementsByTagName('fat')[0]?.textContent || '0'),
              kcal: parseFloat(recipeNode.getElementsByTagName('kcal')[0]?.textContent || '0'),
              added_sugar: parseFloat(recipeNode.getElementsByTagName('added_sugar')[0]?.textContent || '0'),
              carbohydrate: parseFloat(recipeNode.getElementsByTagName('carbohydrate')[0]?.textContent || '0'),
              salt: parseFloat(recipeNode.getElementsByTagName('salt')[0]?.textContent || '0'),
            },
            ingredients: Array.from(recipeNode.getElementsByTagName('ingredient')).map(ingredient => ingredient.textContent || ''),
            courses: Array.from(recipeNode.getElementsByTagName('course')).map(course => course.textContent || ''),
            skill_level: recipeNode.getElementsByTagName('skill_level')[0]?.textContent || '',
            post_dates: recipeNode.getElementsByTagName('post_dates')[0]?.textContent || '',
          };
          recipes.push(recipe);
        }
        return recipes;
      }

      // ON MOUNT -------------------------------------

      onMounted(async () => {
          recipes.value = await getRecipes();
          totalRecords.value = recipes.value.length;
          loadMore();
          const cuisineData = processRecipesByCuisine(recipes.value);

          chartDataCuisines.value = setChartData(cuisineData, 'Cuisines');
          chartOptionsCuisines.value = setChartOptions();

          const orders = await getOrders();
          const marketData = processOrdersByMarket(orders);

          chartDataMarket.value = setChartData(marketData, 'Markets');
          chartOptionsMarket.value = setChartOptions();
          
          users.value = await getUsers();
          const userData = processUsersByDate(users.value);

          chartDataUsers.value = setChartData(userData, 'Users Register Last Week');
          chartOptionsUsers.value = setChartOptions();

          suggestions.value = await getAllKeywords();
      });

      // CHARTS -------------------------------------

      const chartDataCuisines = ref();
      const chartOptionsCuisines = ref();
      const chartDataMarket = ref();
      const chartOptionsMarket = ref();
      const chartDataUsers = ref();
      const chartOptionsUsers = ref();

      function postdate(timestamp :string) {
        let fullTimestamp = parseInt(timestamp) * 1000;
        let date = new Date(fullTimestamp);
        return date.toLocaleDateString(); 
      }

      function decodeUserDate(timestamp : string):string{
        let date = new Date(timestamp);
        return date.toLocaleDateString();
      }

      function decodeDate(timestamp: string): string {
        let date = new Date(timestamp);
        let today = new Date();
        let lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);       
        if (date < lastWeek) {
          return '';
        }        
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];        
        return days[date.getDay()];
      }

      const processUsersByDate = (users : User[]) => {
        const userCount = initDaysMap();
        users.forEach(user => {
          const dateStr = user.created_at? user.created_at : '';
          const day = decodeDate(dateStr);
          if (!day) {return;}
          if (userCount[day]) {
            userCount[day]++;
          } else {
            userCount[day] = 1;
          }
        });
        return userCount;
      };

      function initDaysMap() {
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let daysMap: Records = {};
        days.forEach(day => {
          daysMap[day] = 0;
        });
        return daysMap;
      }

      const processRecipesByCuisine = (recipes : Recipe[]) => {
        //create a map of cuisines and their counts
        const cuisineCount: Records = {};
        recipes.forEach(recipe => {
          const cuisine = recipe.cuisine;
          if (!cuisine) {cuisineCount['Unknown'] = (cuisineCount['Unknown'] || 0) + 1; return;}
          if (cuisineCount[cuisine]) {
            cuisineCount[cuisine]++;
          } else {
            cuisineCount[cuisine] = 1;
          }
        });
        return cuisineCount;
      };

      const processOrdersByMarket = (orders : Order[]) =>{
        //create a map of markets and their counts
        const marketCount: Records = {};
        orders.forEach(order => {
          const market = order.market;
          if (!market) {marketCount['Unknown'] = (marketCount['Unknown'] || 0) + 1; return;}
          if (marketCount[market]) {
            marketCount[market]++;
          } else {
            marketCount[market] = 1;
          }
        });
        return marketCount;
      }

      const setChartData = (records : Records,label : string) => {
        const labels = Object.keys(records);
        const data = Object.values(records);
        const documentStyle = getComputedStyle(document.documentElement);
        const backgroundColor = labels.map((_, index) => {
          const colorVar = `--p-color-${index + 1}`;
          return documentStyle.getPropertyValue(colorVar).trim();
        });

        return {
          labels: labels,
          datasets: [
            {
              label: label,
              data: data,
              backgroundColor: backgroundColor,
              hoverBackgroundColor: backgroundColor.map(color => lightenColor(color, 20))
            }
          ]
        };
      };

      const setChartOptions = () => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--p-text-color').trim();

        return {
          plugins: {
            legend: {
              labels: {
                color: textColor
              }
            }
          },
        };
      };

      const lightenColor = (color: string, percent: number) => {
        // Function to lighten a color by a certain percent
        const num = parseInt(color.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1).toUpperCase();
      };

      // RECIPES -------------------------------------

      const loadMore = () => {
        if (loading.value) return;
        loading.value = true;

        setTimeout(() => {
          const nextItems = recipes.value.slice(displayedRecipes.value.length, displayedRecipes.value.length + rows.value);
          displayedRecipes.value = [...displayedRecipes.value, ...nextItems];
          loading.value = false;
        }, 1000); // Simulate async loading
      };

      const removeRecipe = async (id: number) => {
        const response = await deleteRecipe(id);
        if(response.status_code === 200){
          toast.add({ severity: "success", summary: "Success", detail: "Recipe removed" ,life: 3000 });
        }else{
          toast.add({ severity: "error", summary: "Error", detail: "Error removing recipe" ,life: 3000});
        }
      };

      const removeUser = async (id: number) => {
        const response = await deleteUser(id);
        if(response.status_code === 200){
          toast.add({ severity: "success", summary: "Success", detail: "User removed" ,life: 3000 });
        }else{
          toast.add({ severity: "error", summary: "Error", detail: "Error removing user" ,life: 3000});
        }
      };

      const handleSuggestionClick = async (suggestion: any) => {
        if(suggestion) {
          currWord.value = suggestion.keyword;
          var keywords = await searchKeywords(currWord.value);
          recipes.value = await getRecipesByKeywords(keywords);
          totalRecords.value = recipes.value.length;
          displayedRecipes.value = [];
          loadMore();
        }
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

      const authStore = useAuthStore();
      const router = useRouter();

      const logout = () => {
        authStore.logout();
        router.push('/login');
      };
      
      async function removeFilters() {
        currWord.value = '';
        recipes.value = await getRecipes();
        totalRecords.value = recipes.value.length;
        displayedRecipes.value = [];
        loadMore();
      }


      return {
        items,active,chartDataCuisines,chartOptionsCuisines,chartDataMarket,chartOptionsMarket
        ,chartDataUsers,chartOptionsUsers,recipes,displayedRecipes,postdate,loadMore,loading,users,decodeUserDate,
        fileupload,upload,toast,onSelect,processFile,jsonData,xmlData,removeRecipe,removeUser,handleSuggestionClick,currWord,
        autoCompleteSuggestions,search,removeFilters,logout
      };
    },
  });
  </script>
  
  <style>
    :root {
      --p-color-1: #6b46c1;
      --p-color-2: #ed8936;
      --p-color-3: #718096;
      --p-color-4: #4fd1c5;
      --p-color-5: #f6ad55;
      --p-color-6: #a0aec0;
      --p-color-7: #f56565;
      --p-color-8: #68d391;
      --p-color-9: #ed64a6;
      --p-color-10: #f687b3;
      --p-color-11: #63b3ed;
      --p-color-12: #e53e3e;
      --p-color-13: #4299e1;
      --p-color-14: #48bb78;
      --p-color-15: #38a169;
      --p-color-16: #9f7aea;
      --p-color-17: #d53f8c;
      --p-color-18: #dd6b20;
      --p-color-19: #319795;
      --p-color-20: #dd6b20;
      --p-color-21: #ed8936;
      --p-color-22: #f6e05e;
      --p-color-23: #e53e3e;
      --p-color-24: #dd6b20;
      --p-color-25: #c05621;
      --p-color-26: #3182ce;
      --p-color-27: #dd6b20;
      --p-color-28: #805ad5;
      --p-color-29: #e53e3e;
      --p-color-30: #d53f8c;
      --p-color-31: #68d391;
      --p-color-32: #9f7aea;
      --p-color-33: #f687b3;
      --p-color-34: #4299e1;
      --p-color-35: #dd6b20;
      --p-text-color: #333;
    }

    .p-tabmenu .p-tabmenu-nav .p-tabmenuitem.p-highlight .p-menuitem-link {
        color: white !important; /* Use !important to override default styles */
        background-color: var(--purple-200) !important; /* Use !important to override default styles */
    }

    .p-tabmenu .p-tabmenu-nav .p-tabmenu-ink-bar {
      background-color: var(--purple-200) !important; /* Use !important to override default styles */
    }
</style>

  

<!-- 
  CHARTS

  - recipe cuisines
  - orders by supermarket
  - registers by users (daily, weekly, monthly) -->