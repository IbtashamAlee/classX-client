import Api from '../../../generic-services/api'

export function signupUserRequest(email, password, name) {
    return Api.execute("/api/auth/signup", "post", {
        email: email,
        password: password,
        name: name
    })
}

export function signinUserRequest(email, password) {
    return Api.execute("/api/auth/signin", "post", {
        email: email,
        password: password,
    })
}
