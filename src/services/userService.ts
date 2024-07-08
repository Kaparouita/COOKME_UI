import axios from 'axios';
import { User } from '../models/user';
import { LoginResponse } from '@/models/loginResponse';
import { Response } from '@/models/response';
import { Market } from '@/models/market';
import { Order } from '@/models/order';
import { ProfileRecipeResponse } from '@/models/profileResponse';
import { Review } from '@/models/review';
import { Recipe } from '@/models/recipe';

const baseURL = 'http://127.0.0.1:3000/user';
const orderBaseURL = 'http://127.0.0.1:3000/order';


export const getUser = async (id: number): Promise<User> => {
  const response = await axios.get<User>(`${baseURL}/${id}`);
  return response.data
};

export const deleteUser = async (id: number): Promise<Response> => {
  const response = await axios.delete<Response>(`${baseURL}/${id}`);
  return response.data
};

export const getUsers = async (): Promise<User[]> => {
  const response = await axios.get<User[]>(`${baseURL}/all`);
  return response.data
};

export const createUser = async (user: User): Promise<any> => {
  const response = await axios.post<User>(`${baseURL}`, user);
  return response.data
};

export const checkLogin = async (LoginResponse: LoginResponse): Promise<Response> => {
  const response = await axios.post<Response>(`${baseURL}/login`, LoginResponse);
  return response.data
}

export const getUserByEmail = async (email: string): Promise<User> => {
    const response = await axios.get<User>(`${baseURL}/email/${email}`);
    return response.data;
  };

export const findClosestMarket = async (userID: number): Promise<Market> => {
  const response = await axios.get<Market>(`${baseURL}/closestMarket/${userID}`);
  return response.data
}

export const findAllAvailableMarkets = async (userID: number): Promise<Market[]> => {
  const response = await axios.get<Market[]>(`${baseURL}/availableMarkets/${userID}`);
  return response.data
}

export const order = async (order: Order): Promise<Response> => {
  const response = await axios.post<Response>(`${orderBaseURL}`, order);
  return response.data
}

export const removeOrder = async (recipe_id : number,user_id : number): Promise<Response> => {
  const response = await axios.delete<Response>(`${orderBaseURL}/${recipe_id}/${user_id}`);
  return response.data
}

export const getOrderByUserID = async (userId: number): Promise<Order[]> => {
  const response = await axios.get<Order[]>(`${orderBaseURL}/user/${userId}`);
  return response.data
}

export const getProfileRecipes = async (userId: number): Promise<ProfileRecipeResponse[]> => {
  const response = await axios.get<ProfileRecipeResponse[]>(`${baseURL}/profileRecipes/${userId}`);
  return response.data
}

export const addFavoriteRecipe = async (userId: number, recipeId: number): Promise<Response> => {
  const response = await axios.post<Response>(`${baseURL}/addFavoriteRecipe/${userId}/${recipeId}`);
  return response.data
}

export const removeFavoriteRecipe = async (userId: number, recipeId: number): Promise<Response> => {
  const response = await axios.delete<Response>(`${baseURL}/removeFavoriteRecipe/${userId}/${recipeId}`);
  return response.data
}

export const getFavoriteRecipes = async (userId: number): Promise<Recipe[]> => {
  const response = await axios.get<Recipe[]>(`${baseURL}/favoriteRecipes/${userId}`);
  return response.data
}

export const addReview = async (review: Review): Promise<Response> => {
  const response = await axios.post<Response>(`${baseURL}/addReview`, review);
  return response.data
}

export const getReviewsByUserID = async (userId: number): Promise<Review[]> => {
  const response = await axios.get<Review[]>(`${baseURL}/reviews/${userId}`);
  return response.data
}

export const updateReview = async (review: Review): Promise<Response> => {
  const response = await axios.put<Response>(`${baseURL}/updateReview`, review);
  return response.data
}

export const getOrders = async (): Promise<Order[]> => {
  const response = await axios.get<Order[]>(`${orderBaseURL}/all`);
  return response.data
}

// export const removeReview = async (reviewId: number): Promise<Response> => {
//   const response = await axios.delete<Response>(`${baseURL}/removeReview/${reviewId}`);
//   return response.data
// }
