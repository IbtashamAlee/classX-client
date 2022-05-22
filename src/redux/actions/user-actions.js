import {ActionTypes} from "../constants/actions-types";

export const getRoles = () => {
  return {
    type: ActionTypes.GET_ROLES,
  };
};

export const getStudentTeacherClasses = () => {
  return {
    type: ActionTypes.GET_STUDENT_TEACHER_CLASSES,
  };
};

export const getDepartmentClasses = () => {
  return {
    type: ActionTypes.GET_DEPARTMENT_CLASSES,
  };
};

export const getInstituteClasses = () => {
  return {
    type: ActionTypes.GET_INSTITUTE_CLASSES,
  };
};

export const clearClasses = () => {
  return {
    type: ActionTypes.CLEAR_CLASSES,
  };
};

export const getUser = () => {
  return {
    type: ActionTypes.GET_USER,
  };
}
