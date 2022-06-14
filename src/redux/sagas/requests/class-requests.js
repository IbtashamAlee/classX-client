import Api from "../../../generic-services/api";

export function createClassRequest(name, description) {
  return Api.execute("/api/class/add-class", "post", {
    name: name,
    description: description
  })
}

export function joinClassRequest(code) {
  return Api.execute("/api/class/join/" + code, "post")
}
