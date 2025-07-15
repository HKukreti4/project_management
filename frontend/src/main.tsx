import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/api/v1";
axios.defaults.headers.common["Content-Type"] =
  "application/json; charset=UTF-8";
axios.defaults.withCredentials = true;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
