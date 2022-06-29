import React, {useEffect, useState} from 'react'
import { Switch} from '@headlessui/react'
import { TrashIcon } from '@heroicons/react/solid'
import {Header} from '../components/header'
import api from "../generic-services/api";
import {useParams} from "react-router-dom";
import Chart from "react-apexcharts";



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function InstituteSettings() {
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
  const [series, setSeries] = useState(null)
  const [data,setData] = useState(null)
  const {id} = useParams()

  useEffect(()=>{
    api.execute(`/api/stats/institute/${id}/attendance-stats`)
      .then(res=> setSeries([res.data.present,res.data.total-res.data.present]))
      .catch(e => console.log(e))
  },[])

  useEffect(()=>{
    api.execute('/api/institutes/'+id)
      .then(res=> setData(res.data))
      .catch(e=>console.log(e))
  },[])
  return (
    <div>
      <Header/>
      {data &&
        <main className="mt-10">
          <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-9 lg:divide-y-0 lg:divide-x">
                <form className="divide-y divide-gray-200 lg:col-span-9" action="#" method="POST">
                  {/* Profile section */}
                  <div className="py-6 px-4 sm:p-6 lg:pb-8">
                    <div>
                      <h2 className="text-xl lg:text-2xl text-[#6366F1] font-bold mt-2 ml-2">Institute Details</h2>
                      <p className="mt-1 text-sm text-gray-500">
                        This information will be displayed publicly so be careful what you share.
                      </p>
                    </div>

                    <div className="mt-6 flex flex-col lg:flex-row">
                      <div className="flex-grow space-y-6">
                        <div>
                          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Institute Name
                          </label>
                          <div className="mt-1 rounded-md shadow-sm flex">
                            <input
                              type="text"
                              name="classname"
                              id="classname"
                              autoComplete="classname"
                              className="focus:ring-sky-500 focus:border-sky-500 flex-grow block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300 bg-gray-200"
                              defaultValue={data.name}
                              disabled={true}
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Address
                          </label>
                          <div className="mt-1 rounded-md shadow-sm flex">
                            <input
                              type="text"
                              name="classname"
                              id="classname"
                              autoComplete="classname"
                              className="focus:ring-sky-500 focus:border-sky-500 flex-grow block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                              defaultValue={data.address}
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Country
                          </label>
                          <div className="mt-1 rounded-md shadow-sm flex">
                            <input
                              type="text"
                              name="classname"
                              id="classname"
                              autoComplete="classname"
                              className="focus:ring-sky-500 focus:border-sky-500 flex-grow block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                              defaultValue={data.country}
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            City
                          </label>
                          <div className="mt-1 rounded-md shadow-sm flex">
                            <input
                              type="text"
                              name="classname"
                              id="classname"
                              autoComplete="classname"
                              className="focus:ring-sky-500 focus:border-sky-500 flex-grow block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                              defaultValue={data.city}
                            />
                          </div>
                        </div>


                        <div>
                          <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                            Description
                          </label>
                          <div className="mt-1">
                          <textarea
                            id="about"
                            name="about"
                            rows={3}
                            className="shadow-sm focus:ring-sky-500 focus:border-sky-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                            defaultValue={data.description}
                          />
                          </div>
                          <p className="mt-2 text-sm text-gray-500">
                            Brief description of class
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 flex-grow lg:mt-0 lg:ml-6 lg:flex-grow-0 lg:flex-shrink-0">
                        <p className="text-sm font-medium text-gray-700" aria-hidden="true">
                          Photo
                        </p>
                        <div className="mt-1 lg:hidden">
                          <div className="flex items-center">
                            <div
                              className="flex-shrink-0 inline-block rounded-full overflow-hidden h-12 w-12"
                              aria-hidden="true"
                            >
                              <img className="rounded-full h-full w-full" src={data.imageUrl} alt=""/>
                            </div>
                            <div className="ml-5 rounded-md shadow-sm">
                              <div
                                className="group relative border border-gray-300 rounded-md py-2 px-3 flex items-center justify-center hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sky-500">
                                <label
                                  htmlFor="mobile-user-photo"
                                  className="relative text-sm leading-4 font-medium text-gray-700 pointer-events-none"
                                >
                                  <span>Change</span>
                                  <span className="sr-only"> user photo</span>
                                </label>
                                <input
                                  id="mobile-user-photo"
                                  name="user-photo"
                                  type="file"
                                  className="absolute w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="hidden relative rounded-full overflow-hidden lg:block">
                          <img className="relative rounded-full w-40 h-40" src={data.imageUrl} alt=""/>
                          <label
                            htmlFor="desktop-user-photo"
                            className="absolute inset-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center text-sm font-medium text-white opacity-0 hover:opacity-100 focus-within:opacity-100"
                          >
                            <span>Change</span>
                            <span className="sr-only"> user photo</span>
                            <input
                              type="file"
                              id="desktop-user-photo"
                              name="user-photo"
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Privacy section */}
                  <div className="pt-6 divide-y divide-gray-200">
                    <div className="mt-0 py-4 px-4 flex justify-end sm:px-6">
                      <button
                        type="button"
                        className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="ml-5 bg-sky-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>

            </div>

          </div>
          <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
            { series &&
            <div>
              <h1 className="text-xl lg:text-2xl text-[#6366F1] font-bold mt-2 ml-2">Institute Stats</h1>
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

        </main>
      }

    </div>
  )
}