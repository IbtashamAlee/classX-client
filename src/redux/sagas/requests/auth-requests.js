import Api from '../../../generic-services/api'

export function signupUserRequest(email, password, name) {
    return Api.execute("/auth/signup", "post", {
        email: email,
        password: password,
        name: name
    })
}

export function signinUserRequest(email, password) {
    return Api.execute("/auth/login", "post", {
        email: email,
        password: password,
    })
}
