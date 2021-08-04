import React, { createContext, useState, useEffect } from "react";
import UserApi from "./functions/UserApi";
import axios from "axios";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);

  const state = {
    token: [token, setToken],
    userAPI: UserApi(token),
  };

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      const refreshToken = async () => {
        const res = await axios.get("/user/refresh_token");

        setToken(res.data.accesstoken);
        
        setTimeout(() => {
          refreshToken();
        }, 10 * 60 * 1000);
      };
      refreshToken();
    }
  }, []);

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
