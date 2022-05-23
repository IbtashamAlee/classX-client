import Api from "../../../generic-services/api";

export function getAssessmentsRequest() {
  return Api.execute("/assessment", "get")
}

export function getPublicAssessmentsRequest() {
  return Api.execute("/assessment/public", "get")
}

export function createAssessmentRequest(name, body, isPublic, questions) {
  return Api.execute("/assessment", "post", {
    name: name,
    body: body,
    isPublic: isPublic,
    questions: questions
  })
}

export function addQuestionInAssessmentRequest(id, questions) {
  return Api.execute(`/assessment/${id}/question`, "post", {
    questions: questions
  })
}
