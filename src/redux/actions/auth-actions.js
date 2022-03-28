import {ActionTypes} from "../constants/actions-types";

export const signupUser = (email, password, name, navigate) => {
  return {
    type: ActionTypes.SIGN_UP_USER,
    email: email,
    password: password,
    name: name,
    navigate: navigate
  };
};

export const signinUser = (email, password, navigate) => {
  return {
    type: ActionTypes.SIGN_IN_USER,
    email: email,
    password: password,
    navigate: navigate
  };
};
