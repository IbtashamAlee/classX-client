import {call, put} from 'redux-saga/effects';
import {ActionTypes} from "../../constants/actions-types";
import {getFeedRequest} from "../requests/feed-request";

export function* handleGetFeedRequest(action) {
  try {
    const response = yield call(getFeedRequest, action.class_id, action.record, action.page);
    const { data } = response;
    yield put({ type: ActionTypes.GET_FEED_SUCCESS, data: data });
  } catch (err) {
    yield put({type: ActionTypes.GET_FEED_FAIL})
    console.log(err);
  }
}
