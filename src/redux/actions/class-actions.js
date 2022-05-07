import {ActionTypes} from "../constants/actions-types";

export const createIndependentClass = (name, description, navigate = null) => {
  return {
    type: ActionTypes.CREATE_INDEPENDENT_CLASS,
    name: name,
    description: description,
    navigate: navigate
  };
};

export const joinClass = (code, navigate = null) => {
  return {
    type: ActionTypes.JOIN_CLASS,
    code: code,
    navigate: navigate
  };
};
