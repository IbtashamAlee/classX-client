import {ActionTypes} from "../constants/actions-types";

export const requestInstitute = (name, institute_type) => {
  return {
    type: ActionTypes.REQUEST_INSTITUTE,
    name: name,
    institute_type: institute_type
  };
};

export const getInstituteRequests = () => {
  return {
    type: ActionTypes.GET_INSTITUTE_REQUESTS
  }
}

export const getInstitutes = () => {
  return {
    type: ActionTypes.GET_INSTITUTES,
  }
}

export const acceptRejectInstitute = (method) => {
  return {
    type: ActionTypes.ACCEPT_REJECT_INSTITUTE,
    method: method
  }
}

export const deleteInstitute = (id) => {
  return {
    type: ActionTypes.DELETE_INSTITUTE,
    id: id
  }
}

export const restoreInstitute = (id) => {
  return {
    type: ActionTypes.RESTORE_INSTITUTE,
    id: id
  }
}

export const addDepartmentInInstitute = (name, email) => {
  return {
    type: ActionTypes.ADD_DEPARTMENT_IN_INSTITUTE,
    name: name,
    adminId: email
  }
}

export const getDepartmentsInInstitute = (id) => {
  return {
    type: ActionTypes.GET_DEPARTMENTS_IN_INSTITUTE,
    id: id
  }
}

export const addInstituteAdmin = (institute_id, email) => {
  return {
    type: ActionTypes.GET_DEPARTMENTS_IN_INSTITUTE,
    institute_id: institute_id,
    email: email
  }
}
