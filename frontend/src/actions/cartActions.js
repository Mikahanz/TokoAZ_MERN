import axios from 'axios';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants';

// Add Item To Cart ACTION
export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty: qty,
      },
    });

    // Saving the cart state to the localstorage (Like Cached)
    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    console.log(`Add Item To Cart Action Failed! -> ${error}`);
  }
};

// Remove Item From Cart ACTION
export const removeFromCart = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: {
        product: id,
      },
    });

    // Saving the cart state to the localstorage (Like Cached)
    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    console.log(`Remove Item From Cart Action Failed! -> ${error}`);
  }
};

// Save Shipping Address ACTION
export const saveShippingAddress = (data) => async (dispatch) => {
  try {
    dispatch({
      type: CART_SAVE_SHIPPING_ADDRESS,
      payload: data,
    });

    // Saving shipping address state to the localstorage (Cached)
    localStorage.setItem('shippingAddress', JSON.stringify(data));
  } catch (error) {
    console.log(`Saving shipping address Action failed! -> ${error}`);
  }
};

// Save Payment Method ACTION
export const savePaymentMethod = (method) => async (dispatch) => {
  try {
    dispatch({
      type: CART_SAVE_PAYMENT_METHOD,
      payload: method,
    });

    // Saving shipping address state to the localstorage (Cached)
    localStorage.setItem('paymentMethod', JSON.stringify(method));
  } catch (error) {
    console.log(`Save Payment Method Action failed! -> ${error}`);
  }
};
