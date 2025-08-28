import { createContext, useReducer } from "react";

const initialState = {
  isSidebarOpen: false,
  isSearchbarOpen: false,
  isSigninModalOpen: false,
  isSignupModalOpen: false,
  isForgotPasswordModalOpen: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "OPEN_SIDEBAR":
      return { ...state, isSidebarOpen: true };
    case "CLOSE_SIDEBAR":
      return { ...state, isSidebarOpen: false };
    case "OPEN_SEARCHBAR":
      return { ...state, isSearchbarOpen: true };
    case "CLOSE_SEARCHBAR":
      return { ...state, isSearchbarOpen: false };
    case "OPEN_SIGNIN_MODAL":
      return { ...state, isSigninModalOpen: true };
    case "CLOSE_SIGNIN_MODAL":
      return { ...state, isSigninModalOpen: false };
    case "OPEN_SIGNUP_MODAL":
      return { ...state, isSignupModalOpen: true };
    case "CLOSE_SIGNUP_MODAL":
      return { ...state, isSignupModalOpen: false };
    case "OPEN_FORGOT_PASSWORD_MODAL":
      return { ...state, isForgotPasswordModalOpen: true };
    case "CLOSE_FORGOT_PASSWORD_MODAL":
      return { ...state, isForgotPasswordModalOpen: false };
    case "CLOSE_ALL":
      return { ...initialState };
    default:
      return state;
  }
}

const UIContext = createContext();

export function UIProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UIContext.Provider value={{ state, dispatch }}>
      {children}
    </UIContext.Provider>
  );
}

export { UIContext };
