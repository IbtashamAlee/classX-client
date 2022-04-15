import Api from '../../../generic-services/api'

export function getRolesRequest() {
  return Api.execute("/users/me/roles", "get");
}

export function getStudentTeacherClassesRequest() {
  return Api.execute("/users/me/classes", "get");
}

export function getDepartmentClassesRequest() {
  return Api.execute("/users/me/get-department-classes", "get");
}

export function getInstituteClassesRequest() {
  return Api.execute("/users/me/get-institute-classes", "get");
}
