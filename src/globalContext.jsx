import React, { useReducer } from "react";
export const GlobalContext = React.createContext();

const initialState = {
  message: "",
  type:'',
};

const reducer = (state, action) => {
  switch (action.type) {

    case "SHOW_TOAST" :
      return {
        ...state,
        message: action.payload.message,
        type: action.payload.type
      }

    default:
      return state;
  }
};

export const showToast = (dispatch, message, timeout = 3000) => {
  dispatch({
    type: "SHOW_TOAST",
    payload: {
      message :message.message,
      type: message.type
    }
  });

  setTimeout(() => {
    dispatch({
      type: "SHOW_TOAST",
      payload: {
        message: "",
        type: ""
      }
    });
  }, timeout);
};

const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);


  return (
    <GlobalContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
