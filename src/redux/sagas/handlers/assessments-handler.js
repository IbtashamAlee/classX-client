import {call, put} from 'redux-saga/effects';
import {
  addQuestionInAssessmentRequest,
  createAssessmentRequest,
  getAssessmentsRequest,
  getPublicAssessmentsRequest
} from '../requests/assessments-requests'
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

export function* handleCreateAssessmentRequest(action) {
  try {
    const response = yield call(createAssessmentRequest, action.name, action.body, action.isPublic, action.questions);
    const { data } = response;
    yield put({ type: ActionTypes.CREATE_ASSESSMENT_SUCCESS});
    try {
      const response = yield call(addQuestionInAssessmentRequest, data.assessment.id, action.questions);
      const { data2 } = response;
      yield put({ type: ActionTypes.ADD_QUESTIONS_IN_ASSESSMENT_SUCCESS });
    } catch (err) {
      yield put({type: ActionTypes.ADD_QUESTIONS_IN_ASSESSMENT_FAIL})
      console.log(err);
    }
    //action.navigate('')
  } catch (err) {
    yield put({type: ActionTypes.CREATE_ASSESSMENT_FAIL})
    console.log(err);
  }
}
