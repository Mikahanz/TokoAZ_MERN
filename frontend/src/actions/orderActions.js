import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_LIST_MINE_REQUEST,
  ORDER_LIST_MINE_SUCCESS,
  ORDER_LIST_MINE_FAIL,
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

    // Getting data back after success POST order Operation
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

// LIST ORDER DETAILS ACTION
export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    // Create Headers with Token for GET operation
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Getting data back after success GET user details by id Operation
    const { data } = await axios.get(`/api/orders/${id}`, config);

    // Dispatch the data to reducer
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });

    // Save to localstorage
    // localStorage.setItem('orderDetails', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// PAY ORDER ACTION
export const payOrder = (orderId, paymentResult) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    // Create Headers with Token for GET operation
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Getting data back after success GET user PAY by id Operation
    const { data } = await axios.put(
      `/api/orders/${orderId}/pay`,
      paymentResult,
      config
    );

    // Dispatch the data to reducer
    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    });

    // Save to localstorage
    // localStorage.setItem('orderPAY', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// List User Order ACTION
export const listMineOrders = (orderId, paymentResult) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: ORDER_LIST_MINE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    // Create Headers with Token for GET operation
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Getting data back after success GET user PAY by id Operation
    const { data } = await axios.get(`/api/orders/myorders`, config);

    // Dispatch the data to reducer
    dispatch({
      type: ORDER_LIST_MINE_SUCCESS,
      payload: data,
    });

    // Save to localstorage
    // localStorage.setItem('orderPAY', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: ORDER_LIST_MINE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
