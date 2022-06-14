import Api from "../../../generic-services/api";

export function getFeedRequest(id, record, page) {
  return  Api.execute('/api/class/'+ id + '/feed?record=' + record + '&page=' + page, 'get')
}
