import Api from '../../../generic-services/api'

export function getRolesRequest() {
  return Api.execute("/api/user/me/roles", "get");
}

export function getStudentTeacherClassesRequest() {
  return Api.execute("/api/user/me/classes", "get");
}

export function getDepartmentClassesRequest() {
  return Api.execute("/api/user/me/department-admin-classes", "get");
}

export function getInstituteClassesRequest() {
  return Api.execute("/api/user/me/institute-admin-classes", "get");
}

export function getUserRequest() {
  return Api.execute("/api/user/me", "get");
}
