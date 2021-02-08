import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
} from '../constants/orderConstants';
import axios from 'axios';

// *CREATE ORDER ACTION ----------------------------------------
export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    // Create Headers with Token for POST operation
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Getting data back after success GET user's detail Operation
    const { data } = await axios.post(`/api/orders`, order, config);

    // Dispatch the data to reducer
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });

    // Save to localstorage
    //localStorage.setItem('orderCreate', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
