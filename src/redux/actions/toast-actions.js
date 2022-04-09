import createToast from '../../factories/createToast'
import {ActionTypes}  from "../constants/actions-types";

export function addToast(options = {}) {
  return {
    payload: createToast(options),
    type: ActionTypes.ADD_TOAST
  };
}

export function removeToast(id) {
  return {
    payload: id,
    type: ActionTypes.REMOVE_TOAST
  };
}
