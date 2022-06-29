import {useNavigate, useParams} from 'react-router-dom'
import {useEffect,useState} from "react";
import api from "../generic-services/api";

export default function AssessmentDetails(){
  const {assessment_id} = useParams();
  const navigate = useNavigate();
  console.log(assessment_id);
  const [assessmentResponses,setAssessmentResponses] = useState(null)
  useEffect(()=>{
    api.execute(`/api/class/assessment/${assessment_id}/view-details`)
      .then(res => {
        console.log(res.data);
        setAssessmentResponses(res.data)
      })
  },[])

  return (
    <div className="mt-2">
      {assessmentResponses &&
      <div>
        <h1 className="text-lg text-[#6366F1] font-bold">Class Assessment Submissions</h1>
        <div className="font-semibold">
          <h1>Name : {assessmentResponses.assessment?.name}</h1>
          <h1>Description : {assessmentResponses.assessment?.body}</h1>
        </div>
        <hr className='my-3'/>
        <h1 className="text-lg text-[#6366F1] font-bold">Submission Details</h1>
        <h1 className="text-sm font-semibold">Total Submissions
          : {assessmentResponses.classAssessmentSubmission?.length ?? 0}</h1>
        {assessmentResponses.classAssessmentSubmission.length < 1 &&
        <h1 className="mt-12 font-semibold text-yellow-600 text-center underline">NO SUBMISSIONS YET</h1>
        }
        {assessmentResponses.classAssessmentSubmission.length > 0 &&
        <div>


          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                    <tr>
                      <th scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Name
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Result
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Total
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Obtained
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Submit Date
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Submit Time
                      </th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                    {assessmentResponses.classAssessmentSubmission.map((person, key) => (
                      <tr key={key} className="cursor-default hover:bg-sky-50"
                          onClick={() => navigate('details', {state: {person}})}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img className="h-10 w-10 rounded-full"
                                   src={person.user.imageUrl ?? 'https://picsum.photos/200/300'} alt=""/>
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">{person.user.name ?? ''}</div>
                              <div className="text-gray-500">{person.user.email ?? ''}</div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left">
                        <span
                          className="inline-flex rounded-full bg-blue-100 px-2 text-xs font-semibold leading-5 text-blue-800 text-leftr">
                          {Math.round((person.obtainedMarks / person.totalMarks) * 100)} %
                        </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left">
                        <span
                          className="inline-flex rounded-full bg-yellow-100 px-2 text-xs font-semibold leading-5 text-yellow-800 text-left">
                          {person.totalMarks}
                        </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left">
                        <span
                          className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800 text-center">
                          {person.obtainedMarks}
                        </span>
                        </td>

                        <td
                          className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.submittedAt?.split('T')[0] ?? '-'}</td>
                        <td
                          className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.submittedAt?.split('T')[1].slice(0, 8) ?? '-'}</td>


                      </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        }
      </div>
      }
    </div>
  );
}
