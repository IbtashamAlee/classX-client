import {ActionTypes} from "../constants/actions-types";

export const setClassParticipantsReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.GET_PARTICIPANTS_CLASS_SUCCESS:
      return { ...state, participants: action.data };
    case ActionTypes.CLEAR_PARTICIPANTS:
      return { ...state, participants: [] };
    default:
      return state;
  }
};
