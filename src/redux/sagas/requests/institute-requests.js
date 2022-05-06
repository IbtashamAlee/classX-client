import Api from '../../../generic-services/api'

export function requestNewInstituteRequest(name, institute_type, description, address, city, country) {
  return Api.execute("/institutes/request", "post", {
    name: name,
    instituteType: institute_type,
    description: description,
    address: address,
    city: city,
    country: country
  })
}

export function requestGetInstitutes() {
  return Api.execute("/institutes", "get")
}

export function requestGetInstitutesRequests() {
  return Api.execute("/institutes/requests", "get")
}

export function requestAcceptRejectInstitute(id, method) {
  return Api.execute("/institutes/request/process/" + id + "?method=" + method, "put")
}

export function requestDeleteInstitute(id) {
  return Api.execute("/institutes/delete/" + id, "put")
}

export function requestRestoreInstitute(id) {
  return Api.execute("/institutes/restore/" + id, "put")
}

export function requestAddDepartmentInInstitute(id, name, adminId) {
  return Api.execute("/institutes/" + id + "/add-department", "post", {
    name: name,
    adminId: adminId
  })
}

export function requestGetDepartmentsInInstitute(id) {
  return Api.execute("/institutes/" + id + "/departments", "get")
}

export function requestAddInstituteAdmin(id, email) {
  return Api.execute("/institutes/" + id + "/add-admin", "post", {
    email: email
  })
}

