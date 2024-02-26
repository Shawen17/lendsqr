import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  LOGOUT,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  AUTHENTICATION_SUCCESS,
  AUTHENTICATION_FAIL,
  UPDATE_STAFF_STATUS_SUCCESS,
  UPDATE_STAFF_STATUS_FAIL,
  ADD_USER_TO_PORTFOLIO_SUCCESS,
  ADD_USER_TO_PORTFOLIO_FAIL,
  PORTFOLIO_RETRIVAL_FAIL,
  PORTFOLIO_RETRIVAL_SUCCESS,
  PORTFOLIO_UPDATE_SUCCESS,
  PORTFOLIO_UPDATE_FAIL,
  RESET_DONE,
} from "../action/types";

const initialState = {
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  isAuthenticated: null,
  user: null,
  failed: false,
  isStaff: false,
  portfolioAdded: false,
  portfolio: null,
  portfolioUpdated: false,
};

export default function foo(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("access", payload.access);

      return {
        ...state,
        isAuthenticated: true,
        access: payload.access,
        refresh: payload.refresh,
      };
    case USER_LOADED_SUCCESS:
      localStorage.setItem("email", payload.email);
      localStorage.setItem("state", payload.state);
      return {
        ...state,
        user: payload,
        failed: false,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
    case USER_LOADED_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        failed: true,
      };
    case AUTHENTICATION_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        failed: false,
      };
    case AUTHENTICATION_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        failed: true,
      };
    case UPDATE_STAFF_STATUS_SUCCESS:
      return {
        ...state,
        isStaff: payload.is_staff,
      };
    case UPDATE_STAFF_STATUS_FAIL:
      return {
        ...state,
      };
    case ADD_USER_TO_PORTFOLIO_SUCCESS:
      return {
        ...state,
        portfolioAdded: true,
      };
    case ADD_USER_TO_PORTFOLIO_FAIL:
      return {
        ...state,
      };
    case PORTFOLIO_RETRIVAL_SUCCESS:
      return {
        ...state,
        portfolio: payload,
      };
    case PORTFOLIO_RETRIVAL_FAIL:
      return {
        ...state,
      };
    case PORTFOLIO_UPDATE_SUCCESS:
      return {
        ...state,
        portfolioUpdated: true,
      };
    case PORTFOLIO_UPDATE_FAIL:
      return {
        ...state,
      };

    case RESET_DONE:
      return {
        ...state,
        failed: false,
      };

    case LOGIN_FAIL:
      return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: false,
        user: null,
        failed: true,
        isStaff: false,
      };
    case SIGNUP_FAIL:
    case LOGOUT:
      localStorage.removeItem("email");
      localStorage.removeItem("state");
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: false,
        user: null,
        failed: false,
        isStaff: false,
        portfolio: null,
      };
    case PASSWORD_RESET_SUCCESS:
    case PASSWORD_RESET_FAIL:
    case PASSWORD_RESET_CONFIRM_SUCCESS:
    case PASSWORD_RESET_CONFIRM_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
}
