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

export const removeCurrentClass = () => {
  return {
    type: ActionTypes.REMOVE_CURRENT_CLASS
  }
}

export const setCurrentClass = (c) => {
  return {
    type: ActionTypes.SET_CURRENT_CLASS,
    class: c
  }
}

export const removeCurrentRole = () => {
  return {
    type: ActionTypes.REMOVE_CURRENT_ROLE
  }
}

export const setCurrentRole = (role) => {
  return {
    type: ActionTypes.SET_CURRENT_ROLE,
    role: role
  }
}
