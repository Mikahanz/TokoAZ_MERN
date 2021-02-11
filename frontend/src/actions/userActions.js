import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
} from '../constants/userConstants';
import axios from 'axios';
import { ORDER_LIST_MINE_RESET } from '../constants/orderConstants';

// *LOGIN USER ACTION -------------------------------------------
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    // Create Headers for POST operation
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Getting data back after success POST Operation
    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    );

    // Dispatch the data to reducer
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    // Save userInfo to localStorage (saved to cache)
    // This allows users to be logged in case close & reopen browser
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// *LOGOUT USER ACTION ------------------------------------------
export const logout = () => async (dispatch) => {
  // Remove userInfo from localStorage (remove from cache)
  localStorage.removeItem('userInfo');
  // Dispatch LOGOUT to reducer
  dispatch({
    type: USER_LOGOUT,
  });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: ORDER_LIST_MINE_RESET });
};

// *REGISTER USER ACTION --------------------------------------------
export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    // Create Headers for POST operation
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Getting data back after success POST Operation
    const { data } = await axios.post(
      '/api/users',
      { name, email, password },
      config
    );

    // Dispatch the data to reducer
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    // Login user after registered
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    // Save userInfo to localStorage (saved to cache)
    // This allows users to be logged in case close & reopen browser
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// *GET USER DETAILS ACTION ----------------------------------------
export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
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

    // Getting data back after success GET user's detail Operation
    const { data } = await axios.get(`/api/users/${id}`, config);

    // Dispatch the data to reducer
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// // Reset User Details to Empty user
// export const resetUserDetails = () => (dispatch) => [
//   dispatch({ type: USER_DETAILS_RESET }),
// ];

// *UPDATE USER PROFILE ACTION ----------------------------------------
export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
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

    // Getting data back after success GET user's detail Operation
    const { data } = await axios.put(`/api/users/profile`, user, config);

    // Dispatch the data to reducer
    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });

    // Dispatch the Login Reducer (Refreshing the userLogin info)
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    // Save to localstorage
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
