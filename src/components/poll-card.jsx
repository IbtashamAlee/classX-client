import React, {useEffect, useState} from 'react';
import {CalendarIcon} from "@heroicons/react/solid";
import {Button} from "@mui/material";
import {getEndingDate} from "../functions/date-functions";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {pollParticipation} from "../redux/actions/poll-actions";

export function PollCard(props) {
  const [isPoolEnded, setIsPoolEnded] = useState(false);

  const {id} = useParams();
  const dispatch = useDispatch();

  const submitParticipatePoll = (selectedOptionId) => {
    console.log(props.poll.id)
    dispatch(pollParticipation(props.poll.classId, props.poll.id, selectedOptionId))
  }

  useEffect(() => {
    if (props.poll.endingTime && new Date(props.poll.endingTime) < new Date()) {
      setIsPoolEnded(true);
    }
  }, [props.poll])

  return (
      <div title={isPoolEnded ? "Oops Pool Ended": "Participate"} className="block p-4 max-w-full bg-white rounded-lg border border-gray-200 shadow-sm hover:bg-gray-100 flex justify-between item-center">
        <div className={"w-full"}>
          <div className={"flex justify-between"}>
            <h5 className="mb-2 font-medium text-gray-900 truncate">{props.poll.statement}</h5>
            {isPoolEnded &&
                <h5 className={"text-sm font-medium text-gray-500"}>Ended</h5>
            }
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            <p>
              <time dateTime={props.poll.endingTime}>{getEndingDate(props.poll.endingTime)}</time>
            </p>
          </div>
          <div className={"flex flex-col w-full mt-6 space-y-2"}>
            {props.poll.pollOptions && props.poll.pollOptions.map(op => (
                <Button variant={"outlined"} key={op.id} disabled={isPoolEnded} onClick={() => {submitParticipatePoll(op.id)}}>{op.option}</Button>
            ))}
          </div>
        </div>
      </div>
  )
}
