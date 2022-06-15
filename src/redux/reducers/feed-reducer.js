import {ActionTypes} from "../constants/actions-types";

export const setFeed = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.GET_FEED_SUCCESS:
      return { ...state, feed: action.data };
    case ActionTypes.CLEAR_FEED:
      return { ...state, feed: [] };
    default:
      return state;
  }
};
