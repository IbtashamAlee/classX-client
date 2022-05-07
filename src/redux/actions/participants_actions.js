import {ActionTypes} from "../constants/actions-types";

export const getParticipantsInClass = (id) => {
  return {
    type: ActionTypes.GET_PARTICIPANTS_CLASS,
    id: id,
  };
};

export const addParticipantsInClass = (class_id, users) => {
  return {
    type: ActionTypes.ADD_PARTICIPANTS_IN_CLASS,
    class_id: class_id,
    users: users,
  };
}

export const removeParticipantsInClass = (class_id, users) => {
  return {
    type: ActionTypes.REMOVE_PARTICIPANT,
    class_id: class_id,
    users: users,
  };
}
