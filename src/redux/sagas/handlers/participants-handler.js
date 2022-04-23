import {call, put} from 'redux-saga/effects';
import {getParticipantsInClassRequest} from '../requests/participants-requests'
import {ActionTypes} from "../../constants/actions-types";

export function* handleGetParticipants(action) {
  try {
    const response = yield call(getParticipantsInClassRequest, action.id);
    const { data } = response;
    yield put({ type: ActionTypes.GET_PARTICIPANTS_CLASS_SUCCESS, data: data });
  } catch (err) {
    yield put({type: ActionTypes.GET_PARTICIPANTS_CLASS_FAIL});
    console.log(err);
  }
}
