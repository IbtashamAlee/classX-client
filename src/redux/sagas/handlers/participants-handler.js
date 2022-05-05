import {call, put} from 'redux-saga/effects';
import {getParticipantsInClassRequest, addParticipantsInClassRequest} from '../requests/participants-requests'
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

export function* handleAddParticipants(action) {
  try {
    const response = yield call(addParticipantsInClassRequest, action.class_id, action.users);
    const { data } = response;
    yield put({ type: ActionTypes.ADD_PARTICIPANTS_IN_CLASS_SUCCESS, data: data });
    try {
      const response = yield call(getParticipantsInClassRequest, action.class_id);
      const { data } = response;
      yield put({ type: ActionTypes.GET_PARTICIPANTS_CLASS_SUCCESS, data: data });
    } catch (err) {
      yield put({type: ActionTypes.GET_PARTICIPANTS_CLASS_FAIL});
      console.log(err);
    }
  } catch (err) {
    yield put({type: ActionTypes.ADD_PARTICIPANTS_IN_CLASS_FAIL});
    console.log(err);
  }
}
