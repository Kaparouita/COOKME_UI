// stores/auth.ts
import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    isAuthenticated: false,
    userId: null as number | null
  }),
  actions: {
    login(userId: number) {
      this.isAuthenticated = true;
      this.userId = userId;
      localStorage.setItem('auth', JSON.stringify({ isAuthenticated: true, userId }));
    },
    logout() {
      this.isAuthenticated = false;
      this.userId = null;
      localStorage.removeItem('auth');
    },
    initializeAuth() {
      const authData = localStorage.getItem('auth');
      if (authData) {
        const { isAuthenticated, userId } = JSON.parse(authData);
        this.isAuthenticated = isAuthenticated;
        this.userId = userId;
        console.log('Initialized auth from localStorage:', { isAuthenticated, userId });
      } else {
        console.log('No auth data found in localStorage');
      }
    }
  }
});
