import {ActionTypes} from "../constants/actions-types";

export const getUser = () => {
  return {
    type: ActionTypes.SET_USER_ACTION,
  };
};

export const getUserSuccess = (user) => {
  return {
    type: ActionTypes.SET_USER_ACTION_SUCCESS,
    user: user,
  };
};
