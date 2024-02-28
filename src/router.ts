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
    path: '/home/:id?',
    name: 'home-id',
    component: HomePage
  },
  {
    path: '/login', // Login path
    name: 'login',
    component: LoginPage
  },
  {
    path: '/checkout/:recipe_id',
    name: 'checkout',
    component: CheckoutPage
  },
  {
    path: '/profile/:id',
    name: 'profile',
    component: ProfilePage
  }
  // Define other routes here
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
