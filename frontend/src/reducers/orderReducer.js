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
  ORDER_PAY_RESET,
  ORDER_LIST_MINE_REQUEST,
  ORDER_LIST_MINE_SUCCESS,
  ORDER_LIST_MINE_FAIL,
  ORDER_LIST_MINE_RESET,
} from '../constants/orderConstants';

// ORDER CREATE REDUCER
export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      };

    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };

    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// ORDER DETAILS REDUCER
export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };

    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// ORDER PAY REDUCER
export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

// LIST USER ORDERS REDUCER
export const orderListMineReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_MINE_REQUEST:
      return {
        loading: true,
      };

    case ORDER_LIST_MINE_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    case ORDER_LIST_MINE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_LIST_MINE_RESET:
      return { order: [] };

    default:
      return state;
  }
};
