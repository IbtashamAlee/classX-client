import {useEffect, useState} from 'react';
import { TrashIcon } from '@heroicons/react/solid';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
import {Button} from "@mui/material";
import {FilePicker} from "../components/file-picker";
import Api from "../generic-services/api";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import api from "../generic-services/api";
import {useNavigate} from 'react-router-dom'


export default function ClassSettings() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  let current_class = useSelector((state => state.current_class.class))

  const [name, setName] =  useState('');
  const [description, setDescription] =  useState('');

  let {id} = useParams();

  let handleClose = () => {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    setName(current_class?.name)
    setDescription(current_class?.description)
  }, [current_class])

  useEffect(()=>{
    api.execute('/api/class/'+id+'/role')
      .then(res => {
        if (res.data ==='Student') navigate(-1)
          })
      .catch(e => console.log(e))
  })
  let changeProfileImage = (files) => {
    Api.execute('/api/class/'+ id + '/profile-pic', 'put', {
      imageUrl: files[0].publicUrl
    }).then(res => {
      // get Class settings
    }).catch(err => {
      console.log(err);
    })
  }

  let updateClass = () => {

  }

  return (
    <div>
      <main className="mt-10">
        <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-9 lg:divide-y-0 lg:divide-x">
              <ValidatorForm className="divide-y divide-gray-200 lg:col-span-9" onSubmit={updateClass}>
                {/* Profile section */}
                <div className="py-6 px-4 sm:p-6 lg:pb-8">
                  <div>
                    <h2 className="text-lg leading-6 font-medium text-gray-900">Class Details</h2>
                    <p className="mt-1 text-sm text-gray-500">
                      This information will be displayed publicly so be careful what you share.
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
                            label={"Class Name"}
                            className="w-full"
                            value={name}
                            onChange={e => {setName(e.target.value)}}
                        />
                        <TextValidator
                            id="about"
                            name="about"
                            minRows={2}
                            maxRows={4}
                            multiline
                            label={"Description"}
                            className="w-full"
                            value={description}
                            onChange={e => {setDescription(e.target.value)}}
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
                            <img className="rounded-full h-full w-full" src={current_class?.imageUrl} alt="" />
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
                        <img className="relative rounded-full w-40 h-40" src={current_class?.imageUrl} alt="" />
                        <label
                          htmlFor="desktop-user-photo"
                          className="cursor-pointer absolute inset-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center text-sm font-medium text-white opacity-0 hover:opacity-100 focus-within:opacity-100"
                        >
                          <span>Change</span>
                          <span className="sr-only"> user photo</span>
                        </label>
                      </div>
                      {isOpen &&
                          <FilePicker open={isOpen}  close={handleClose} fileReturn={changeProfileImage}/>
                      }
                    </div>
                  </div>
                </div>

                {/* Privacy section */}
                <div className="pt-3 divide-y divide-gray-200">

                  <div className="mt-2 py-4 px-4 flex justify-between sm:px-6 space-x-2">
                    <Button
                        variant={"outlined"}
                        color={"error"}
                    >
                      <TrashIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
                      <p>Delete Class</p>
                    </Button>
                    <Button
                      type="submit"
                      variant={"contained"}
                      className="ml-5 bg-sky-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </ValidatorForm>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
