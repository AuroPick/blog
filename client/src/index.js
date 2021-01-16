import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

import { Auth } from "./context/Context";

ReactDOM.render(
  <Auth>
    <App />
  </Auth>,
  document.getElementById("root")
);
