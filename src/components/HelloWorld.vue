<template>
  <div class="body h-screen w-screen">
    <div class="grid grid-nogutter -m-2">
      <!-- Top Grid -->
      <div class="col-12">
        <div class="flex align-items-center justify-content-center h-8rem bg-white">
          <!-- Left Section: Logo and Address -->
          <div class="flex align-items-center">
            <p-Button outlined class="w-10rem h-8rem bg-white border-none custom-button">
              <img src="@/assets/logo.png" alt="logo" width="100%" height="100%">
            </p-Button>
            <div class="flex align-items-center w-10rem">
              <i class="pi pi-map-marker text-3xl"></i>
              <span class="text p-2">Address example</span>
            </div>
          </div>

          <!-- Center Section: Search Bar -->
          <div class="flex-grow-1 flex align-items-center justify-content-center">
            <p-InputText placeholder="Search" class="bg-white border-none custom-input"></p-InputText>
          </div>

          <!-- Right Section: (Optional) Add other elements here if needed -->
        </div>
      </div>
      <!-- Bottom Grids -->
      <div class="col-3">
        <div class="h-screen bg-blue-100"> <!-- Adjusted for full height and added background for visibility -->
          Bottom Left Grid
        </div>
      </div>
      <div class="col-9">
        <div class="h-screen bg-blue-200"> <!-- Adjusted for full height and added background for visibility -->
          <div class="flex justify-content-start align-items-center h-full">
            <!-- Icons with flex layout -->
            <i class="pi pi-search p-2"></i>
            <i class="pi pi-bars p-2"></i>
            <i class="pi pi-user p-2"></i>
            <i class="pi pi-bell p-2"></i>
            <i class="pi pi-envelope p-2"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">

export default {
  // Component options
};
</script>

<style>

.icons {
  /* height: 20%; */
  background-color: red;
}





.bottom-left-grid {
  background-color: aqua;
}

.bottom-right-grid {
  background-color: chartreuse;
}

</style>
