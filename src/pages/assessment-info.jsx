import {Header} from "../components/header";
import {Fragment, useEffect} from 'react'
import {useLocation, useNavigate} from "react-router-dom"
import {Button} from '@mui/material'

export default function AttemptInfo() {
  const location = useLocation();
  const navigate = useNavigate();
  let assessment = location?.state?.assessment ?? null
  assessment =  assessment.assessment
  console.log(location.state)
  const class_id = location?.state?.class_id ?? null

  useEffect(()=>{
    console.log(assessment)
    if(!assessment) navigate('/')
  })

  function getDateTime(clockDate) {
    let date = new Date(clockDate);
    return date.getDate() + "-" + parseInt(date.getMonth() + 1)+ "-" + date.getFullYear() + ' ending at '+ date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();;
  }

  return (
    <Fragment>
      <Header/>
      <div className="bg-white flex flex-col items-center justify-center h-[90vh]">
      <div className="max-w-7xl mx-auto text-center py-8 px-4 sm:px-6 lg:py-16 lg:px-8 bg-slate-50 shadow w-full">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">{assessment.assessment.name}</span>
        </h2>
        <p className="text-xl mt-2">{assessment.assessment.body}</p>
        <p className="text-sm mt-2">(Please Note you wont be able to re-attempt a question once passed)</p>

        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-md shadow">
            <Button variant="contained" onClick={()=>{
              navigate('/attempt-assessment',{state : {id: assessment.id, class_id: class_id}})
            }}>Get Started</Button>
          </div>
        </div>
        <div className="flex flex-row items-start justify-end mx-5 mt-5">
        <p className="underline">{getDateTime(assessment.endingTime)}</p>
        </div>
        </div>
    </div>
    </Fragment>
  )
}
