import React, {useEffect, useState} from "react";
import {Button} from "@mui/material";
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Carousel from 'react-material-ui-carousel'
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {signinUser} from "../redux/actions/auth-actions";

export function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  let navigate = useNavigate();

  var items = [
    {
      title: "Class X is a great E-learning App",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
      image: "./resource-classroom1.png"
    },
    {
      title: "Random Name #2",
      description: "Hello World!",
      image: "./resource-classroom1.png"
    },
    {
      title: "Random Name #3",
      description: "Hello World!",
      image: "./resource-classroom1.png"
    }
  ]

  const signin = () => {
    dispatch(signinUser(email, password, navigate));
  }

  useEffect(() => {
    ValidatorForm.addValidationRule('isPassword6Char', (value) => {
      if (password.length < 6) {
        return false;
      }
      return true;
    });
  }, [password])

  return (
      <>
        <div className="min-h-full flex">
          <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div className="mx-auto w-full max-w-sm lg:w-96">
              <div>
                <img
                    className="h-12 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt="Workflow"
                />
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in</h2>
                <p className="font-medium mt-2 text-sm text-gray-900">
                  Please enter your credentials to continue
                </p>
              </div>

              <div className="mt-8">
                <div className="mt-6">
                  <ValidatorForm className="space-y-6" onSubmit={signin}>
                    <TextValidator
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                        className="block w-full"
                        id="email"
                        label="Email"
                        type="email"
                        autoComplete="current-email"

                        validators={['required', 'isEmail']}
                        errorMessages={['This field is required', 'Email is not valid']}
                    />
                    <div>
                      <TextValidator
                          value={password}
                          onChange={event => setPassword(event.target.value)}
                          className="block w-full"
                          id="password"
                          label="Password"
                          type="password"
                          autoComplete="current-password"
                          variant="outlined"
                          validators={['required', 'isPassword6Char']}
                          errorMessages={['This field is required', 'Password must be 6 characters long']}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                          Remember me
                        </label>
                      </div>

                      <div className="text-sm">
                        <Link to="/forgot-password">
                          <span className="font-medium text-indigo-600 hover:text-indigo-500">
                            Forgot your password?
                          </span>
                        </Link>
                      </div>
                    </div>

                    <div>
                      <Button variant="contained" color="primary" type="submit"
                              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Sign in
                      </Button>
                      <div className="text-gray-900 mt-2">
                        Don't have an account?
                        <Link to="/signup">
                          <Button variant="text">Sign up</Button>
                        </Link>
                      </div>
                    </div>
                  </ValidatorForm>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:block relative w-0 flex-1">
            <div className="bg-slate-100 .auth-carousel h-full w-full">
              <Carousel
                  navButtonsAlwaysInvisible={true}
                  animation="slide"
                  className="bg-slate-100 h-full flex flex-col justify-center items-center"
              >
                {
                  items.map( (item, i) => <Item key={i} item={item} /> )
                }
              </Carousel>
            </div>
          </div>
        </div>
      </>
  )
}

function Item(props)
{
  return (
      <div className="auth-carousel__item flex flex-col items-center justify-center text-center">
        <div className="auth-carousel__item-inner">
          <img src={props.item.image} className="select-none"/>
          <h2 className="font-semibold my-2 text-slate-600">{props.item.title}</h2>
          <p className="text-slate-400">{props.item.description}</p>
        </div>
      </div>
  )
}
