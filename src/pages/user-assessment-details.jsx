import {useLocation} from 'react-router-dom'

export default function UserAssessmentDetails() {
  const test = {
    "id": 64,
    "questionId": 160,
    "userId": 29,
    "answerStatment": "",
    "userSessionId": 95,
    "classAssessmentId": 17,
    "obtainedScore": 10,
    "questionResponseOption": [
      {
        "id": 59,
        "responseId": 64,
        "optionId": 265,
        "option": {
          "id": 265,
          "questionId": 160,
          "value": "28",
          "isCorrect": true,
          "deletedAt": null
        }
      }
    ],
    "responseAttachment": [],
    "question": {
      "id": 160,
      "statement": "how many days in feb ",
      "assessmentId": 33,
      "questionScore": 10,
      "duration": 60000,
      "deletedAt": null,
      "option": [
        {
          "id": 265,
          "questionId": 160,
          "value": "28",
          "isCorrect": true,
          "deletedAt": null
        },
        {
          "id": 266,
          "questionId": 160,
          "value": "none",
          "isCorrect": false,
          "deletedAt": null
        },
        {
          "id": 267,
          "questionId": 160,
          "value": ".",
          "isCorrect": false,
          "deletedAt": null
        }
      ],
      "questionAttachment": []
    }
  }
  const location = useLocation()
  const data = location.state.person;
  const responses = data.classAssessment.questionResponse.filter(r => r.userId === data.user.id);
  console.log(responses)
  if (!data) return (<div>NO PREVIEW AVAILABLE</div>)
  return (
    <div>
      <h1 className="text-lg text-[#6366F1] font-bold my-3">User's Assessment Details</h1>
      { responses && responses.map((test,k)=>(
        <div className="p-4 w-full min-h-[200px] rounded-2xl shadow mb-2" key={k}>
          <div className="flex flex-row justify-between">
            <div>
              <h1 className="font-semibold">Question {k+1} :</h1>
              <h1 className="ml-2">{test.question.statement}</h1>
            </div>
            <div className="p-3 font-semibold text-slate-600 ">
              <p>{(test.obtainedScore ?? 0) + ' / ' + test.question.questionScore}</p>
            </div>
          </div>
          {test.question.option.length < 1 &&
          <div>
            <h1 className="font-semibold mt-2">Answer:</h1>
            <h1 className="ml-2">{test.answerStatment ?? ''}</h1>
          </div>
          }
          {test.question.option.length < 1 &&
          <div>
            {
              test.responseAttachment.length > 0 &&
              (<div>
                Attached files appear here
              </div>)
            }
            {
              test.responseAttachment.length < 1 &&
              <div className="font-semibold text-red-700 mt-6">
                No files attached
              </div>
            }
          </div>
          }
          {test.question.option.length > 0 &&
          <div>
            <h1 className="font-semibold mt-2">Options:</h1>
            <ul className="flex flex-row justify-start items-center mt-2">
              {
                test.question.option.map(opt => {
                  return (
                    <li
                      className={(opt.isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800") + " px-4 rounded-lg ml-4"}>{opt.value}</li>
                  )
                })
              }
            </ul>
          </div>
          }
          {test.question.option.length > 0 &&
          <div>
            <h1 className="font-semibold mt-2">User Selected Options</h1>
            <ul className="flex flex-row justify-start items-center mt-2">
              {test.questionResponseOption.length > 0 &&
              test.questionResponseOption.map(opt => {
                console.log(opt)
                return (
                  <li
                    className={(opt?.option?.isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800") + " px-4 rounded-lg ml-4"}>{opt?.option?.value}</li>
                )
              })
              }
              {
                test.questionResponseOption.length < 1 &&
                <p>No option selected by user </p>
              }
            </ul>
          </div>
          }
        </div>
      ))

      }
    </div>
  );
}