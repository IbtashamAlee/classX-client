import {call, put} from 'redux-saga/effects';
import {signupUserRequest, signinUserRequest} from '../requests/auth-requests'
import {ActionTypes} from "../../constants/actions-types";

export function* handleSignupUserRequest(action) {
    try {
        const response = yield call(signupUserRequest, action.email, action.password, action.name);
        const { data } = response;
        yield put({ type: ActionTypes.SIGN_UP_USER_SUCCESS, user: data });
        action.navigate('/verify');
    } catch (err) {
        yield put({type: ActionTypes.SIGN_UP_USER_FAIL})
        console.log(err);
    }
}

export function* handleSigninUserRequest(action) {
    try {
        if (localStorage.getItem('access_token')) {
            yield put({ type: ActionTypes.SIGN_IN_USER_SUCCESS, access_token: localStorage.getItem('access_token')});
            return;
        }
        const response = yield call(signinUserRequest, action.email, action.password);
        const { data } = response;
        localStorage.setItem("access_token", data.access_token)
        yield put({ type: ActionTypes.SIGN_IN_USER_SUCCESS, access_token: data });
        action.navigate('/dashboard');
    } catch (err) {
        yield put({type: ActionTypes.SIGN_IN_USER_FAIL});
        console.log(err);
    }
}
