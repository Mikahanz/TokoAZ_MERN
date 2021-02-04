import { createStore, combineReducers, applyMiddleware } from 'redux';
import {
  productListReducer,
  productDetailsReducer,
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// Combine all reducers to object reducer
const reducer = combineReducers({
  // 'productList' is the name of the state
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
});

// Get cartItems from local storage
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

// Initial State of the app
const initialState = {
  cart: { cartItems: cartItemsFromStorage },
};

// Create thunk middleware
const middleware = [thunk];

// Create STORE
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
