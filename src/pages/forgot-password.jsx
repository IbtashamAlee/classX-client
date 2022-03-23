import React, {useState} from "react";
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import Api from "../generic-services/api";
import {Notification} from "../components/notification";

export function ForgotPassword(props) {
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [isResetting, setIsResetting] = useState(false);

  const resetPassword = () => {
    Api.execute("/auth/password-reset", "post", {
      email: email
    }).then(r => {
      setTitle("Reset Link Sent!");
      setMessage("Visit your email to reset your password.");
      setEmail("");
      setIsResetting(true);
    }).catch(err => {
      setTitle("Something went wrong!");
      setMessage("An error occurred while sending your reset link");
      setEmail("");
      setIsResetting(true);
    })
  }

  function closeNotification() {
    setIsResetting(false);
  }

  return(
      <React.Fragment>
        {isResetting && <Notification title={title} message={message} closeNotification={closeNotification} isOpened={isResetting}/>}
        <div className="flex items-center justify-center flex-col h-full w-full bg-slate-50">
          <div className="md:mx-12 sm:mx-auto sm:w-full sm:max-w-md flex items-center justify-center flex-col bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 relative overflow-hidden">
            <img src="./forgot-password.png" alt="nothing found" className="h-52"/>
            <div className="text-slate-600 text-center mx-auto w-full">
              <div className="my-6">
                <div className="text-slate-600 min-w-96 text-center text-xl font-normal leading-9">
                  Forgot your password?
                  <br></br>
                </div>
                <div>
                  Or&nbsp;
                  <Link to="/signin">
                          <span className="text-indigo-600 hover:text-indigo-500">
                            Goto sign in
                          </span>
                  </Link>
                </div>
              </div>
              <ValidatorForm className="space-y-6" onSubmit={resetPassword}>
                <TextValidator
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    autoFocus={true}
                    fullWidth={true}
                    className="block w-full"
                    id="email"
                    label="Email"
                    type="email"
                    autoComplete="current-email"
                    color="primary"
                    validators={['required', 'isEmail']}
                    errorMessages={['This field is required', 'Email is not valid']}
                />
                <Button variant="contained" color="primary" type="submit" className="w-full">
                  Get reset link
                </Button>
              </ValidatorForm>
            </div>
          </div>
        </div>
      </React.Fragment>
  )
}
