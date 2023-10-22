import { createContext, useReducer } from "react";
import storeReducer, { initialState } from "./reducer";
export const UserContext = createContext();

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);
  const handlelogin = (data) => {
    dispatch({
      type: "LOGIN",
      payload: data,
    });
  };
  const handlelogout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };
  const value = {
    state,
    handlelogin,
    handlelogout,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
