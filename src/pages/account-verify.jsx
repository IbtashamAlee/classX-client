import React from "react";

export function AccountVerify(props) {
  return (
    <div className="flex items-center justify-center flex-col h-full w-full">
      <div className="mx-12 flex items-center justify-center flex-col">
        <img src="./account-verify.svg" className="h-72 mb-12"/>
        <div className="text-slate-600 min-w-96 text-center">
          We appreciate your time.
          <br></br>
          We have created your account. For using classX services please first verify your email. Thanks :)
        </div>
      </div>
    </div>
  )
}
