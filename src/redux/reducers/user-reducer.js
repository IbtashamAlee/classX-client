import {ActionTypes} from "../constants/actions-types";

export const setRolesReducer = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.GET_ROLES_SUCCESS:
      return { ...state, roles: action.data };
    default:
      return state;
  }
};

export const setClassesReducer = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.GET_INSTITUTE_CLASSES_SUCCESS:
      return { ...state, classes: action.data };
    case ActionTypes.GET_DEPARTMENT_CLASSES_SUCCESS:
      return { ...state, classes: action.data };
    case ActionTypes.GET_STUDENT_TEACHER_CLASSES_SUCCESS:
      return { ...state, classes: action.data };
    default:
      return state;
  }
};

