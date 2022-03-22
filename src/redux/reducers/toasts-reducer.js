import { ActionTypes } from "../constants";

export default function toasts(state = [], action) {
  const { payload, type } = action;

  switch (type) {
    case ActionTypes.ADD_TOAST:
      return [payload, ...state];

    case ActionTypes.REMOVE_TOAST:
      return state.filter(toast => toast.id !== payload);

    default:
      return state;
  }
}
