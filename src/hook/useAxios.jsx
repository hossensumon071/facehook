import { useEffect } from "react";
import useAuth from "./useAuth";
import api from "../api";
import axios from "axios";

const useAxios = () => {
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    // add a request intercepters
    const requerstIntercept = api.interceptors.request.use(
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
    const responseIntercept = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const orginalRequest = error.config;
        if (error.response.status === 401 && !orginalRequest._retry) {
          orginalRequest._retry = true;
          try {
            const refreshToken = auth?.refreshToken;
            const response = await axios.post(
              `${import.meta.env.VITE_SERVER_BASE_URL}/auth/refresh-token`,
              { refreshToken }
            );

            const { token } = response.data;
            console.log("new token", token);
            setAuth({ ...auth, authToken: token });
            orginalRequest.headers.Authorization = `Bearer ${token}`;

            return axios(orginalRequest);
          } catch (error) {
            throw Error(error);
          }
        }

        return Promise.reject(error);
      }
    );
    return () => {
      api.interceptors.request.eject(requerstIntercept);
      api.interceptors.response.eject(responseIntercept);
    };
  }, [auth.authToken]);

  return { api };
};

export default useAxios;
