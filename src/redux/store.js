import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import productReducer from "./ProductReducer";

const rootReducer = combineReducers({productReducer});

export const store = createStore(rootReducer, applyMiddleware(thunk));
