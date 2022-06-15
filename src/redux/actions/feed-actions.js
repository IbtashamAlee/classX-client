import {ActionTypes} from "../constants/actions-types";

export const getFeed = (class_id, record, page, navigate = null) => {
  return {
    type: ActionTypes.GET_FEED,
    class_id: class_id,
    record: record,
    page: page,
    navigate: navigate
  };
};

export const clearFeed = () => {
  return {
    type: ActionTypes.CLEAR_FEED
  }
}
