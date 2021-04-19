import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <BrowserRouter>
    <CookiesProvider>
    <App />
  </CookiesProvider>,
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
