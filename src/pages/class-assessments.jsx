import Api from "../generic-services/api";
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {PollCard} from "../components/poll-card";
import {CreatePoll} from "../components/create-poll";
import {useSelector} from "react-redux";
import {AssessmentCard} from "../components/assessment-card";

export function ClassAssessmentPage(props) {
  const [assessments, setAssessments] = useState([]);

  let currentRole = useSelector((state => state.current_class.role));

  let {id} = useParams();

  function getAssessments() {
    Api.execute(`/api/class/${id}/assessment?records=100&page=1`).then(res => {
      setAssessments(res.data);
    }).catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    getAssessments();
  }, [])

  return (
    <div className={"lg:max-w-screen-lg mx-4 md:mx-auto mt-8 pb-8"}>
      <div className="flex flex-col">
        <h1 className="text-gray-900 text-2xl font-medium mb-2">Class Assessments</h1>
        <div className="flex flex-col">
        {
          assessments && assessments.map(f=>{
           return (
             <div className="mt-3">
             <AssessmentCard assessment={f} currentRole={currentRole}/>
             </div>);
          })
        }
        </div>
      </div>
    </div>
  )
}
