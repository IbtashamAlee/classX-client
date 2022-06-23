import React, { useState} from "react";
import Chart from "react-apexcharts";

export default function Stats(){
    const [options,setOptions] = useState({options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      }});
    const [series,setSeries] = useState([
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }
    ])

    return (
      <div className="app h-full">
        <div className="row flex flex-col justify-center items-center h-full">
          <div className="mixed-chart">
            <Chart
              options={options}
              series={series}
              type="bar"
              width="500"
            />
            <Chart
              options={options}
              series={series}
              type="line"
              width="500"
            />
            <Chart
              options={options}
              series={series}
              type="bar"
              width="500"
            />
          </div>
          <h1>ATTENDANCE DETAILS</h1>
        </div>
      </div>
    );
}