import {call, put} from 'redux-saga/effects';
import {getAssessmentsRequest, getPublicAssessmentsRequest} from '../requests/assessments-requests'
import {ActionTypes} from "../../constants/actions-types";

export function* handleGetAssessmentsRequest(action) {
  try {
    const response = yield call(getAssessmentsRequest);
    const { data } = response;
    yield put({ type: ActionTypes.GET_ASSESSMENTS_SUCCESS, data: data });
  } catch (err) {
    yield put({type: ActionTypes.GET_ASSESSMENTS_FAIL})
    console.log(err);
  }
}

export function* handleGetPublicAssessmentsRequest(action) {
  try {
    const response = yield call(getPublicAssessmentsRequest);
    const { data } = response;
    yield put({ type: ActionTypes.GET_PUBLIC_ASSESSMENTS_SUCCESS, data: data });
  } catch (err) {
    yield put({type: ActionTypes.GET_PUBLIC_ASSESSMENTS_FAIL})
    console.log(err);
  }
}
