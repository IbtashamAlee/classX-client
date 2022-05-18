import {ActionTypes} from "../constants/actions-types";

export const getAssessments = (navigate= null) => {
  return {
    type: ActionTypes.GET_ASSESSMENTS,
    navigate: navigate
  };
};

export const getPublicAssessments = (navigate= null) => {
  return {
    type: ActionTypes.GET_PUBLIC_ASSESSMENTS,
    navigate: navigate
  };
};
