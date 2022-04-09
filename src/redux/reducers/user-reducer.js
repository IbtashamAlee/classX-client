import {ActionTypes} from "../constants/actions-types";

export const setUserReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER_ACTION_SUCCESS:
      return {...state, ...action.user};
    default:
      return state;
  }
};
