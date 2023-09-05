import React, {
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { api } from "../api/api";
import PropTypes from "prop-types";

const AuthContext = createContext({
  userToken: null,
  isLoggedIn: false,
  userData: null,
  login: (token, userData) => { },
  logout: () => { }
});


export const AuthContextProvider = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("mindUnpacker_authLogin") || false
  );
  const token = localStorage.getItem("mindUnpacker_authUserToken");

  const [userToken, setUserToken] = useState(token);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userD = localStorage.getItem("mindUnpacker_authUserData");
    if (userD) {
      const parsedUserData = JSON.parse(userD);
      setUserData(parsedUserData);
    }
    if (userToken) {
      api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
    }
  }, [userToken]);

  const loginHandler = (
    token,
    userData
  ) => {
    localStorage.setItem("mindUnpacker_authLogin", "true");
    localStorage.setItem("mindUnpacker_authUserToken", token);
    const user = JSON.stringify(userData);
    localStorage.setItem("mindUnpacker_authUserData", user);
    setIsLoggedIn(true);
    setUserToken(token);
  };
  const logoutHandler = () => {
    localStorage.removeItem("mindUnpacker_authLogin");
    localStorage.removeItem("mindUnpacker_authUserToken");
    setIsLoggedIn(false);
    setUserToken(null);
  };

  const value = useMemo(
    () => ({
      userToken: userToken,
      isLoggedIn: isLoggedIn,
      userData: userData,
      login: loginHandler,
      logout: logoutHandler,
    }),
    [userToken, isLoggedIn, userData]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
