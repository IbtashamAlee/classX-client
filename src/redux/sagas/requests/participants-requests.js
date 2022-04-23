import Api from '../../../generic-services/api'

export function getParticipantsInClassRequest(id) {
  return Api.execute("/class/" + id + "/participants", "get")
}
