import { Menu } from "lucide-react";
import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { SidebarMenu } from "./../common/SidebarMenu";
import { SignInModal } from "./SignInModal";
import { MobileSearchbar } from "./MobileSearchbar";
import { HeaderActions } from "./HeaderActions";
import { SignUpModal } from "./SignupModal";
import { ForgotPasswordModal } from "./ForgotPasswordModal";
import { useUI } from "../../context/useUi";

export const Header = forwardRef((props, ref) => {
  const { state, dispatch } = useUI();
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

          {/* {state.isSearchbarOpen && <MobileSearchbar dispatch={dispatch} />} */}
        </div>
      </header>
    </>
  );
});
