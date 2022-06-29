import {useLocation, useParams} from 'react-router-dom'
import {useEffect,useState} from "react";
import api from "../generic-services/api";
import QuestionResponse from "../components/question-response";

export default function UserAssessmentDetails() {
  const location = useLocation()
  const [data,setData] = useState(null)
  const [responses,setResponses] = useState(null)
  const {assessment_id} = useParams()
  useEffect(()=>{
    api.execute(`/api/class/assessment/${assessment_id}/user/${location.state.person.user.id}/view-details`)
      .then(res=> {
        console.log(res.data)
        setData(res.data)
        setResponses(res.data?.classAssessmentSubmission[0]?.classAssessment?.questionResponse?.filter(r => r.userId === location.state.person.user.id));
      })
      .catch(err => console.log(err))
  },[])


  if (!data) return (<div>NO PREVIEW AVAILABLE</div>)
  return (
    <div>
      <h1 className="text-lg text-[#6366F1] font-bold my-3">User's Assessment Details</h1>
      { responses && responses.map((test,k)=> {
        return <QuestionResponse test={test} k={k}/>
      })}
    </div>
  )
}