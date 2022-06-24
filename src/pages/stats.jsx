import React, {useEffect, useState} from "react";
import Chart from "react-apexcharts";
import api from "../generic-services/api";
import {useParams} from "react-router-dom";


export default function Stats() {
  let {id} = useParams();
  const [options, setOptions] = useState({
    chart: {
      height: 390,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: '30%',
          background: 'transparent',
          image: undefined,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: false,
          }
        }
      }
    },
    labels: ['Assessments', 'Posts', 'Attendance', 'Polls'],
    legend: {
      show: true,
      floating: true,
      fontSize: '12px',
      position: 'left',
      offsetX: -50,
      offsetY: 1,
      labels: {
        useSeriesColors: true,
      },
      markers: {
        size: 2
      },
      formatter: function (seriesName, opts) {
        return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
      },
      itemMargin: {
        vertical: 0
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        legend: {
          show: false
        }
      }
    }]
  });

  const [opt2, setOpt2] = useState({
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
  const [series, setSeries] = useState(null)
  const [series2, setSeries2] = useState(null)
  useEffect(() => {
    api.execute('/api/stats/class/' + id + '/general-stats')
      .then(res => {
        const d = res.data;
        console.log(res.data)
        setSeries([d.assessments, d.posts, d.attendances, d.polls])
      })
      .catch(e => console.log(e))
  }, [])

  useEffect(() => {
    api.execute('/api/stats/class/' + id + '/attendance-stats')
      .then(res => {
        const d = res.data;
        console.log(res.data)
        setSeries2([d.total_presents,d.total_attendances - d.total_presents])
      })
      .catch(e => console.log(e))
  }, [])

  return (

    <div className="mt-24 app h-full flex flex-row flex-wrap justify-between max-w-screen-md m-auto" >
      <div className="row flex flex-col justify-center items-center h-full">
        {series &&
        <div className="mixed-chart min-h-[270px] pt-0">
          <Chart options={options} series={series} type="radialBar" width={380}/>
        </div>
        }
        <h1 className="mb-12">Class Post Details</h1>
      </div>
      {series2 &&
        <div className="flex justify-center items-center flex-col">
          <div id="chart" className="min-h-[270px]">
            <Chart options={opt2} series={series2} type="donut" width={380}/>
          </div>
          <h1 className="mt-5 mb-12">Class' aggregated Attendance</h1>

        </div>
      }
    </div>
  );
}