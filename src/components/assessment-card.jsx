import React from 'react';
import {CalendarIcon} from "@heroicons/react/solid";
import {getEndingDate} from "../functions/date-functions";
import {Button} from "@mui/material";

export function AssessmentCard(props) {
  return (
      <div
          className="block p-4 max-w-full bg-white rounded-lg border border-gray-200 shadow-sm hover:bg-gray-100 flex justify-between item-center">
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
            Submit
          </Button>
        </div>
      </div>
  )
}
