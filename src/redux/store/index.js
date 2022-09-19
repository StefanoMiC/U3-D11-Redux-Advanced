import { configureStore, combineReducers } from "@reduxjs/toolkit";
// CORE REDUX LIBRARY @reduxjs/toolkit
// import mainReducer from "../reducers";
import cartReducer from "../reducers/cart";
import userReducer from "../reducers/user";
import bookReducer from "../reducers/book";

const bigReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  book: bookReducer,
});

// with combineReducers we are re-creating the structure we had before with our mainReducer:
// const initialState = {
//   cart: {
//     content: [],
//   },
//   user: {
//     name: "",
//   },
//   book: {
//     stock: []
//   }
// };

//configure store creates the actual redux store
const store = configureStore({
  //this configuration object(s) will be necessary to set up the redux store properly
  reducer: bigReducer,
});

export default store;
