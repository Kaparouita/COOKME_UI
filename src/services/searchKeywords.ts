import axios from "axios";

const baseURL = 'http://127.0.0.1:3000/search'; 

export const searchKeywords = async (keyword : string): Promise<string[]> => {
    try {
        const response = await axios.get<string[]>(`${baseURL}/${keyword}`);
        return response.data
    } catch (error) {
        console.error('Error fetching keywords:', error);
    } 
    return [];
};

export const getAllKeywords = async (): Promise<string[]> => {
    try {
        const response = await axios.get<string[]>(`${baseURL}`);
        return response.data
    } catch (error) {
        console.error('Error fetching keywords:', error);
    } 
    return [];
}