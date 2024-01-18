import axios, {AxiosInstance} from 'axios';
import {URL_SERVER, REQUEST_TIMEOUT} from '../const';


const createApi = (): AxiosInstance => {
  const api = axios.create({
    baseURL: URL_SERVER,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config) => config
  );

  return api;
};

export {createApi};
