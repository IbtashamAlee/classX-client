import Api from '../../../generic-services/api'

export function getParticipantsInClassRequest(id) {
  return Api.execute("/api/class/" + id + "/participants", "get")
}

export function addParticipantsInClassRequest(class_id, users) {
  return Api.execute("/api/class/" + class_id + "/participants", "post", {
    users: users
  })
}


export function removeParticipantsInClassRequest(class_id, users) {
  return Api.execute("/api/class/" + class_id + "/participants/remove", "post", {
    users: users
  })
}
