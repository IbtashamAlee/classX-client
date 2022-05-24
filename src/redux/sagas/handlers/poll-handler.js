import {call, put} from 'redux-saga/effects';
import {ActionTypes} from "../../constants/actions-types";
import {participatePollRequest} from "../requests/poll-requests";
import {getFeedRequest} from "../requests/feed-request";

export function* handlePollParticipateRequest(action) {
  try {
    const response = yield call(participatePollRequest, action.poll_id, action.selectedOptionId);
    const { data } = response;
    yield put({ type: ActionTypes.PARTICIPATE_POLL_SUCCESS });
    try {
      const response = yield call(getFeedRequest, action.class_id, 20, 1);
      const { data } = response;
      yield put({ type: ActionTypes.GET_FEED_SUCCESS, data: data });
    } catch (err) {
      yield put({type: ActionTypes.GET_FEED_FAIL})
      console.log(err);
    }
  } catch (err) {
    yield put({type: ActionTypes.PARTICIPATE_POLL_FAIL})
    console.log(err);
  }
}
