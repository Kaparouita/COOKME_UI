import axios from 'axios';
import { User } from '../models/user';
import { LoginResponse } from '@/models/loginResponse';
import { Response } from '@/models/response';

const baseURL = 'http://127.0.0.1:3000/user';

export const getUser = async (id: number): Promise<User> => {
  const response = await axios.get<User>(`${baseURL}/${id}`);
  return response.data
};

export const deleteUser = async (id: number): Promise<void> => {
  await axios.delete(`${baseURL}/${id}`);
};

export const getUsers = async (): Promise<User[]> => {
  const response = await axios.get<User[]>(`${baseURL}`);
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