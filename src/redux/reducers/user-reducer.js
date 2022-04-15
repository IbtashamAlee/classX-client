import {ActionTypes} from "../constants/actions-types";

export const setRolesReducer = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.GET_ROLES_SUCCESS:
      return { ...state, roles: action.data };
    default:
      return state;
  }
};
