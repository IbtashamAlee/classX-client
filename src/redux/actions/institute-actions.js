import {ActionTypes} from "../constants/actions-types";

export const requestInstitute = (name, institute_type) => {
  return {
    type: ActionTypes.REQUEST_INSTITUTE,
    name: name,
    institute_type: institute_type
  };
};
