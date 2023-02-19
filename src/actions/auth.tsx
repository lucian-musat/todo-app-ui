import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
  IAction,
} from "./types";

import { registerUser, loginUser, logoutUser } from "../services/auth-service";

export const register =
  (name: string, email: string, password: string) =>
  (dispatch: (actionDetails: IAction) => void) => {
    return registerUser(name, email, password).then(
      (response) => {
        dispatch({
          type: REGISTER_SUCCESS,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });

        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch({
          type: REGISTER_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });

        return Promise.reject();
      }
    );
  };

export const login =
  (email: string, password: string) =>
  (dispatch: (actionDetails: IAction) => void) => {
    return loginUser(email, password).then(
      (data) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: data },
        });

        return Promise.resolve();
      },
      (error) => {
        const message =
          error.response.data.description ??
          ((error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString());

        dispatch({
          type: LOGIN_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });

        return Promise.reject();
      }
    );
  };

export const logout = () => (dispatch: (actionDetails: IAction) => void) => {
  logoutUser();

  dispatch({
    type: LOGOUT,
  });
};
