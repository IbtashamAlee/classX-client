import {ActionTypes} from "../constants/actions-types";

export const getParticipantsInClass = (id) => {
  return {
    type: ActionTypes.GET_PARTICIPANTS_CLASS,
    id: id,
  };
};
