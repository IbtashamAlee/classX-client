import React from 'react';
import {CalendarIcon} from "@heroicons/react/solid";
import {Button} from "@mui/material";

export function PollCard(props) {
  function getDateTime(clockDate) {
    let date = new Date(clockDate);
    return date.getDate() + "-" + parseInt(date.getMonth() + 1)+ "-" + date.getFullYear() + ' ending at '+ date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  }

  return (
      <div className="block p-4 max-w-full bg-white rounded-lg border border-gray-200 shadow-sm hover:bg-gray-100 flex justify-between item-center">
        <div className={"w-full"}>
          <h5 className="mb-2 font-medium text-gray-900 truncate">{props.poll.statement}</h5>
          <div className="flex items-center text-sm text-gray-500">
            <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            <p>
              <time dateTime={props.poll.endingTime}>{getDateTime(props.poll.endingTime)}</time>
            </p>
          </div>
          <div className={"flex flex-col w-full mt-6 space-y-2"}>
            {props.poll.pollOptions && props.poll.pollOptions.map(op => (
                <Button variant={"outlined"} key={op.id}>{op.option}</Button>
            ))}
          </div>
        </div>
      </div>
  )
}
