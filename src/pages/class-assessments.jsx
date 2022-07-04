import Api from "../generic-services/api";
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {AssessmentCard} from "../components/assessment-card";
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom'
import Chart from "react-apexcharts";

export function ClassAssessmentPage(props) {
  const [assessments, setAssessments] = useState([]);
  let currentRole = useSelector((state => state.current_class.role));
  const user  = useSelector((state)=> state.user.user);
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
  const [opt3, setOpt3] = useState({
    chart: {
      width: 380,
      type: 'donut',
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270
      }
    },
    dataLabels: {
      enabled: true
    },
    fill: {
      type: 'gradient',
    },
    colors: ['#00FF00', '#FF0000'],
    labels: ['obtained', 'Deducted'],
    legend: {
      formatter: function (val, opts) {
        return val + " - " + opts.w.globals.series[opts.seriesIndex]
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  })
  const [marksState, setMarksState] = useState(null)

  useEffect(() => {
    Api.execute('/api/stats/class/' + id + '/student/' + user?.id + '/marks-stats')
      .then(res => {
        setMarksState([res.data.obtainedMarks, res.data.totalMarks - res.data.obtainedMarks])
      })
      .catch(e => console.log(e))
  }, [user])

  return (
    <div className={"lg:max-w-screen-lg mx-4 md:mx-auto mt-8 pb-8"}>
      <div className="flex flex-col">
        <div className="text-gray-900 text-2xl font-medium flex justify-between">
          <h1>Class Assessments</h1>
          {currentRole && (currentRole == "Teacher" || currentRole == "DepartmentAdmin") &&
              <div className={"flex justify-end"}>
                <Link to={"/assessments/" + id}>
                  <Button variant={"contained"}>Assign Assessment</Button>
                </Link>
              </div>
          }
        </div>
        {currentRole && currentRole === 'Student' && marksState &&
          <div className="flex justify-center items-center flex-col min-w-full">
          <div id="chart" className="min-h-[200px]">
            <Chart options={opt3} series={marksState} type="donut" width={380}/>
          </div>
        </div>
        }
        <div className="flex flex-col">
        {
          assessments && assessments.map(f=>(
                <div className={"mt-3"} key={f.id}>
                  <AssessmentCard assessment={f} currentRole={currentRole}/>
                </div>
            ))
        }
        </div>
      </div>
    </div>
  )
}
