import Api from '../../../generic-services/api'

export function getAttendanceRequest(class_id, record, page) {
  return Api.execute(`/class/${class_id}/attendance?records=${record}&page=${page}`, "get")
}

export function getSpecificAttendanceRequest(class_id, attendance_id) {
  return Api.execute(`/class/${class_id}/attendance/${attendance_id}`, "get")
}

export function createAttendanceRequest(class_id) {
  return Api.execute(`/class/${class_id}/attendance`, "post")
}

export function participateAttendanceRequest(class_id, attendance_id) {
  return Api.execute(`/class/${class_id}/attendance/${attendance_id}`, "get")
}
