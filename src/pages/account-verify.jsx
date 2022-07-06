import React from "react";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

export function AccountVerify(props) {
    const navigate  = useNavigate();
    return(
        <div className="flex items-center justify-center flex-col h-full w-full">
            <div className="mx-12 flex items-center justify-center flex-col">
                <img src="./account-verify.svg" alt="nothing found" className="h-72 mb-12"/>
                <div className="text-slate-600 min-w-96 text-center">
                    We appreciate your time.
                    <br></br>
                    We have created your account. For using classX services please first verify your email. Thanks :)
                    <br></br>

                    <Button variant="contained" className="!mt-6" onClick={()=>navigate('/signin')}>BACK TO LOGIN</Button>
                </div>
            </div>
        </div>
    )
}
