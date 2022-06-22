import Api from "../generic-services/api";
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {AssessmentCard} from "../components/assessment-card";
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom'

export function ClassAssessmentPage(props) {
  const [assessments, setAssessments] = useState([]);

  let currentRole = useSelector((state => state.current_class.role));

  let {id} = useParams();

  function getAssessments() {
    Api.execute(`/api/class/${id}/assessment?records=100&page=1`).then(res => {
      setAssessments(res.data.reverse());
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
        <div className="text-gray-900 text-2xl font-medium flex justify-between mb-4">
          <h1>Class Assessments</h1>
          {currentRole && (currentRole == "Teacher" || currentRole == "DepartmentAdmin") &&
              <div className={"flex justify-end mb-4"}>
                <Link to={"/assessments/" + id}>
                  <Button variant={"contained"}>Assign Assessment</Button>
                </Link>
              </div>
          }
        </div>
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
