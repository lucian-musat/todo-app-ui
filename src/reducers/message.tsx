import { SET_MESSAGE, CLEAR_MESSAGE, IAction } from "../actions/types";

const initialState = {};

export const message = (state = initialState, action: IAction) => {
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGE:
      return { message: payload };

    case CLEAR_MESSAGE:
      return { message: "" };

    default:
      return state;
  }
};
