import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App";
import "./index.css";
import { Toaster } from "react-hot-toast";
import ErrorBoundary from "./components/common/ErrorBoundary";

ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
).render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <App />
        <Toaster position="top-right" />
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>
);
