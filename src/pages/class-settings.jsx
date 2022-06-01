import { useState } from 'react';
import { Switch} from '@headlessui/react';
import { TrashIcon } from '@heroicons/react/solid';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
import {Button} from "@mui/material";


const data = {
  name: 'CHEMISTRY',
  description: 'This is class for new comers of FA18-BCS-055',
  imageUrl:
    'data:image/jpeg;base64,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',
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ClassSettings() {
  const [availableToHire, setAvailableToHire] = useState(true)
  const [privateAccount, setPrivateAccount] = useState(false)
  const [allowCommenting, setAllowCommenting] = useState(true)

  return (
    <div>
      <main className="mt-10">
        <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-9 lg:divide-y-0 lg:divide-x">
              <ValidatorForm className="divide-y divide-gray-200 lg:col-span-9" action="#" method="POST">
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
                            defaultValue={data.name}
                        />
                        <TextValidator
                            id="about"
                            name="about"
                            minRows={2}
                            maxRows={4}
                            multiline
                            label={"Description"}
                            className="w-full"
                            defaultValue={data.description}
                        />
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
                            <img className="rounded-full h-full w-full" src={data.imageUrl} alt="" />
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
                        <img className="relative rounded-full w-40 h-40" src={data.imageUrl} alt="" />
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
