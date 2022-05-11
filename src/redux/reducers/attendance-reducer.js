import {ActionTypes} from "../constants/actions-types";

export const setAttendances = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.GET_ATTENDANCE_SUCCESS:
      return { ...state, attendances: action.data };
    default:
      return state;
  }
};
