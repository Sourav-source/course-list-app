import { combineReducers, configureStore } from "@reduxjs/toolkit";
import courseReducer from "./courseSlice";
import userReducer from "./registeredUsersSlice";
import loggedInUserReducer from "./loggedinUserSlice";

import courseDetailsReducer from "./courseDetailSlice";

import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";

const persistConfig = {
  key: "root",
  storage,
};

const myCombinedReducer = combineReducers({
  course: courseReducer,
  user: userReducer,
  loggedInUser: loggedInUserReducer,
  courseDetails: courseDetailsReducer,
});

const localStorageReducer = persistReducer(persistConfig, myCombinedReducer);

const store = configureStore({
  reducer: localStorageReducer,
});

export default store;
