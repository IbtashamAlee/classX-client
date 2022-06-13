import {Header} from "../components/header";
import {Fragment, useEffect} from 'react'
import {useLocation, useNavigate} from "react-router-dom"
import {Button} from '@mui/material'

export default function AttemptInfo() {
  const location = useLocation();
  const navigate = useNavigate();
  const assessment = location?.state?.assessment ?? null

  useEffect(()=>{
    console.log(assessment)
    if(!assessment) navigate('/')
  })

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
            <Button variant="contained" onClick={()=>{
              navigate('/attempt-assessment',{state : {id:assessment.id}})
            }}>Get Started</Button>
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
