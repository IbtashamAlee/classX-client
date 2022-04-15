import {ActionTypes} from "../constants/actions-types";

export const setSignupUser = (state = {}, action) => {
    switch (action.type) {
        case ActionTypes.SIGN_UP_USER_SUCCESS:
            return { ...state, ...action.user };
        default:
            return state;
    }
};

export const setSigninUser = (state = {}, action) => {
    switch (action.type) {
        case ActionTypes.SIGN_IN_USER_SUCCESS:
            return { ...state, access_token: action.access_token };
        default:
            return state;
    }
};
