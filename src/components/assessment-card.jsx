import React from 'react';
import {CalendarIcon} from "@heroicons/react/solid";
import {getEndingDate} from "../functions/date-functions";
import {Button} from "@mui/material";
import placeholder from "../Sample_User_Icon.png";

export function AssessmentCard(props) {
  return (
      <div
          className="block p-4 max-w-full bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col justify-between item-center">
        <div className="flex items-center mb-8">
          <img src={props.assessment.user.imageUrl ?? placeholder } className="w-11 rounded-full"/>
          <div className="ml-5">
            <p className="text-sm">{props.assessment.user.name}</p>
            <p className="text-xs text-gray-500"> {props.assessment.startingTime.split('T')[0]}</p>
          </div>
        </div>
        <div className="w-full flex flex justify-between">
        <div>
          <h5 className="mb-2 font-medium text-gray-900 truncate">{props.assessment.assessment?.name}</h5>
          <div className="flex items-center text-sm text-gray-500">
            <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            <p>
              <time dateTime={props.assessment.startingTime}>{getEndingDate(props.assessment.startingTime)}</time>
            </p>
          </div>
        </div>
        <div className={"flex items-center"}>
          <Button variant={"contained"}>
            Attempt
          </Button>
        </div>
      </div>
      </div>
  )
}
