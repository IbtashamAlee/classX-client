import {ActionTypes} from "../constants/actions-types";

export const createIndependentClass = (name, description, navigate = null) => {
  return {
    type: ActionTypes.CREATE_INDEPENDENT_CLASS,
    name: name,
    description: description,
    navigate: navigate
  };
};
