import Api from '../../../generic-services/api'

export function getRolesRequest() {
  return Api.execute("/user/me/roles", "get");
}

export function getStudentTeacherClassesRequest() {
  return Api.execute("/user/me/classes", "get");
}

export function getDepartmentClassesRequest() {
  return Api.execute("/user/me/department-admin-classes", "get");
}

export function getInstituteClassesRequest() {
  return Api.execute("/user/me/institute-admin-classes", "get");
}
