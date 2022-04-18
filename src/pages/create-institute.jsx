import React, {useState} from 'react';
import {Button, TextField, FormControl, InputLabel, Select, MenuItem} from "@mui/material";
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {useDispatch} from "react-redux";
import {requestInstitute} from "../redux/actions/institute-actions"

export default function CreateInstitute() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [country, setCountry] = useState('Pakistan');
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState('University');

  const dispatch = useDispatch();

  const submitInstitute = () => {
    console.log("Hello")
    dispatch(requestInstitute(name, type));
  }

  return (
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <ValidatorForm className="space-y-8 divide-y divide-gray-200" onSubmit={submitInstitute}>
            <div className="space-y-8 divide-y divide-gray-200">
              <div>
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Institute Information</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    This information will be displayed to all participants.
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <TextValidator
                        value={name}
                        helperText="Please enter your institute name"
                        onChange={event => setName(event.target.value)}
                        className="block w-full"
                        type="text"
                        name="institute-name"
                        id="institute-name"
                        label="Institute Name"
                        autoComplete="institute-name"

                        validators={['required']}
                        errorMessages={['This field is required']}
                    />
                  </div>
{/*
                  <div className="sm:col-span-3">
                    <TextValidator
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                        helperText="Enter institute official email"
                        className="block w-full"
                        id="email"
                        label="Email"
                        type="email"
                        autoComplete="current-email"

                        validators={['required', 'isEmail']}
                        errorMessages={['This field is required', 'Email is not valid']}
                    />
                  </div> */}

                  <div className="sm:col-span-3">
                    <FormControl fullWidth variant="filled">
                      <InputLabel id="demo-simple-select-label">Institute Type</InputLabel>
                      <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={type}
                          label="Select Country"
                          onChange={event => {setType(event.target.value)}}
                      >
                        <MenuItem value={"University"}>{"University"}</MenuItem>
                        <MenuItem value={"College"}>{"College"}</MenuItem>
                        <MenuItem value={"School"}>{"School"}</MenuItem>
                      </Select>
                    </FormControl>
                  </div>

                  <div className="sm:col-span-6">
                    <TextValidator
                        value={street}
                        onChange={event => setStreet(event.target.value)}
                        helperText="Enter your street address"
                        type="text"
                        name="street-address"
                        id="street-address"
                        label={"Street Address"}
                        autoComplete="street-address"
                        className="w-full"
                        validators={['required']}
                        errorMessages={['This field is required']}
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <TextValidator
                        value={city}
                        onChange={event => setCity(event.target.value)}
                        helperText="Enter your city"
                        type="text"
                        name="city"
                        id="city"
                        label="City"
                        autoComplete="address-level2"
                        className="w-full"
                        validators={['required']}
                        errorMessages={['This field is required']}
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <FormControl fullWidth variant="filled">
                      <InputLabel id="demo-simple-select-label">Country</InputLabel>
                      <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={country}
                          label="Select Country"
                          onChange={event => {setCountry(event.target.value)}}
                      >
                        <MenuItem value={"Pakistan"}>{"Pakistan"}</MenuItem>
                      </Select>
                    </FormControl>
                  </div>

                  <div className="sm:col-span-6">
                    <div className="mt-1">
                      <TextField
                          value={description}
                          onChange={event => setDescription(event.target.value)}
                          helperText="Enter a short description about your institute"
                          id="description"
                          label="Description"
                          rows={3}
                          multiline={true}
                          className="block w-full"
                      />
                    </div>

                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                      Avatar
                    </label>
                    <div className="mt-1 flex items-center">
                <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                  <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path
                        d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"/>
                  </svg>
                </span>
                      <button
                          type="button"
                          className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Change
                      </button>
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-700">
                      Attach any document for verification
                    </label>
                    <div
                        className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                        >
                          <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only"/>
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">Any Supporting documents upto 10mb</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-5">
              <div className="flex justify-end space-x-3">
                <Button
                    type="button">
                  Cancel
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                >
                  Send Request
                </Button>
              </div>
            </div>
          </ValidatorForm>
        </div>
      </div>
  )
}
