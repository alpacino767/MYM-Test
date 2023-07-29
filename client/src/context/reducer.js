import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
  FORGOT_PASSWORD_BEGIN,
  FORGOT_PASSWORD_ERROR,
  RESET_PASSWORD_BEGIN,
  RESET_PASSWORD_ERROR,
  IMAGE_LOAD_BEGIN,
  IMAGE_LOAD_SUCCESS,
  IMAGE_LOAD_ERROR,
} from "./actions";
import { initialState } from "./appContext";

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Please provide all values!",
    };
  }
  if (action.type === CLEAR_ALERT) {
    return { ...state, showAlert: true, alertType: "", alertText: "" };
  }
  if (action.type === REGISTER_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      showAlert: true,
      alertType: "success",
      alertText: "User created! Redirecting",
    };
  }
  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: "Invalid Credentials",
    };
  }
  if (action.type === LOGIN_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      showAlert: true,
      alertType: "success",
      alertText: "Login Successful! Redirecting",
    };
  }
  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: "Invalid Credentials",
    };
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
    };
  }

  if (action.type === FORGOT_PASSWORD_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === FORGOT_PASSWORD_ERROR) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Please provide your email address",
    };
  }

  if (action.type === RESET_PASSWORD_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === RESET_PASSWORD_ERROR) {
    return {
      ...state,
      isLoading: true,
      alertType: "danger",
      alertText: "User does not exist",
    };
  }

  if (action.type === IMAGE_LOAD_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === IMAGE_LOAD_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      nasaImageDetails: action.payload,
      alertType: "success",
    };
  }
  if (action.type === IMAGE_LOAD_ERROR) {
    return {
      ...state,
      isLoading: true,
      alertType: "danger",
      alertText: "User does not exist",
    };
  }

  throw new Error(`no such action : ${action.type}`);
};

export default reducer;
