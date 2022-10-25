import React, { useReducer } from "react";
import Cookies from "js-cookie";

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      Cookies.set("sv_user", action.payload.user);
      Cookies.set("sv_token", action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        user: Cookies.get("sv_user"),
        token: Cookies.get("sv_token"),
      };
    case "LOGOUT":
      Cookies.remove("sv_token");
      Cookies.remove("sv_user");
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
