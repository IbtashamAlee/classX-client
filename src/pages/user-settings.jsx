import React, {useEffect, useState} from 'react'
import {Switch} from '@headlessui/react'
import KeyIcon from '@mui/icons-material/Key';
import placeholder from '../Sample_User_Icon.png';
import {useDispatch, useSelector} from "react-redux";
import {Button, TextField} from "@mui/material";
import Api from "../generic-services/api";
import {Notification} from "../components/notification";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import {FilePicker} from "../components/file-picker";
import {TrashIcon} from "@heroicons/react/solid";
import {getUser} from "../redux/actions/user-actions";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function UserSettings() {
  const data = useSelector(state => state.user.user)
  const [allowEmail, setAllowEmail] = useState(true);
  const [isResetting, setIsResetting] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const [name, setName] =  useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] =  useState('');
  const [isOpen, setIsOpen] = useState(false);

  let dispatch = useDispatch();

  let handleClose = () => {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    setName(data?.name)
    setEmail(data?.email);
    setStatus(data?.userStatus)
  }, [data])

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

  let changeProfileImage = (files) => {
    Api.execute('/api/user/profile-pic/', 'put', {
      imageUrl: files[0].publicUrl
    }).then(res => {
      dispatch(getUser());
    }).catch(err => {
      console.log(err);
    })
  }

  let updateProfile = () => {
    Api.execute('/api/user/status', 'put', {
      status: status,
      name: name
    }).then(res => {
      dispatch(getUser());
      setTitle("Profile Updated!");
      setMessage("User profile updates successfully");
      setIsResetting(true);
    }).catch(err => {
      setTitle("Something went wrong!");
      setMessage("An error occurred while updating your profile");
    })
  }

  return(
    <div>
      <Notification title={title} message={message} closeNotification={closeNotification} isOpened={isResetting}/>
      {data &&
          <main className="mt-10">
            <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-9 lg:divide-y-0 lg:divide-x">
                  <ValidatorForm className="divide-y divide-gray-200 lg:col-span-9" onSubmit={updateProfile}>
                    {/* Profile section */}
                    <div className="py-6 px-4 sm:p-6 lg:pb-8">
                      <div>
                        <h2 className="text-lg leading-6 font-medium text-gray-900">Update Profile</h2>
                        <p className="mt-1 text-sm text-gray-500">
                          You can update your name and status
                        </p>
                      </div>

                      <div className="mt-6 flex flex-col lg:flex-row">
                        <div className="flex-grow space-y-6">
                          <div className={"space-y-4"}>
                            <TextValidator
                                type="text"
                                name="classname"
                                id="classname"
                                autoComplete="classname"
                                label={"Email"}
                                className="w-full"
                                value={email}
                                disabled={true}
                            />

                            <TextValidator
                                id="about"
                                name="about"
                                label={"Name"}
                                className="w-full"
                                value={name}
                                onChange={e => {setName(e.target.value)}}
                                validators={['required']}
                                errorMessages={['This field is required']}
                            />

                            <TextValidator
                                id="about"
                                name="about"
                                label={"Status"}
                                className="w-full"
                                value={status}
                                onChange={e => {setStatus(e.target.value)}}
                            />
                          </div>
                        </div>

                        <div className="mt-6 flex-grow lg:mt-0 lg:ml-6 lg:flex-grow-0 lg:flex-shrink-0">
                          <p className="text-sm font-medium text-gray-700" aria-hidden="true">
                            Photo
                          </p>
                          <div className="mt-1 lg:hidden" onClick={() => {setIsOpen(!isOpen)}}>
                            <div className="flex items-center">
                              <div
                                  className="flex-shrink-0 inline-block rounded-full overflow-hidden h-12 w-12"
                                  aria-hidden="true"
                              >
                                <img className="rounded-full h-full w-full" src={data?.imageUrl} alt="" />
                              </div>
                              <div className="ml-5 rounded-md shadow-sm">
                                <div className="group relative border border-gray-300 rounded-md py-2 px-3 flex items-center justify-center hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sky-500">
                                  <label
                                      htmlFor="mobile-user-photo"
                                      className="relative text-sm leading-4 font-medium text-gray-700 pointer-events-none"
                                  >
                                    <span>Change</span>
                                    <span className="sr-only"> user photo</span>
                                  </label>
                                  {/*<input*/}
                                  {/*  id="mobile-user-photo"*/}
                                  {/*  name="user-photo"*/}
                                  {/*  type="file"*/}
                                  {/*  className="absolute w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"*/}
                                  {/*/>*/}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="hidden relative rounded-full overflow-hidden lg:block" onClick={() => {setIsOpen(!isOpen)}}>
                            <img className="relative rounded-full w-40 h-40" src={data?.imageUrl} alt="" />
                            <label
                                htmlFor="desktop-user-photo"
                                className="cursor-pointer absolute inset-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center text-sm font-medium text-white opacity-0 hover:opacity-100 focus-within:opacity-100"
                            >
                              <span>Change</span>
                              <span className="sr-only"> user photo</span>
                            </label>
                          </div>
                          {isOpen &&
                              <FilePicker accept={true} open={isOpen}  close={handleClose} fileReturn={changeProfileImage}/>
                          }
                        </div>
                      </div>
                    </div>

                    {/* Privacy section */}
                    <div className="pt-3 divide-y divide-gray-200">

                      <div className="mt-2 py-4 px-4 flex justify-end sm:px-6 space-x-2">
                        <Button
                            type="submit"
                            variant={"contained"}
                        >
                          Save
                        </Button>
                      </div>
                      <div className="flex justify-center items-center my-1 py-2">
                        <Button
                            startIcon={<KeyIcon/>}
                            variant={"outlined"}
                            onClick={resetPassword}
                        >
                          RESET PASSWORD ?
                        </Button>
                      </div>
                    </div>
                  </ValidatorForm>
                </div>
              </div>
            </div>
          </main>
      }
    </div>

  )
}
