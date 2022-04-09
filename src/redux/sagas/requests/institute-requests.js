import Api from '../../../generic-services/api'

export function requestNewInstituteRequest(name, institute_type) {
  return Api.execute("/institutes/request", "post", {
    name: name,
    instituteType: institute_type
  })
}
