import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import i18n from "./i18n.js";
import { Provider } from 'react-redux';
import store from "./store.js";
import "react-big-calendar/lib/css/react-big-calendar.css"

createRoot(document.getElementById("root")).render(
  <Provider  store={store}>
    <App />
  </Provider>
);
