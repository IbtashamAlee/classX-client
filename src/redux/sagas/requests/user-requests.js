import Api from '../../../generic-services/api'

export function getUserRequest() {
  return Api.get("https://my-json-server.typicode.com/atothey/demo/user")

}
