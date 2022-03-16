import {ActionTypes} from "../constants/actions-types";

export const getUser = () => {
  return {
    type: ActionTypes.SET_USER_ACTION,
  };
};
