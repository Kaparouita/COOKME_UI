import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomePage from '@/components/HomePage.vue';
import LoginPage from '@/components/LoginPage.vue';
import CheckoutPage from '@/components/CheckoutPage.vue';
import ProfilePage from '@/components/ProfilePage.vue';
import AdminPage from './components/AdminPage.vue';
import { useAuthStore } from './stores/auth';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/', // Root path
    redirect: '/home' // Redirect to /home
  },
  {
    path: '/home',
    name: 'home',
    component: HomePage,
    props: (route) => ({ keyword: route.query.keyword })
  },
  {
    path: '/home/:userId',
    name: 'user-home',
    component: HomePage,
    props: (route) => ({ userId: Number(route.params.userId), keyword: route.query.keyword }),
    meta: { requiresAuth: true }
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
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/:userId?',
    name: 'admin',
    component: AdminPage,
    meta: { requiresAuth: true }
  }
  // Define other routes here
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  authStore.initializeAuth(); // Ensure auth state is initialized

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!authStore.isAuthenticated) {
      next({ path: '/login', query: { redirect: to.fullPath } });
    } else if (to.params.userId && authStore.userId !== Number(to.params.userId)) {
      next({ path: '/login', query: { redirect: to.fullPath } });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
