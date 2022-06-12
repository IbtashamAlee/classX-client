import {Header} from "../components/header";
import {Fragment} from 'react'
const assessment = {
  id: 3,
  classId: 12,
  assessmentId: 16,
  deletedAt: null,
  allowResubmission: false,
  startingTime: "2022-05-24T20:59:46.879Z",
  endingTime: "2022-05-25T20:59:46.879Z",
  isMultiTimer: false,
  QuestionsToDisplay: 2,
  createdBy: 1,
  assessment: {
    name: "QUIZ 1",
    body: "This is quiz 1 ..please submit on time"
  },
  assessmentComments: [],
  user: {
    imageUrl: "https://picsum.photos/200/300",
    name: "admin"
  }
}

export default function AttemptInfo() {
  return (
    <Fragment>
      <Header/>
      <div className="bg-white flex flex-col items-center justify-center h-[90vh]">
      <div className="max-w-7xl mx-auto text-center py-8 px-4 sm:px-6 lg:py-16 lg:px-8 bg-slate-50 shadow w-full">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">{assessment.assessment.name}</span>
        </h2>
        <p className="text-xl mt-2">{assessment.assessment.body}</p>
        <p className="text-sm mt-2">(Please Note once started you won't be able to pause the progress)</p>

        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-md shadow">
            <a
              href="/attempt-assesment"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Get started
            </a>
          </div>
        </div>
        <div className="flex flex-row items-start justify-end mx-5 mt-5">
        <p className="underline">ENDING TIME : {assessment.endingTime.split('T')[1]}</p>
        </div>
        </div>
    </div>
    </Fragment>
  )
}
