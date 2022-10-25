import React, { useReducer } from "react";
import Cookies from "js-cookie";

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  userId: null,
  token: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      Cookies.set("sv_user", action.payload.user);
      Cookies.set("sv_token", action.payload.token);
      Cookies.set("sv_user_id", action.payload.userId)
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        userId: action.payload.userId
      };
    case "LOGOUT":
      Cookies.remove("sv_token");
      Cookies.remove("sv_user");
      Cookies.remove("sv_user_id");
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        userId: null
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
