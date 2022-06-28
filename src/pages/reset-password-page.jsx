import React, {useEffect, useState} from "react";
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {Button} from "@mui/material";
import {Link, useNavigate, useParams} from "react-router-dom";
import Api from "../generic-services/api";
import {Notification} from "../components/notification";

export function ResetPasswordPage(props) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [isResetting, setIsResetting] = useState(false);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  let {token} = useParams();
  let navigate =  useNavigate();

  const resetPassword = () => {
    Api.execute("/api/auth/password-reset/" + token, "post", {
      password: password
    }).then(r => {
      setTitle("Password reset");
      setMessage("Your password reset successfully");
      setIsResetting(true);
      setPassword('');
      setConfirmPassword('');
    }).catch(err => {
      setTitle("Something went wrong!");
      setMessage("An error occurred while resetting your password");
      setIsResetting(true);
    })
  }

  function closeNotification() {
    setIsResetting(false);
  }

  useEffect(() => {
    ValidatorForm.addValidationRule('isPassword6Char', (value) => {
      if (password.length < 4) {
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

  return(
      <React.Fragment>
        {isResetting && <Notification title={title} message={message} closeNotification={closeNotification} isOpened={isResetting}/>}
        <div className="flex items-center justify-center flex-col h-full w-full bg-slate-50">
          <div className="md:mx-12 sm:mx-auto sm:w-full sm:max-w-md flex items-center justify-center flex-col bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 relative overflow-hidden">
            <div className="text-slate-600 text-center mx-auto w-full">
              <div className="my-6">
                <div className="text-slate-600 min-w-96 text-center text-xl font-normal leading-9">
                  Reset your password
                  <br></br>
                </div>
                <div>
                  Or&nbsp;
                  <Link to="/">
                          <span className="text-indigo-600 hover:text-indigo-500">
                            Goto home
                          </span>
                  </Link>
                </div>
              </div>
              <ValidatorForm className="space-y-6" onSubmit={resetPassword}>
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
                    errorMessages={['This field is required', 'Password must be at least 4 characters']}
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
                <Button variant="contained" color="primary" type="submit" className="w-full">
                  Reset
                </Button>
              </ValidatorForm>
            </div>
          </div>
        </div>
      </React.Fragment>
  )
}
