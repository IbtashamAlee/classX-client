import {call, put} from 'redux-saga/effects';
import {ActionTypes} from "../../constants/actions-types";
import {createClassRequest, joinClassRequest} from "../requests/class-requests";
import {getStudentTeacherClassesRequest} from "../requests/user-requests";

export function* handleCreateIndependentClassRequest(action) {
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
    action.navigate('/');
    yield put({type: ActionTypes.ADD_TOAST, payload: {text: "Class Added Successfully!"}})
  } catch (err) {
    yield put({type: ActionTypes.CREATE_INDEPENDENT_CLASS_FAIL})
    yield put({type: ActionTypes.ADD_TOAST, payload: {text: "Unable to add class", danger: true}})
    console.log(err);
  }
}

export function* handleJoinClassRequest(action) {
  try {
    const response1 = yield call(joinClassRequest, action.code);
    try {
      const response = yield call(getStudentTeacherClassesRequest);
      const { data } = response;
      yield put({ type: ActionTypes.GET_STUDENT_TEACHER_CLASSES_SUCCESS, data: data });
    } catch (err) {
      yield put({ type: ActionTypes.GET_STUDENT_TEACHER_CLASSES_FAIL});
    }
    yield put({ type: ActionTypes.JOIN_CLASS_SUCCESS });
    action.navigate('/');
    yield put({type: ActionTypes.ADD_TOAST, payload: {text: "Class Joined Successfully", message: "You can now view class feed"}})
  } catch (err) {
    yield put({type: ActionTypes.JOIN_CLASS_FAIL})
    yield put({type: ActionTypes.ADD_TOAST, payload: {text: "Unable to join class", danger: true}})
    console.log(err);
  }
}
