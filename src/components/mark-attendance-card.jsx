import React, {useEffect, useState} from "react";
import {CalendarIcon} from "@heroicons/react/solid";
import {Button} from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import {getEndingDate} from "../functions/date-functions";

export function MarkAttendanceCard (props) {
  const [isAttendanceTimeEnded, setIsAttendanceTimeEnded] = useState(false);

  useEffect(() => {
    if (props.attendance.endingTime && new Date(props.attendance.endingTime) < new Date()) {
      setIsAttendanceTimeEnded(true);
    }
  }, [])

  return (
      <div
          className="block p-4 max-w-full bg-white rounded-lg border border-gray-200 shadow-sm hover:bg-gray-100 flex justify-between item-center">
        <div>
          <h5 className="mb-2 font-medium text-gray-900 truncate">{props.attendance.title}</h5>
          <div className="flex items-center text-sm text-gray-500">
            <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            <p>
              <time dateTime={props.attendance.endingTime}>{getEndingDate(props.attendance.endingTime)}</time>
            </p>
          </div>
        </div>
        <div className={"flex items-center"}>
          <Button variant={"contained"} color={"success"} disabled={isAttendanceTimeEnded} title={isAttendanceTimeEnded ? "Time's Up :(" : "Mark attendance"}>
            <DoneIcon className={"mr-2"}/>
            <span>Mark Present</span>
          </Button>
        </div>
      </div>
  )
}
