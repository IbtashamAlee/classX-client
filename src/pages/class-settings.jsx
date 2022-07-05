import {useEffect, useState} from 'react';
import {TrashIcon} from '@heroicons/react/solid';
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator'
import {Button} from "@mui/material";
import {FilePicker} from "../components/file-picker";
import Api from "../generic-services/api";
import api from "../generic-services/api";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentClass, setCurrentRole} from "../redux/actions/user-actions";
import DeleteDialog from "../components/delete-dialog";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import UpdateIcon from '@mui/icons-material/Update';

export default function ClassSettings() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  let current_class = useSelector((state => state.current_class.class))
  let current_class_role = useSelector((state => state.current_class.role))

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('')
  const [key, setKey] = useState(0)
  let {id} = useParams();
  let dispatch = useDispatch();

  let handleClose = () => {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    setName(current_class?.name)
    setDescription(current_class?.description)
    setCode(current_class?.code)
  }, [current_class])

  useEffect(() => {
    if (current_class_role === 'Student') navigate(-1)
  }, [current_class_role])

  let changeProfileImage = (files) => {
    Api.execute('/api/class/' + id, "put", {
      imageUrl: files[0].publicUrl
    }).then(res => {
      dispatch(setCurrentClass(res.data))
    }).catch(err => {
      console.log(err);
    })
  }

  function updateCode() {
    api.execute(`/api/class/${id}/class-code`, 'PUT')
      .then(res => {
        getCurrentClass();
      }).catch(err => console.log(err))
  }

  const getCurrentClass = () => {
    Api.execute('/api/class/' + id).then(res => {
      dispatch(setCurrentClass(res.data))
      dispatch(setCurrentRole(res.data?.role))
    }).catch(err => {
      console.log(err);
    })
  }

  let updateClass = () => {
    Api.execute('/api/class/' + id, "put", {
      "description": description,
    }).then(res => {
      dispatch(setCurrentClass(res.data))
    }).catch(err => {
      console.log(err);
    })
  }

  let deleteClass = () => {
    Api.execute('/api/class/' + current_class.id + '/delete', "put").then(res => {
      navigate('/')
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <div key={key}>
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
                          disabled={true}
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
                          onChange={e => {
                            setDescription(e.target.value)
                          }}
                        />
                        <div className="flex flex-row justify-start items-center">
                          <TextValidator
                            id="code"
                            name="code"
                            minRows={1}
                            maxRows={1}
                            label={"Class Code"}
                            className="!w-full !col-span-3"
                            value={code}
                            disabled={true}
                          />
                          <ContentCopyIcon className="!h-4 ml-4 hover:fill-blue-700 hover:scale-[1.1]" onClick={() => {
                            navigator.clipboard.writeText(code)
                          }}/>
                          <UpdateIcon className="!h-4 ml-2 hover:fill-blue-700 hover:scale-[1.1]" onClick={updateCode}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex-grow lg:mt-0 lg:ml-6 lg:flex-grow-0 lg:flex-shrink-0">
                      <p className="text-sm font-medium text-gray-700" aria-hidden="true">
                        Photo
                      </p>
                      <div className="mt-1 lg:hidden" onClick={() => {
                        setIsOpen(!isOpen)
                      }}>
                        <div className="flex items-center">
                          <div
                            className="flex-shrink-0 inline-block rounded-full overflow-hidden h-12 w-12"
                            aria-hidden="true"
                          >
                            <img className="rounded-full h-full w-full" src={current_class?.imageUrl} alt=""/>
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
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="hidden relative rounded-full overflow-hidden lg:block" onClick={() => {
                        setIsOpen(!isOpen)
                      }}>
                        <img className="relative rounded-full w-40 h-40" src={current_class?.imageUrl} alt=""/>
                        <label
                          htmlFor="desktop-user-photo"
                          className="cursor-pointer absolute inset-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center text-sm font-medium text-white opacity-0 hover:opacity-100 focus-within:opacity-100"
                        >
                          <span>Change</span>
                          <span className="sr-only"> user photo</span>
                        </label>
                      </div>
                      {isOpen &&
                      <FilePicker accept={true} open={isOpen} close={handleClose} fileReturn={changeProfileImage}/>
                      }
                    </div>
                  </div>
                </div>

                {/* Privacy section */}
                <div className="pt-3 divide-y divide-gray-200">

                  <div className="mt-2 py-4 px-4 flex justify-between sm:px-6 space-x-2">
                    <DeleteDialog actionDone={deleteClass}>
                      <Button
                        variant={"outlined"}
                        color={"error"}
                      >
                        <TrashIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true"/>
                        <p>Delete Class</p>
                      </Button>
                    </DeleteDialog>
                    <Button
                      type="submit"
                      variant={"contained"}
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
