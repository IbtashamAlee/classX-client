import React, {useEffect, useState} from "react";
import {Button} from "@mui/material";
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Carousel from 'react-material-ui-carousel';
import {Link, useNavigate} from "react-router-dom"
import {signupUser} from "../redux/actions/auth-actions";
import {useDispatch} from "react-redux";

export function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  let dispatch = useDispatch();
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

  const signup = () => {
    dispatch(signupUser(email, password, name, navigate));
  }

  useEffect(() => {
    ValidatorForm.addValidationRule('isPassword6Char', (value) => {
      if (password.length < 3) {
        return false;
      }
      return true;
    });
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== password) {
        return false;
      }
      return true;
    });
  }, [password, confirmPassword])

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
                <h2 className="mt-6 text-3xl font-bold text-gray-900">Sign up</h2>
                <p className="font-medium mt-2 text-sm text-gray-900">
                  Please enter your credentials to continue
                </p>
              </div>

              <div className="mt-8">
                <div className="mt-6">
                  <ValidatorForm className="space-y-6" onSubmit={signup}>
                    <TextValidator
                        value={name}
                        onChange={event => setName(event.target.value)}
                        className="block w-full"
                        id="name"
                        label="Name"
                        type="name"
                        autoComplete="current-name"
                        variant="outlined"
                        validators={['required']}
                        errorMessages={['This field is required']}
                    />
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
                        errorMessages={['This field is required', 'Password must be at least 3 characters']}
                    />
                    <TextValidator
                        value={confirmPassword}
                        onChange={event => setConfirmPassword(event.target.value)}
                        className="block w-full"
                        id="confirm-password"
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        validators={['isPasswordMatch', 'required']}
                        errorMessages={['Password does not match', 'This field is required']}
                    />

                    <div>
                      <Button variant="contained" color="primary" type="submit"
                              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Sign up
                      </Button>
                      <div className="text-gray-900 mt-2">
                        Already have an account?
                        <Link to="/signin">
                          <Button variant="text">Sign in</Button>
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
                  duration={1000}
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
          <img src={props.item.image} className="select-none" alt="Not found :("/>
          <h2 className="font-semibold my-2 text-slate-600">{props.item.title}</h2>
          <p className="text-slate-400">{props.item.description}</p>
        </div>
      </div>
  )
}
