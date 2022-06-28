import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {getAttendance} from "../redux/actions/attendance-actions";
import {CreateAttendance} from "../components/create-attendance";
import {MarkAttendanceCard} from "../components/mark-attendance-card";
import api from '../generic-services/api'
import Chart from "react-apexcharts";

export default function Attendance() {
  let dispatch = useDispatch();
  let {id} = useParams();
  const user = useSelector(state => state?.user?.user)
  let positions = useSelector((state => state.attendances.attendances));
  const [record, setRecord] = useState(40);
  const [page, setPage] = useState(1);
  const [series, setSeries] = useState(null)
  let currentRole = useSelector((state => state.current_class.role));
  const [opt2, setOpt2] = useState({
    chart: {
      width: 380,
      type: 'donut',
    },
    plotOptions: {
      pie: {
        expandOnClick: true,
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
    labels: ['Presents', 'Absents'],
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

  useEffect(() => {
    dispatch(getAttendance(id, record, page));
  }, [dispatch]);

  function getDateTime(clockDate) {
    let date = new Date(clockDate);
    return date.getDate() + "-" + parseInt(date.getMonth() + 1) + "-" + date.getFullYear() + ' ending at ' + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

  }

  useEffect(() => {
    api.execute(`/api/stats/class/${id}/student/${user.id}/attendance-stats`)
      .then(res => setSeries([res.data.present, res.data.total - res.data.present]))
      .catch(err => console.log(err))
  }, [])

  return (
    <React.Fragment>
      <div className="overflow-visible mb-6">
        <div className="text-gray-900 text-2xl font-medium py-4 flex justify-between ">
          <h1>Attendance</h1>
          {currentRole && (currentRole == "Teacher" || currentRole == "DepartmentAdmin") &&
          <CreateAttendance/>
          }
        </div>
        {currentRole && currentRole == "Student" && series &&
        <div className="flex justify-center items-center mb-1">
          <div id="chart" className="min-h-[270px]">
            <Chart options={opt2} series={series} type="donut" width={380}/>
          </div>
        </div>
        }
        <div className="bg-white sm:rounded-md">
          <ul className="divide-y space-y-3">
            {positions && positions.length > 0 && positions.map((position, key) => (
              <MarkAttendanceCard attendance={position} currentRole={currentRole} key={{key}}/>
            ))}
          </ul>
        </div>
      </div>

    </React.Fragment>
  )
}
