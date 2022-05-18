import {ActionTypes} from "../constants/actions-types";

export const setAssessments = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.GET_ASSESSMENTS_SUCCESS:
      return { ...state, assessments: action.data };
    case ActionTypes.GET_PUBLIC_ASSESSMENTS_SUCCESS:
      return { ...state, public_assessments: action.data };
    default:
      return state;
  }
};
