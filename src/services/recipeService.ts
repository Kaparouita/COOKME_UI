import axios from 'axios';
import { Recipe } from '../models/recipe';
import { Market } from '../models/market';
import { MarketIngredient } from '@/models/marketIngredient';
import { Response } from '@/models/response';

const baseURL = 'http://127.0.0.1:3000/recipe'; // Adjust based on your API endpoint

export const fetchRecipe = async (id: number): Promise<Recipe> => {
  const response = await axios.get<Recipe>(`${baseURL}/${id}`);
  return response.data
};

export const deleteRecipe = async (id: number): Promise<Response> => {
  const response = await axios.delete<Response>(`${baseURL}/${id}`);
  return response.data
};

export const getRecipes = async (): Promise<Recipe[]> => {
  const response = await axios.get<Recipe[]>(`${baseURL}`);
  return response.data
};

export const createRecipe = async (recipe: Recipe): Promise<Response> => {
  const response = await axios.post<Response>(`${baseURL}`, recipe);
  return response.data
};

export const saveRecipes = async (recipes: Recipe[]): Promise<Response> => {
  const response = await axios.post<Response>(`${baseURL}/recipes`, recipes);
  return response.data
}

export const getRecipesByCuisines = async (cuisines : string[]): Promise<Recipe[]> => {
  const cuisinesParam = cuisines.join(',');
  try {
    const response = await axios.get<Recipe[]>(`${baseURL}/cuisines?cuisines=${cuisinesParam}`);
    return response.data
  } catch (error) {
    console.error('Error fetching recipes:', error);
  } 
  return [];
}

export const getRecipesByKeywords = async (keywords : string[]): Promise<Recipe[]> => {
  const keywordsParam = keywords.join(',');
  try {
    const response = await axios.get<Recipe[]>(`${baseURL}/keywords?keywords=${keywordsParam}`);
    return response.data
  } catch (error) {
    console.error('Error fetching recipes:', error);
  } 
  return [];
}

export const compareMarketPrices = async (recipeID : number, availableMarkets : Market[]): Promise<Market> => {
  const response = await axios.post<Market>(`${baseURL}/compareMarketPrices/${recipeID}`, availableMarkets);
  return response.data
}

export const convertReicpeToMarketIngredients = async (recipeID : number,market : string): Promise<MarketIngredient[]> => {
  // aslo add the market name as query param
  const response = await axios.post<MarketIngredient[]>(`${baseURL}/convertToMarketIngredients/${recipeID}?market=${market}`);
  return response.data
}

// Add more functions for other operations like updating or creating a recipe
