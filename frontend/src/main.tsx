import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { api } from "./api/api.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApiProvider api={api}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApiProvider>
  </StrictMode>
);
