import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomePage from '@/components/HomePage.vue';
import LoginPage from '@/components/LoginPage.vue';
import CheckoutPage from '@/components/CheckoutPage.vue';
import ProfilePage from '@/components/ProfilePage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/', // Root path
    redirect: '/home' // Redirect to /home
  },
  {
    path: '/home/:userId?',
    name: 'home-id',
    component: HomePage,
    props: true
  },
  {
    path: '/login', // Login path
    name: 'login',
    component: LoginPage
  },
  {
    // Checkout path with optional userId and recipeId parameters
    path: '/checkout/:recipeId/:userId?',
    name: 'checkout',
    component: CheckoutPage,
    props: true
  },
  {
    path: '/profile/:userId?',
    name: 'profile',
    component: ProfilePage,
    props: true
  }
  // Define other routes here
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
