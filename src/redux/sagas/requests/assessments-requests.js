import Api from "../../../generic-services/api";

export function getAssessmentsRequest() {
  return Api.execute("/api/assessment", "get")
}

export function getPublicAssessmentsRequest() {
  return Api.execute("/api/assessment/public", "get")
}

export function createAssessmentRequest(name, body, isPublic, questions) {
  return Api.execute("/api/assessment", "post", {
    name: name,
    body: body,
    isPublic: isPublic,
    questions: questions
  })
}

export function addQuestionInAssessmentRequest(id, questions) {
  return Api.execute(`/api/assessment/${id}/question`, "post", {
    questions: questions
  })
}
