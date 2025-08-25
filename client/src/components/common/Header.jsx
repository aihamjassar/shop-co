import { Menu } from "lucide-react";
import { forwardRef, useReducer } from "react";
import { Link } from "react-router-dom";
import { SidebarMenu } from "./../common/SidebarMenu";
import { SignInModal } from "./SignInModal";
import { MobileSearchbar } from "./MobileSearchbar";
import { HeaderActions } from "./HeaderActions";
import { SignUpModal } from "./SignupModal";
import { ForgotPasswordModal } from "./ForgotPasswordModal";

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

export const Header = forwardRef((props, ref) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const isOpenOverlay =
    state.isSidebarOpen ||
    state.isSigninModalOpen ||
    state.isSignupModalOpen ||
    state.isForgotPasswordModalOpen;
  const sideMenuClass = state.isSidebarOpen
    ? "translate-x-0"
    : "-translate-x-full";

  return (
    <>
      {state.isSigninModalOpen && <SignInModal dispatch={dispatch} />}
      {state.isSignupModalOpen && <SignUpModal dispatch={dispatch} />}
      {state.isForgotPasswordModalOpen && (
        <ForgotPasswordModal dispatch={dispatch} />
      )}

      <header
        className="fixed inset-0 w-full h-18 z-30 flex items-center bg-white shadow-md"
        role="banner"
        aria-label="Main Navigation"
        ref={ref}
      >
        {isOpenOverlay && (
          <div
            className="absolute top-0 left-0 w-screen h-screen bg-black/30 backdrop-blur-sm backdrop-saturate-50 backdrop-brightness-50 z-40"
            onClick={() => {
              dispatch({ type: "CLOSE_ALL" });
            }}
          />
        )}

        <div className="container mx-auto px-5 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <Menu
              className="cursor-pointer transition-colors duration-300 rounded-md hover:bg-gray-300 lg:hidden"
              onClick={() => dispatch({ type: "OPEN_SIDEBAR" })}
            />
            <h1 className="text-2xl font-extrabold -tracking-wider mb-0.5">
              <Link to={"/"}>SHOP.CO</Link>
            </h1>
          </div>

          <SidebarMenu dispatch={dispatch} sideMenuClass={sideMenuClass} />

          <HeaderActions dispatch={dispatch} />

          {state.isSearchbarOpen && <MobileSearchbar dispatch={dispatch} />}
        </div>
      </header>
    </>
  );
});
