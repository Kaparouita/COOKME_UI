<template>
    <div class="body h-auto w-full  surface-200">
        <div class="grid grid-nogutter -m-2">
            <!-- Top Grid-->
            <div class="col-12 shadow-bottom">
                <HeaderComp  />
            </div>
                <!-- Bottom Grids-->
            <div class="col-7">
                <div class="w-full flex align-items-center surface-300 justify-content-center left-grid"> 
                    <img src="@/assets/kart-astro.png" alt="Checkout" class="w-full h-auto" />
                </div>
            </div>
            <div class="col-5">
                <div class="flex w-full h-full align-items-center surface-300 justify-content-center right-grid"> 
                    <span class="text p-2">Right Grid</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import HeaderComp from '@/components/HeaderComp.vue';


export default {
    name: 'CheckoutPage',

    components: {
        HeaderComp
    },

    data() {
        const userId = "2";
        const userName =  'Stivaktakis Giorgos';

        return {
            userId,
            userName  
        };
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
    .shadow-bottom {
    box-shadow: 0 1rem 6rem rgba(0, 0, 0, 0.2);
    size: 3rem;
    position: fixed;
    z-index: 2;
    }
</style>
