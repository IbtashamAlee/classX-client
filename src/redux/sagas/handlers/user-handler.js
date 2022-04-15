import {call, put} from 'redux-saga/effects';
import {
  getRolesRequest,
  getStudentTeacherClassesRequest,
  getDepartmentClassesRequest,
  getInstituteClassesRequest
} from '../requests/user-requests';
import {ActionTypes} from "../../constants/actions-types";

export function* handleGetRoles(action) {
  try {
    const response = yield call(getRolesRequest);
    const { data } = response;
    yield put({ type: ActionTypes.GET_ROLES_SUCCESS, data: data });
  } catch (err) {
    yield put({ type: ActionTypes.GET_ROLES_FAIL});
  }
}

export function* handleGetStudentTeacherClasses(action) {
  try {
    const response = yield call(getStudentTeacherClassesRequest);
    const { data } = response;
    yield put({ type: ActionTypes.GET_STUDENT_TEACHER_CLASSES_SUCCESS, data: data });
  } catch (err) {
    yield put({ type: ActionTypes.GET_STUDENT_TEACHER_CLASSES_FAIL});
  }
}

export function* handleGetDepartmentClasses(action) {
  try {
    const response = yield call(getDepartmentClassesRequest);
    const { data } = response;
    yield put({ type: ActionTypes.GET_DEPARTMENT_CLASSES_SUCCESS, data: data });
  } catch (err) {
    yield put({ type: ActionTypes.GET_DEPARTMENT_CLASSES_FAIL});
  }
}

export function* handleGetInstituteClasses(action) {
  try {
    const response = yield call(getDepartmentClassesRequest);
    const { data } = response;
    yield put({ type: ActionTypes.GET_INSTITUTE_CLASSES_SUCCESS, data: data });
  } catch (err) {
    yield put({ type: ActionTypes.GET_INSTITUTE_CLASSES_FAIL});
  }
}
