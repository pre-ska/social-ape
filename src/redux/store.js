import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk"; // middleware za dispatch()
import userReducer from "./reducers/userReducer";
import dataReducer from "./reducers/dataReducer";
import uiReducer from "./reducers/uiReducer";

const initialState = {};

const middleware = [thunk]; // thunk se koristi za dispatch()

const reducers = combineReducers({
  user: userReducer,
  data: dataReducer,
  UI: uiReducer
});

const store = createStore(
  reducers,
  initialState,
  applyMiddleware(...middleware)
);

export default store;
