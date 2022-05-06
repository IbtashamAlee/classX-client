import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {Button} from "@mui/material";
import {acceptRejectInstitute, deleteInstitute, restoreInstitute} from "../redux/actions/institute-actions";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function InstitutesTable() {
  let institutes = useSelector((state => state.institutes.institutes));
  let institute_requests = useSelector((state => state.institute_requests.institute_requests));
  let dispatch = useDispatch();

  return (
      <React.Fragment>
        <div className="mt-4">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">Institutes</h1>
              <p className="mt-2 text-sm text-gray-700">
                Active institutes list. You can block/unblock their access.
              </p>
            </div>
          </div>
          <div className="-mx-4 mt-10 ring-1 ring-gray-300 sm:-mx-6 md:mx-0 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                  Name
                </th>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                  Institute Type
                </th>
                <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Address
                </th>
                <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  City/Country
                </th>
                <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Description
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Block/Unblock</span>
                </th>
              </tr>
              </thead>
              <tbody>
              {institutes && institutes.map((institute, instituteIdx) => (
                  <tr key={institute.id}>
                    <td
                        className={classNames(
                            instituteIdx === 0 ? '' : 'border-t border-gray-200',
                            'relative py-4 pl-4 sm:pl-6 pr-3 text-sm'
                        )}
                    >
                      <div className="font-medium text-gray-900">
                        {institute.name}
                      </div>
                    </td>
                    <td
                        className={classNames(
                            instituteIdx === 0 ? '' : 'border-t border-gray-200',
                            'hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell'
                        )}
                    >
                      {institute.instituteType}
                    </td>
                    <td
                        className={classNames(
                            instituteIdx === 0 ? '' : 'border-t border-gray-200',
                            'hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell'
                        )}
                    >
                      {institute.address}
                    </td>
                    <td
                        className={classNames(
                            instituteIdx === 0 ? '' : 'border-t border-gray-200',
                            'hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell'
                        )}
                    >
                      {institute.city + "/"+ institute.country}
                      {console.log(instituteIdx)}
                    </td>
                    <td
                        className={classNames(
                            instituteIdx === 0 ? '' : 'border-t border-gray-200',
                            'px-3 py-3.5 text-sm text-gray-500'
                        )}
                    >
                      {institute.description}
                    </td>
                    <td
                        className={classNames(
                            instituteIdx === 0 ? '' : 'border-t border-gray-200t',
                            'relative py-3.5 pl-3 pr-4 sm:pr-6 text-right text-sm font-medium'
                        )}
                    >
                      {institute.deletedAt ?
                          <Button
                              variant="outlined" color="success"
                              onClick={() => {dispatch(restoreInstitute(institute.id))}}
                          >
                            Restore
                          </Button> :
                          <Button
                              variant="outlined" color="error"
                              onClick={() => {dispatch(deleteInstitute(institute.id))}}
                          >
                            Delete
                          </Button>
                      }
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-6">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">Institutes Requests</h1>
              <p className="mt-2 text-sm text-gray-700">
                Institutes requests listed below. Reject or accept them.
              </p>
            </div>
          </div>
          <div className="-mx-4 mt-10 ring-1 ring-gray-300 sm:-mx-6 md:mx-0 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                  Name
                </th>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                  Institute Type
                </th>
                <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Address
                </th>
                <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  City/Country
                </th>
                <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Description
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Block/Unblock</span>
                </th>
              </tr>
              </thead>
              <tbody>
              {institute_requests && institute_requests.map((institute, instituteIdx) => (
                  <tr key={institute.id}>
                    <td
                        className={classNames(
                            instituteIdx === 0 ? '' : 'border-t border-gray-200',
                            'relative py-4 pl-4 sm:pl-6 pr-3 text-sm'
                        )}
                    >
                      <div className="font-medium text-gray-900">
                        {institute.name}
                      </div>
                    </td>
                    <td
                        className={classNames(
                            instituteIdx === 0 ? '' : 'border-t border-gray-200',
                            'hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell'
                        )}
                    >
                      {institute.instituteType}
                    </td>
                    <td
                        className={classNames(
                            instituteIdx === 0 ? '' : 'border-t border-gray-200',
                            'hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell'
                        )}
                    >
                      {institute.address}
                    </td>
                    <td
                        className={classNames(
                            instituteIdx === 0 ? '' : 'border-t border-gray-200',
                            'hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell'
                        )}
                    >
                      {institute.city + "/"+ institute.country}
                      {console.log(instituteIdx)}
                    </td>
                    <td
                        className={classNames(
                            instituteIdx === 0 ? '' : 'border-t border-gray-200',
                            'px-3 py-3.5 text-sm text-gray-500'
                        )}
                    >
                      {institute.description}
                    </td>
                    <td
                        className={classNames(
                            instituteIdx === 0 ? '' : 'border-t border-gray-200t',
                            'relative py-3.5 pl-3 pr-4 sm:pr-6 text-right text-sm font-medium'
                        )}
                    >
                      {(institute.acceptedAt === null &&  institute.rejectedAt === null) &&
                          <div className="space-x-2">
                            <Button
                                variant="outlined" color="success"
                                onClick={() => {dispatch(acceptRejectInstitute(institute.id, "accept"))}}
                            >
                              Accept
                            </Button>
                            <Button
                                variant="outlined" color="error"
                                onClick={() => {dispatch(acceptRejectInstitute(institute.id, "reject"))}}
                            >
                              Reject
                            </Button>
                          </div>
                      }
                      {(institute.acceptedAt === null && institute.rejectedAt !== null) &&
                          <Button
                              variant="outlined" color="error"
                              disabled={true}
                          >
                            Rejected
                          </Button>
                      }
                      {(institute.rejectedAt === null && institute.acceptedAt !== null) &&
                          <Button
                              variant="outlined" color="error"
                              disabled={true}
                          >
                            Accepted
                          </Button>
                      }
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </React.Fragment>
  )
}
