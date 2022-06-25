import React, {useEffect, useState} from 'react'
import {Header} from "../components/header";
import {useSelector} from "react-redux";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import IconButton from "@mui/material/IconButton";
import Api from "../generic-services/api";
import {useNavigate} from 'react-router-dom';
import UserSettings from "./user-settings";

const profile = {
  coverImageUrl:
    'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const tabs = ['Settings','Sessions']
  const [sessions, setSessions] = useState([])
  const navigate = useNavigate()
  const [currentTab, setCurrentTab] = useState("Settings");

  function removeSession(sessionId, isCurrent=false) {
    Api.execute('/api/auth/logout', 'put', {
      sessionId: sessionId
    })
      .then((res) => {
        const temp = sessions.filter(s => s.id !== sessionId)
        setSessions(temp)
        if(isCurrent) {
          localStorage.removeItem('access_token');
          navigate('/signin');
        }
      })
      .catch(e => console.log(e))
  }

  useEffect(() => {
    Api.execute('/api/auth/sessions')
      .then((res) => {
        setSessions(res.data)
      })
      .catch(e => console.log(e))
  }, [])
  const user = useSelector((state => state.user.user));

  return (
    <div>
      <Header/>
      <div className="flex flex-col justify-center items-center h-full mx-3">
        <div className="flex  w-full lg:w-3/4 shadow mt-10 rounded-b-md flex-col pb-4 mb-4">
          <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
            <div className="flex-1 relative z-0 flex overflow-hidden">
              <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">

                <article>
                  <div>
                    <div>
                      <img className="h-32 w-full object-cover lg:h-48 rounded-t-md"
                           src={profile.coverImageUrl} alt=""/>
                    </div>
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                        <div className="flex">
                          <img
                            className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32 object-cover"
                            src={user?.imageUrl ? user?.imageUrl : `${window.location.origin}/Sample_User_Icon.png`}
                            alt=""
                          />
                        </div>
                        <div
                          className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                          <div className="sm:hidden 2xl:block mt-6 min-w-0 flex-1">
                            <h1 className="text-2xl font-bold text-gray-900 truncate">{user?.name}</h1>
                          </div>
                        </div>
                      </div>
                      <div className="hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1">
                        <h1 className="text-2xl font-bold text-gray-900 truncate">{user?.name}</h1>
                        <h1 className="text-sm font-normal text-[#6366F1] truncate">{user?.email}</h1>

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

                </article>
              </main>
            </div>
          </div>
          <hr className="w-5/6 m-auto mb-4"/>
          {/*//SESSION INFO HERE*/}
          { currentTab === 'Sessions' &&
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-xl font-semibold text-gray-900">User Sessions</h1>
                  <p className="mt-2 text-sm text-gray-700">
                    Following are your active sessions across all devices
                  </p>
                  <p className="text-xs text-gray-600">
                    (green indicates current session)
                  </p>
                </div>
              </div>
              <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                          >

                          </th>

                          <th
                            scope="col"
                            className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                          >
                            Remove
                          </th>

                          <th
                            scope="col"
                            className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                          >
                            Created At
                          </th>

                          <th
                            scope="col"
                            className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            IP Address
                          </th>
                          <th
                            scope="col"
                            className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Device
                          </th>
                          <th
                            scope="col"
                            className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Browser
                          </th>
                          <th
                            scope="col"
                            className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            OS
                          </th>

                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                        {sessions.map((session, key) => (
                          <tr key={session.id}
                              className={localStorage.getItem('access_token') === session.token ? "bg-green-200" : ""}>
                            <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                              {key + 1}
                            </td>
                            <td
                              className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 flex justify-center items-center">
                              <IconButton style={{padding: 0}} onClick={() => {
                                if (localStorage.getItem('access_token'))
                                  removeSession(session.id, localStorage.getItem('access_token') === session.token)
                              }}>
                                <RemoveCircleOutlineIcon className="text-red-500" style={{height: '1.3rem'}}/>
                              </IconButton>
                            </td>
                            <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                              {session.createdAt}
                            </td>

                            <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">{session.ipv4Address}</td>
                            <td
                              className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{session.device_model === 'undefined-undefined-undefined' ? 'undefined' : session.device_model}</td>
                            <td
                              className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{session.browser_family + ' / ' + session.browser_version}</td>
                            <td
                              className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{session.os_family + ' ' + session.os_version}</td>
                          </tr>
                        ))}

                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
          {
            currentTab === 'Settings' &&
            <div>
              <UserSettings/>
            </div>
          }
        </div>
      </div>

    </div>
  )
}
