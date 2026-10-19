import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { store } from '@/store';
import { config } from '@/config';

export const tokenPrefix = 'Bearer';
const isClient = typeof window !== 'undefined';

const ApiInstance = axios.create();

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
const apiPort = process.env.NEXT_PUBLIC_API_PORT;

if (isClient) {
  ApiInstance.defaults.baseURL = config.baseUrl;
} else {
  if (baseUrl.includes('localhost') && apiPort) {
    ApiInstance.defaults.baseURL = `${baseUrl}:${apiPort}`;
  } else {
    ApiInstance.defaults.baseURL = baseUrl;
  }
}

ApiInstance.defaults.headers.common['Content-Type'] = 'application/json;charset=utf-8';
ApiInstance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

if (isClient) {
  ApiInstance.interceptors.request.use(
    (reqConfig: InternalAxiosRequestConfig) => {
      const currentUser = store.getState().auth.currentUser;
      if (currentUser?.token) {
        reqConfig.headers['Authorization'] = `${tokenPrefix} ${currentUser.token}`;
      }
      if (currentUser?.refreshToken) {
        reqConfig.headers['RefreshToken'] = `${tokenPrefix} ${currentUser.refreshToken}`;
      }
      return reqConfig;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  ApiInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response.data;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );
}

export default ApiInstance;
