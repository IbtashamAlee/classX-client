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

export const createAssessment = (name, body, isPublic, questions, navigate= null) => {
  return {
    type: ActionTypes.CREATE_ASSESSMENT,
    name: name,
    body: body,
    isPublic: isPublic,
    questions: questions,
    navigate: navigate
  };
};
