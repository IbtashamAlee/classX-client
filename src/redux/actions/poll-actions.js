import {ActionTypes} from "../constants/actions-types";

export const pollParticipation = (class_id, poll_id, selectedOptionId) => {
  return {
    type: ActionTypes.PARTICIPATE_POLL,
    class_id: class_id,
    poll_id: poll_id,
    selectedOptionId: selectedOptionId
  };
};
