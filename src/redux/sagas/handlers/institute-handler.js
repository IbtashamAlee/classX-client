import {call, put} from 'redux-saga/effects';
import {requestNewInstituteRequest} from '../requests/institute-requests'
import {ActionTypes} from "../../constants/actions-types";

export function* handleRequestInstituteRequest(action) {
  try {
    const response = yield call(requestNewInstituteRequest, action.name, action.institute_type);
    const { data } = response;
    yield put({ type: ActionTypes.REQUEST_INSTITUTE_SUCCESS });
  } catch (err) {
    yield put({type: ActionTypes.REQUEST_INSTITUTE_FAIL})
    console.log(err);
  }
}
