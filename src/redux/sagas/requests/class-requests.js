import Api from "../../../generic-services/api";

export function createClassRequest(name, description) {
  return Api.execute("/class/add-class", "post", {
    name: name,
    description: description
  })
}
