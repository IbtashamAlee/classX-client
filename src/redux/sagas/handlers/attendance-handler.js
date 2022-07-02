import {call, put} from 'redux-saga/effects';
import {
  getSpecificAttendanceRequest,
  getAttendanceRequest,
  participateAttendanceRequest,
  createAttendanceRequest}
  from '../requests/attendance-requests'
import {ActionTypes} from "../../constants/actions-types";
import {getFeedRequest} from "../requests/feed-request";

export function* handleGetAttendanceRequest(action) {
  try {
    const response = yield call(getAttendanceRequest, action.class_id, action.record, action.page);
    const { data } = response;
    yield put({ type: ActionTypes.GET_ATTENDANCE_SUCCESS, data: data?.sort(function(a, b){return b.id - a.id}) });
  } catch (err) {
    yield put({type: ActionTypes.ADD_TOAST, payload: {text: "Unable to fetch attendance", danger: true}})
    yield put({type: ActionTypes.GET_ATTENDANCE_FAIL})
    console.log(err);
  }
}

export function* handleGetSpecificAttendanceRequest(action) {
  try {
    const response = yield call(getSpecificAttendanceRequest, action.class_id, action.attendance_id);
    const { data } = response;
    yield put({ type: ActionTypes.GET_SPECIFIC_ATTENDANCE_SUCCESS, data: data });
  } catch (err) {
    yield put({type: ActionTypes.GET_SPECIFIC_ATTENDANCE_FAIL})
    yield put({type: ActionTypes.ADD_TOAST, payload: {text: "Unable to fetch attendance", danger: true}})
    console.log(err);
  }
}

export function* handleCreateAttendanceRequest(action) {
  try {
    const response = yield call(createAttendanceRequest, action.class_id, action.title);
    const { data } = response;
    yield put({ type: ActionTypes.CREATE_ATTENDANCE_SUCCESS });
    try {
      const response = yield call(getAttendanceRequest, action.class_id, 40, 1);
      const { data } = response;
      yield put({ type: ActionTypes.GET_ATTENDANCE_SUCCESS, data: data?.sort(function(a, b){return b.id - a.id}) });
      try {
        const response = yield call(getFeedRequest, action.class_id, 20, 1);
        const { data } = response;
        yield put({ type: ActionTypes.GET_FEED_SUCCESS, data: data });
      } catch (err) {
        yield put({type: ActionTypes.GET_FEED_FAIL})
        console.log(err);
      }
    } catch (err) {
      yield put({type: ActionTypes.GET_ATTENDANCE_FAIL})
      console.log(err);
    }
    yield put({type: ActionTypes.ADD_TOAST, payload: {text: "Attendance Created!"}})
  } catch (err) {
    yield put({type: ActionTypes.ADD_TOAST, payload: {text: "Unable to create attendance", danger: true}})
    yield put({type: ActionTypes.CREATE_ATTENDANCE_FAIL})
    console.log(err);
  }
}

export function* handleParticipateInAttendanceRequest(action) {
  try {
    const response = yield call(participateAttendanceRequest, action.class_id, action.attendance_id);
    const { data } = response;
    yield put({ type: ActionTypes.PARTICIPATE_IN_ATTENDANCE_SUCCESS });
    try {
      const response = yield call(getFeedRequest, action.class_id, 20, 1);
      const { data } = response;
      yield put({ type: ActionTypes.GET_FEED_SUCCESS, data: data });
    } catch (err) {
      yield put({type: ActionTypes.GET_FEED_FAIL})
      console.log(err);
    }
    yield put({type: ActionTypes.ADD_TOAST, payload: {text: "Attendance Marked!"}})
  } catch (err) {
    yield put({type: ActionTypes.PARTICIPATE_IN_ATTENDANCE_FAIL})
    yield put({type: ActionTypes.ADD_TOAST, payload: {text: "Unable to participate in attendance", danger: true}})
    console.log(err);
  }
}
