import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UIProvider } from "./context/UIContext.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <UIProvider>
            <Toaster
              position="top-right"
              reverseOrder={false}
              toastOptions={{
                duration: 3000,
                style: {
                  background: "#000",
                  color: "#fff",
                  borderRadius: "10px",
                  padding: "12px 16px",
                },
                success: {
                  style: {
                    background: "#000",
                  },
                  iconTheme: {
                    primary: "#fff",
                    secondary: "#16a34a",
                  },
                },
                error: {
                  style: {
                    background: "#000",
                  },
                  iconTheme: {
                    primary: "#fff",
                    secondary: "#dc2626",
                  },
                },
              }}
            />
            <App />
          </UIProvider>
        </GoogleOAuthProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);
