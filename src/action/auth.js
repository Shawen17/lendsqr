import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  AUTHENTICATION_SUCCESS,
  AUTHENTICATION_FAIL,
  LOGOUT,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  UPDATE_STAFF_STATUS_FAIL,
  UPDATE_STAFF_STATUS_SUCCESS,
} from "./types";
import axios from "axios";

export const checkIsAuthenticated = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    const body = JSON.stringify({ token: localStorage.getItem("access") });

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_LENDSQR_API_URL}/auth/jwt/verify/`,
        body,
        config
      );
      if (res.data.code !== "token_not_valid") {
        dispatch({
          type: AUTHENTICATION_SUCCESS,
        });
      } else {
        dispatch({
          type: AUTHENTICATION_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: AUTHENTICATION_FAIL,
      });
    }

    dispatch({
      type: AUTHENTICATION_SUCCESS,
    });
  } else {
    dispatch({
      type: AUTHENTICATION_FAIL,
    });
  }
};

export const load_user = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_LENDSQR_API_URL}/auth/users/me/`,
        config
      );
      dispatch({
        type: USER_LOADED_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: USER_LOADED_FAIL,
      });
    }
  } else {
    dispatch({
      type: USER_LOADED_FAIL,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_LENDSQR_API_URL}/auth/jwt/create/`,
      body,
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(load_user());
    dispatch(is_staff(email));
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const signup =
  (email, first_name, last_name, state, password, re_password) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      email,
      first_name,
      last_name,
      state,
      password,
      re_password,
    });

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_LENDSQR_API_URL}/auth/users/`,
        body,
        config
      );
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: SIGNUP_FAIL,
      });
    }
  };

export const is_staff = (email) => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_LENDSQR_API_URL}/api/get_staff_status/`,
        {
          params: { email: email },
        },
        config
      );
      dispatch({
        type: UPDATE_STAFF_STATUS_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: UPDATE_STAFF_STATUS_FAIL,
      });
    }
  } else {
    dispatch({
      type: UPDATE_STAFF_STATUS_FAIL,
    });
  }
};

//   export const verify = (uid, token) => async (dispatch) => {
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };

//     const body = JSON.stringify({ uid, token });

//     try {
//       await axios.post(
//         `${process.env.REACT_APP_GIVEAWAYNOW_API_URL}/auth/users/activation/`,
//         body,
//         config
//       );
//       dispatch({
//         type: ACTIVATION_SUCCESS,
//       });
//     } catch (err) {
//       dispatch({
//         type: ACTIVATION_FAIL,
//       });
//     }
//   };

export const reset_password = (email) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email });

  try {
    await axios.post(
      `${process.env.REACT_APP_LENDSQR_API_URL}/auth/users/reset_password/`,
      body,
      config
    );
    dispatch({
      type: PASSWORD_RESET_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: PASSWORD_RESET_FAIL,
    });
  }
};

export const password_reset_confirm =
  (uid, token, new_password, re_new_password) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ uid, token, new_password, re_new_password });
    try {
      await axios.post(
        `${process.env.REACT_APP_LENDSQR_API_URL}/auth/users/reset_password_confirm/`,
        body,
        config
      );
      dispatch({
        type: PASSWORD_RESET_CONFIRM_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: PASSWORD_RESET_CONFIRM_FAIL,
      });
    }
  };

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

//   export const fetchCart = (email) => async (dispatch) => {
//     if (email) {
//       const body = JSON.stringify({ email });
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `JWT ${localStorage.getItem("access")}`,
//           Accept: "application/json",
//         },
//       };
//       try {
//         const res = await axios.put(
//           `${process.env.REACT_APP_GIVEAWAYNOW_API_URL}/api/cart/display/`,
//           body,
//           config
//         );
//         if (res.data.code !== "token_not_valid") {
//           dispatch({
//             type: CART_LOADED_SUCCESS,
//             payload: res.data,
//           });
//         } else {
//           dispatch({
//             type: CART_LOADED_FAIL,
//           });
//         }
//       } catch (err) {
//         dispatch({
//           type: CART_LOADED_FAIL,
//         });
//       }
//     } else {
//       dispatch({
//         type: CART_LOADED_FAIL,
//       });
//     }
//   };

//   export const addToCart = (email, product, count) => async (dispatch) => {
//     if (localStorage.getItem("access")) {
//       const body = JSON.stringify({
//         product_id: product.id,
//         email: email,
//         quantity: count,
//       });
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `JWT ${localStorage.getItem("access")}`,
//           Accept: "application/json",
//         },
//       };
//       try {
//         const res = await axios.put(
//           `${process.env.REACT_APP_GIVEAWAYNOW_API_URL}/api/update/cart/`,
//           body,
//           config
//         );
//         if (res.data.code !== "token_not_valid") {
//           dispatch({
//             type: CART_ADDED_SUCCESS,
//             payload: res.data,
//           });
//           dispatch(fetchCart(localStorage.getItem("email")));
//         } else {
//           dispatch({
//             type: CART_ADDED_FAIL,
//           });
//         }
//       } catch (err) {
//         if (err.response.status === 401) {
//           dispatch(logout());
//         } else if (err.response.status === 400) {
//           alert(`only ${product.quantity} of this item is left`);
//         } else {
//           alert("this item is no longer available");
//         }
//       }
//     } else {
//       dispatch({
//         type: CART_ADDED_FAIL,
//       });
//     }
//   };

//   export const checkout = () => async (dispatch) => {
//     dispatch({
//       type: CART_ADDED_FAIL,
//     });
//   };

//   export const addMultiToCart = (email, product) => async (dispatch) => {
//     if (localStorage.getItem("access")) {
//       const [productIds, counts] = extractIds(product);
//       const body = JSON.stringify({
//         product_id: productIds,
//         email: email,
//         quantity: counts,
//       });
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `JWT ${localStorage.getItem("access")}`,
//           Accept: "application/json",
//         },
//       };
//       try {
//         const res = await axios.put(
//           `${process.env.REACT_APP_GIVEAWAYNOW_API_URL}/api/update/multicart/`,
//           body,
//           config
//         );
//         if (res.data.code !== "token_not_valid") {
//           dispatch({
//             type: CART_ADDED_SUCCESS,
//             payload: res.data,
//           });
//           dispatch(fetchCart(localStorage.getItem("email")));
//         } else {
//           dispatch({
//             type: CART_ADDED_FAIL,
//           });
//         }
//       } catch (err) {
//         if (err.response.status === 401) {
//           dispatch(logout());
//         } else if (err.response.status === 400) {
//           alert(`only ${product.quantity} of this item is left`);
//         } else {
//           alert("this item is no longer available");
//         }
//       }
//     } else {
//       dispatch({
//         type: CART_ADDED_FAIL,
//       });
//     }
//   };
