import { useEffect } from "react";
import useAuth from "./useAuth";
import api from "../api";

const useAxios = () => {
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    // add a request intercepters
    api.interceptors.request.use(
      (config) => {
        const authToken = auth?.authToken;
        if (authToken) {
          config.headers.Authorization = `Bearer ${authToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // add a response intercepters
    api.interceptors.response.use(
        (response) => response, 

        async(error) => {
            const originalRequest = error.config

            if(error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true
            } 
        }
      );

  }, []);
  return <div>useAxios</div>;
};

export default useAxios;
