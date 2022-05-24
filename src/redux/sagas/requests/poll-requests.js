import Api from "../../../generic-services/api";

export function participatePollRequest(pollId, selectedOptionId) {
  return  Api.execute('/class/poll/'+ pollId + "/vote" , 'post', {
    selectedOptionId: selectedOptionId
  })
}
