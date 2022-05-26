import React, {useEffect, useState} from 'react';
import {CalendarIcon} from "@heroicons/react/solid";
import {Button} from "@mui/material";
import {getEndingDate} from "../functions/date-functions";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {pollParticipation} from "../redux/actions/poll-actions";
import placeholder from "../Sample_User_Icon.png";

export function PollCard(props) {
  const [isPoolEnded, setIsPoolEnded] = useState(false);
  const [title, setTitle] = useState("Participate");

  const {id} = useParams();
  const dispatch = useDispatch();

  const submitParticipatePoll = (selectedOptionId) => {
    console.log(props.poll.id)
    dispatch(pollParticipation(props.poll.classId, props.poll.id, selectedOptionId))
  }

  useEffect(() => {
    if (props.poll.endingTime && new Date(props.poll.endingTime) < new Date()) {
      setIsPoolEnded(true);
      setTitle("Oops poll ended :)")
    }
    if (props.poll.hasParticipated) {
      setTitle("Participated")
    }
  }, [props.poll])

  return (
      <div title={title} className="block p-4 max-w-full bg-white rounded-lg border border-gray-200 shadow-sm flex justify-between item-center flex-col">
        <div className="flex items-center mb-8">
          <img src={props.poll.user.imageUrl ?? placeholder } className="w-11 h-11 rounded-full"/>
          <div className="ml-5">
            <p className="text-sm">{props.poll.user.name}</p>
            <p className="text-xs text-gray-500"> {props.poll.startingTime.split('T')[0]}</p>
          </div>
        </div>
        <div className={"w-full"}>
          <div className={"flex justify-between"}>
            <h5 className="mb-2 font-medium text-gray-900 truncate">{props.poll.statement}</h5>
            {isPoolEnded && !props.poll.hasParticipated &&
                <h5 className={"text-sm font-medium text-gray-500 my-auto text-center"}>Ended</h5>
            }
            {props.poll.hasParticipated &&
                <h5 className={"text-sm font-medium text-gray-500 my-auto text-center"}>Participated</h5>
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
                <div key={op.id} className={"flex"}>
                  <Button className={"flex-1 !mr-4"} variant={"outlined"} disabled={isPoolEnded || props.poll.hasParticipated} onClick={() => {submitParticipatePoll(op.id)}}>{op.option}</Button>
                  {props.poll.hasParticipated &&
                      <h5 className={"text-sm font-medium text-gray-500 my-auto text-center"}>{op.votes + " votes casted"}</h5>
                  }
                </div>
            ))}
          </div>
        </div>
      </div>
  )
}
