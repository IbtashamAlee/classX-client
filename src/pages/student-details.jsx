import React, {useEffect, useState} from 'react'
import {MailIcon} from '@heroicons/react/solid'
import {useLocation, useParams} from 'react-router-dom'
import Api from "../generic-services/api";
import placeholder from '../Sample_User_Icon.png'
import Chart from "react-apexcharts";

const tabs = ['Profile', 'Attendance', 'Marks']

const profile = {
  name: 'Ricardo Cooper',
  imageUrl:
    'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
  coverImageUrl:
    'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  about: 'hello there',
  Email: 'ricardocooper@example.com'
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function StudentDetails() {
  const {id} = useParams()
  const location = useLocation();
  const userId = parseInt(location.state.id);
  const [user, setUser] = useState(null);
  const [attendanceState, setAttendanceState] = useState(null)
  const [marksState, setMarksState] = useState(null)
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
  const [attendances,setAttendances] = useState()
  useEffect(() => {
    Api.execute('/api/user/public/' + userId)
      .then((res) => {
        console.log(res.data)
        setUser(res.data)
      })
      .catch(e => console.log(e))
  }, [])

  useEffect(() => {
    Api.execute('/api/stats/class/' + id + '/student/' + userId + '/attendance-stats')
      .then(res => {
        setAttendanceState([res.data.present, res.data.total - res.data.present])
      })
      .catch(e => console.log(e))
  }, [])

  useEffect(() => {
    Api.execute('/api/stats/class/' + id + '/student/' + userId + '/marks-stats')
      .then(res => {
        setMarksState([res.data.obtainedMarks, res.data.totalMarks - res.data.obtainedMarks])
      })
      .catch(e => console.log(e))
  }, [])
  const [currentTab, setCurrentTab] = useState("Profile");

  useEffect(()=>{
    Api.execute('/api/stats/class/' + id + '/student/' + userId + '/attendance')
      .then(res => {
        setAttendances(res.data)
      })
      .catch(e => console.log(e))
  }, [])

  return (
    <>
      <div className="h-full flex-col">
        <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
          <div className="flex-1 relative z-0 flex overflow-hidden">
            <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
              <article>
                {/* Profile header */}
                <div>
                  <div>
                    <img className="h-32 w-full object-cover lg:h-48" src={profile.coverImageUrl} alt=""/>
                  </div>
                  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                      <div className="flex">
                        <img
                          className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                          src={user?.imageUrl ?? placeholder}
                          alt=""
                        />
                      </div>
                      <div
                        className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                        <div className="sm:hidden 2xl:block mt-6 min-w-0 flex-1">
                          <h1 className="text-2xl font-bold text-gray-900">{'hello'}</h1>
                        </div>
                        <div
                          className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                          <button
                            type="button"
                            className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                          >
                            <MailIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true"/>
                            <span>Message</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1">
                      <h1 className="text-2xl font-bold text-gray-900 truncate">{user?.name ?? ''}</h1>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="mt-6 sm:mt-2 2xl:mt-5">
                  <div className="border-b border-gray-200">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        {tabs.map((tab, k) => (
                          <a
                            key={k}
                            onClick={() => setCurrentTab(tab)}
                            className={classNames(
                              tab === currentTab
                                ? 'border-pink-500 text-gray-900'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                              'whitespace-nowrap py-4 px-1 border-b-2 cursor-default font-medium text-sm'
                            )}
                          >
                            {tab}
                          </a>
                        ))}
                      </nav>
                    </div>
                  </div>
                </div>

                {currentTab === "Profile" &&
                <div className="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Name</dt>
                      <dd className="mt-1 text-sm text-gray-900">{user?.name ?? ''}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Email</dt>
                      <dd className="mt-1 text-sm text-gray-900">{user?.email ?? ''}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Status</dt>
                      <dd className="mt-1 text-sm text-gray-900">{user?.description ?? '-'}</dd>
                    </div>
                  </dl>
                </div>
                }

                {currentTab === "Attendance" && attendanceState &&
                <div className="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex justify-center items-center flex-col">
                    <div id="chart" className="min-h-[270px]">
                      <Chart options={opt2} series={attendanceState} type="donut" width={380}/>
                    </div>
                    <h1 className="mt-5 mb-12">Student's Attendance</h1>
                  </div>
                  {/*TABLE*/}
                  { attendances &&
                    <div className="mt-8 flex flex-col">
                      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                              <thead className="bg-gray-50">
                              <tr>
                                <th scope="col"
                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                  Title
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                  Status
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                  Starting Date
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                  Starting Time
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                  Ending Date
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                  Ending Time
                                </th>

                              </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200 bg-white">
                              {attendances.map((person) => (
                                <tr key={person.email}>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.title}</td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span
                          className={(person.attendanceRecord[0].isPresent ? "text-green-800 bg-green-50"
                            : "text-red-800 bg-red-50") + " inline-flex rounded-full px-2 text-xs font-semibold leading-5"}>
                          {person.attendanceRecord[0].isPresent ? 'Present' : 'Absent'}
                        </span>
                                  </td>
                                  <td
                                    className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person?.startingTime?.split('T')[0]}</td>
                                  <td
                                    className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person?.startingTime?.split('T')[1].slice(0, 8)}</td>
                                  <td
                                    className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person?.endingTime?.split('T')[0]}</td>
                                  <td
                                    className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.endingTime.split('T')[1].slice(0, 8)}</td>
                                </tr>
                              ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                </div>
                }

                {currentTab === "Marks" && marksState &&
                <div className="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex justify-center items-center flex-col">
                    <div id="chart" className="min-h-[270px]">
                      <Chart options={opt3} series={marksState} type="donut" width={380}/>
                    </div>
                    <h1 className="mt-5 mb-12">Student's Aggregated Marks</h1>
                  </div>
                </div>
                }
              </article>
            </main>
          </div>
        </div>
      </div>
    </>
  )
}
