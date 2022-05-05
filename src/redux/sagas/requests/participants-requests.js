import Api from '../../../generic-services/api'

export function getParticipantsInClassRequest(id) {
  return Api.execute("/class/" + id + "/participants", "get")
}

export function addParticipantsInClassRequest(class_id, users) {
  return Api.execute("/class/" + class_id + "/participants", "post", {
    users: users
  })
}
