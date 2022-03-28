import {call, put} from 'redux-saga/effects';
import {getUserRequest} from '../requests/user-requests';
import {ActionTypes} from "../../constants/actions-types";

export function* handleGetUser(action) {
  try {
    const response = yield call(getUserRequest);
    const {data} = response;
    yield put({type: ActionTypes.SET_USER_ACTION_SUCCESS, user: data});
  } catch (err) {
    console.log(err);
  }
}
