import React, {useEffect, useState} from 'react'
import {Switch} from '@headlessui/react'
import KeyIcon from '@mui/icons-material/Key';
import placeholder from '../Sample_User_Icon.png';
import {useSelector} from "react-redux";
import {Button} from "@mui/material";
import Api from "../generic-services/api";
import {Notification} from "../components/notification";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function UserSettings() {
  const data = useSelector(state => state.user.user)
  const [allowEmail, setAllowEmail] = useState(true);
  const [isResetting, setIsResetting] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const resetPassword = () => {
    Api.execute("/api/auth/password-reset", "post", {
      email: data.email
    }).then(r => {
      setTitle("Reset Link Sent!");
      setMessage("Visit your email to reset your password.");
      setIsResetting(true);
    }).catch(err => {
      setTitle("Something went wrong!");
      setMessage("An error occurred while sending your reset link");
      setIsResetting(true);
    })
  }

  function closeNotification() {
    setIsResetting(false);
  }

  return(
    <div>
      {isResetting && <Notification title={title} message={message} closeNotification={closeNotification} isOpened={isResetting}/>}
      {data &&
      <main className="mt-0">
        <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-9 lg:divide-y-0 lg:divide-x">
              <form className="divide-y divide-gray-200 lg:col-span-9" action="#" method="POST">
                {/* Profile section */}
                <div className="py-6 px-4 sm:p-6 lg:pb-8">
                  <div>
                    <h2 className="text-lg leading-6 font-medium text-gray-900">PROFILE</h2>
                  </div>

                  <div className="mt-6 flex flex-col lg:flex-row">
                    <div className="flex-grow space-y-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <div className="mt-1 rounded-md shadow-sm flex">
                          <input
                            type="email"
                            name="classname"
                            id="classname"
                            autoComplete="classname"
                            className="focus:ring-sky-500 focus:border-sky-500 flex-grow block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300 bg-gray-300"
                            defaultValue={data.email}
                            disabled={true}
                          />
                        </div>


                      </div>

                      <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                          Name
                        </label>
                        <div className="mt-1 rounded-md shadow-sm flex">
                          <input
                            type="text"
                            name="classname"
                            id="classname"
                            autoComplete="classname"
                            className="focus:ring-sky-500 focus:border-sky-500 flex-grow block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                            defaultValue={data.name}
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
                            defaultValue={data.userStatus}
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
                            <img className="rounded-full h-full w-full" src={data.imageUrl ?? placeholder} alt=""/>
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

                <div className="pt-6 divide-y divide-gray-200">
                  <div className="px-4 sm:px-6">
                    <div>
                      <h2 className="text-lg leading-6 font-medium text-gray-900">SETTINGS</h2>
                    </div>
                    <ul role="list" className="mt-2 divide-y divide-gray-200">
                      <Switch.Group as="li" className="py-4 flex items-center justify-between">
                        <div className="flex flex-col">
                          <Switch.Label as="p" className="text-sm font-medium text-gray-900" passive>
                            Allow sending notifications via email
                          </Switch.Label>
                          <Switch.Description className="text-sm text-gray-500">
                            Enable if you want to recieve all notifications via email
                          </Switch.Description>
                        </div>
                        <Switch
                          checked={allowEmail}
                          onChange={setAllowEmail}
                          className={classNames(
                            allowEmail ? 'bg-teal-500' : 'bg-gray-200',
                            'ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className={classNames(
                              allowEmail ? 'translate-x-5' : 'translate-x-0',
                              'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                            )}
                          />
                        </Switch>
                      </Switch.Group>
                    </ul>
                  </div>


                  <div className="mt-4 py-4 px-4 flex justify-end sm:px-6">
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

                  <div className="flex justify-center items-center my-1 py-2">
                    <Button
                        startIcon={<KeyIcon/>}
                        variant={"contained"}
                        onClick={resetPassword}
                    >
                      RESET PASSWORD ?
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      }
    </div>

  )
}
