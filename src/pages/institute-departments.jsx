import React, {useEffect, useState} from "react";
import Card from '../components/card';
import {Header} from "../components/header";
import {useLocation} from "react-router-dom";
import Typography from "@mui/material/Typography";
import SettingsIcon from '@mui/icons-material/Settings';
import {IconButton} from "@mui/material";
import {Link} from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import api from "../generic-services/api";
import Chart from "react-apexcharts";
import placeholder from '../department.jpeg'

export function InstituteDepartments() {
  const location = useLocation();
  const data = location.state?.data;
  const [series, setSeries] = useState(null)

  useEffect(()=>{
    api.execute(`/api/stats/institute/${data.id}/attendance-stats`)
      .then(res=> setSeries([res.data.present,res.data.total-res.data.present]))
      .catch(e => console.log(e))
  },[])

  const [opt2, setOpt2] = useState({
    chart: {
      width: 380,
      type: 'donut',
    },
    plotOptions: {
      pie: {
        expandOnClick : true,
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
    colors:['#00FF00','#FF0000'],
    labels: ['Presents', 'Absents'],
    legend: {
     show: false
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
  return (
    <React.Fragment>
      <div className="min-w-[310px]">
        <Header isSideBarEnabled={false}/>
        <div className="mx-2 md:mx-16 flex flex-col md:px-8 xl:px-0">
          <main className="flex-1">
            <div className="flex justify-center">
              <div className="px-6 py-6 lg:w-5/6 max-w-[1500px]">

                <div className="px-4 sm:px-6 md:px-0">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl lg:text-2xl text-[#6366F1] font-bold">{data.name}</h2>
                      <p className="text-xs">(Note: Can't enter Departments. You are only entitled to see stats and update departments' settings)</p>
                    </div>

                    <Link to={location.pathname + "/settings"}>
                      <IconButton>
                        <AddIcon/>
                      </IconButton>
                      <IconButton>
                        <SettingsIcon/>
                      </IconButton>
                    </Link>
                  </div>
                  <h1 className="mt-6 text-xl lg:text-2xl text-[#6366F1] font-bold mt-2">Departments</h1>
                  <div className="mt-10 flex flex-wrap gap-4 mt-6">
                    {data.departments &&
                      data.departments.map(item => (
                        <Card classId={item.id} className="mx-auto" key={item.id}
                              pathname ={'/department/'+item.id+'/settings'}
                              image={item.imageUrl ?? placeholder}
                              classname={item.name || item.class}
                              classsection={item.section} classdetails={item?.institute?.name}
                        />
                      ))}

                  </div>
                  <hr/>
                  <div>
                    { series &&
                      <div>
                        <h1 className="text-xl lg:text-2xl text-[#6366F1] font-bold mt-2">Institute Stats</h1>
                        <div className="mt-4 flex justify-center flex-col items-center">
                      <div className="flex justify-center items-center mb-1">
                      <div id="chart" className="min-h-[270px]">
                      <Chart options={opt2} series={series} type="donut" width={350}/>
                      </div>
                      </div>
                        <h1 className="font-semibold mt-2">Institute's Aggregated Attendance</h1>
                      </div>
                      </div>

                    }
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </React.Fragment>
  )
}
