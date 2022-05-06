import {ActionTypes} from "../constants/actions-types";

export const setInstitutes = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.GET_INSTITUTES_SUCCESS:
      return { ...state, institutes: action.data };
    default:
      return state;
  }
};

export const setInstitutesRequests = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.GET_INSTITUTE_REQUESTS_SUCCESS:
      return { ...state, institute_requests: action.data };
    default:
      return state;
  }
};

export const setDepartmentsInInstitute = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.GET_DEPARTMENTS_IN_INSTITUTE_SUCCESS:
      return { ...state, ...action.data };
    default:
      return state;
  }
};
