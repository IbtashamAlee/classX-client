import {call, put} from 'redux-saga/effects';
import {ActionTypes} from "../../constants/actions-types";
import {createClassRequest} from "../requests/class-requests";
import {getStudentTeacherClassesRequest} from "../requests/user-requests";

export function* handleCreateIndependentRequest(action) {
  try {
    const response1 = yield call(createClassRequest, action.name, action.description);
    try {
      const response = yield call(getStudentTeacherClassesRequest);
      const { data } = response;
      yield put({ type: ActionTypes.GET_STUDENT_TEACHER_CLASSES_SUCCESS, data: data });
    } catch (err) {
      yield put({ type: ActionTypes.GET_STUDENT_TEACHER_CLASSES_FAIL});
    }
    yield put({ type: ActionTypes.CREATE_INDEPENDENT_CLASS_SUCCESS });
    // action.navigate('/verify');
  } catch (err) {
    yield put({type: ActionTypes.CREATE_INDEPENDENT_CLASS_FAIL})
    console.log(err);
  }
}
