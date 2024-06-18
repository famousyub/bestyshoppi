import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./index.css";
import 'react-range-slider-input/dist/style.css';
import { Provider } from "react-redux";
import Store from "./redux/store.js";
import App2 from "./App2.jsx";

ReactDOM.render(
  <Provider store={Store}>
    <React.StrictMode>
      <App2 />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
