import {call, put} from 'redux-saga/effects';
import {
  requestAcceptRejectInstitute,
  requestAddDepartmentInInstitute, requestAddInstituteAdmin,
  requestDeleteInstitute,
  requestGetDepartmentsInInstitute,
  requestGetInstitutes,
  requestGetInstitutesRequests,
  requestNewInstituteRequest,
  requestRestoreInstitute
} from '../requests/institute-requests'
import {ActionTypes} from "../../constants/actions-types";

export function* handleRequestInstituteRequest(action) {
  try {
    const response = yield call(requestNewInstituteRequest, action.name, action.institute_type, action.description,  action.address, action.city, action.country);
    yield put({ type: ActionTypes.REQUEST_INSTITUTE_SUCCESS });
    action.navigate('/');
    yield put({type: ActionTypes.ADD_TOAST, payload: {text: "Institute Requested!", message: "Institute will be visible once approved"}})
  } catch (err) {
    yield put({type: ActionTypes.REQUEST_INSTITUTE_FAIL})
    yield put({type: ActionTypes.ADD_TOAST, payload: {text: "Unable to request institute", danger: true}})
    console.log(err);
  }
}

export function* handleGetInstitutesRequest(action) {
  try {
    const response = yield call(requestGetInstitutes);
    const { data } = response;
    yield put({ type: ActionTypes.GET_INSTITUTES_SUCCESS, data: data });
  } catch (err) {
    yield put({type: ActionTypes.GET_INSTITUTES_FAIL})
    yield put({type: ActionTypes.ADD_TOAST, payload: {text: "Unable to get institute", danger: true}})
    console.log(err);
  }
}

export function* handleGetInstitutesRequestsRequest(action) {
  try {
    const response = yield call(requestGetInstitutesRequests);
    const { data } = response;
    yield put({ type: ActionTypes.GET_INSTITUTE_REQUESTS_SUCCESS, data: data });
  } catch (err) {
    yield put({type: ActionTypes.GET_INSTITUTE_REQUESTS_FAIL})
    yield put({type: ActionTypes.ADD_TOAST, payload: {text: "Unable to get institute", danger: true}})
    console.log(err);
  }
}

export function* handleAcceptRejectInstituteRequest(action) {
  try {
    const response = yield call(requestAcceptRejectInstitute, action.institute_id, action.method);
    yield put({ type: ActionTypes.ACCEPT_REJECT_INSTITUTE_SUCCESS });
    try {
      const response = yield call(requestGetInstitutes);
      const { data } = response;
      yield put({ type: ActionTypes.GET_INSTITUTES_SUCCESS, data: data });
    } catch (err) {
      yield put({type: ActionTypes.GET_INSTITUTES_FAIL})
      console.log(err);
    }
    try {
      const response = yield call(requestGetInstitutesRequests);
      const { data } = response;
      yield put({ type: ActionTypes.GET_INSTITUTE_REQUESTS_SUCCESS, data: data });
    } catch (err) {
      yield put({type: ActionTypes.GET_INSTITUTE_REQUESTS_FAIL})
      console.log(err);
    }
    yield put({type: ActionTypes.ADD_TOAST, payload: {text: "Institute Accepted!"}})
  } catch (err) {
    yield put({type: ActionTypes.ADD_TOAST, payload: {text: "Unable to perform action", danger: true}})
    yield put({type: ActionTypes.ACCEPT_REJECT_INSTITUTE_FAIL})
    console.log(err);
  }
}

export function* handleDeleteInstituteRequest(action) {
  try {
    const response = yield call(requestDeleteInstitute, action.id);
    yield put({ type: ActionTypes.DELETE_INSTITUTE_SUCCESS });
    try {
      const response = yield call(requestGetInstitutes);
      const { data } = response;
      yield put({ type: ActionTypes.GET_INSTITUTES_SUCCESS, data: data });
    } catch (err) {
      yield put({type: ActionTypes.GET_INSTITUTES_FAIL})
      console.log(err);
    }
    yield put({type: ActionTypes.ADD_TOAST, payload: {text: "Institute Deleted!"}})
  } catch (err) {
    yield put({type: ActionTypes.DELETE_INSTITUTE_FAIL})
    yield put({type: ActionTypes.ADD_TOAST, payload: {text: "Unable to delete institute", danger: true}})
    console.log(err);
  }
}

export function* handleRestoreInstituteRequest(action) {
  try {
    const response = yield call(requestRestoreInstitute, action.id);
    yield put({ type: ActionTypes.RESTORE_INSTITUTE_SUCCESS });
    try {
      const response = yield call(requestGetInstitutes);
      const { data } = response;
      yield put({ type: ActionTypes.GET_INSTITUTES_SUCCESS, data: data });
    } catch (err) {
      yield put({type: ActionTypes.GET_INSTITUTES_FAIL})
      console.log(err);
    }
    yield put({type: ActionTypes.ADD_TOAST, payload: {text: "Institute Restored!"}})
  } catch (err) {
    yield put({type: ActionTypes.RESTORE_INSTITUTE_FAIL})
    yield put({type: ActionTypes.ADD_TOAST, payload: {text: "Unable to restore institute", danger: true}})
    console.log(err);
  }
}

export function* handleAddDepartmentInInstituteRequest(action) {
  try {
    const response = yield call(requestAddDepartmentInInstitute, action.institute_id, action.name, action.adminId);
    yield put({ type: ActionTypes.ADD_DEPARTMENT_IN_INSTITUTE_SUCCESS});
  } catch (err) {
    yield put({type: ActionTypes.ADD_DEPARTMENT_IN_INSTITUTE_FAIL})
    console.log(err);
  }
}

export function* handleGetDepartmentsInInstituteRequest(action) {
  try {
    const response = yield call(requestGetDepartmentsInInstitute, action.id);
    const { data } = response;
    yield put({ type: ActionTypes.GET_DEPARTMENTS_IN_INSTITUTE_SUCCESS, data: data });
  } catch (err) {
    yield put({type: ActionTypes.GET_INSTITUTE_REQUESTS_FAIL})
    console.log(err);
    yield put({type: ActionTypes.ADD_TOAST, payload: {text: "Unable to fetch departments", danger: true}})
  }
}

export function* handleAddInstituteAdminRequest(action) {
  try {
    const response = yield call(requestAddInstituteAdmin, action.institute_id, action.email);
    yield put({ type: ActionTypes.ADD_DEPARTMENT_IN_INSTITUTE_SUCCESS});
  } catch (err) {
    yield put({type: ActionTypes.ADD_DEPARTMENT_IN_INSTITUTE_FAIL})
    console.log(err);
  }
}
