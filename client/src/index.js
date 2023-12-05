import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { Provider } from "react-redux";
import store from "./redux/store";

import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { BrowserRouter } from "react-router-dom";

const myPersistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
      <Provider store={store}>
      <PersistGate persistor={myPersistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </PersistGate>
    </Provider>
);
