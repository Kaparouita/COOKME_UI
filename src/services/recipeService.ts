import axios from 'axios';
import { Recipe } from '../models/recipe';

const baseURL = 'http://127.0.0.1:3000/recipe'; // Adjust based on your API endpoint

export const fetchRecipe = async (id: number): Promise<Recipe> => {
  const response = await axios.get<Recipe>(`${baseURL}/${id}`);
  return response.data
};

export const deleteRecipe = async (id: number): Promise<void> => {
  await axios.delete(`${baseURL}/${id}`);
};

export const getRecipes = async (): Promise<Recipe[]> => {
  const response = await axios.get<Recipe[]>(`${baseURL}`);
  return response.data
};

export const createRecipe = async (recipe: Recipe): Promise<Recipe> => {
  const response = await axios.post<Recipe>(`${baseURL}`, recipe);
  return response.data
};

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


// Add more functions for other operations like updating or creating a recipe
