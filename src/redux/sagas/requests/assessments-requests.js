import Api from "../../../generic-services/api";

export function getAssessmentsRequest() {
  return Api.execute("/assessment", "get")
}

export function getPublicAssessmentsRequest() {
  return Api.execute("/assessment/public", "get")
}
