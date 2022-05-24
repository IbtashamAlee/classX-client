import React, {useEffect, useState} from "react";
import {MarkAttendanceCard} from "../components/mark-attendance-card";
import Api from '../generic-services/api'
import {useParams} from "react-router-dom";
import {PollCard} from "../components/poll-card";
import {AssessmentCard} from "../components/assessment-card";
import {Button, TextField} from "@mui/material";
import ClassPost from "../components/class-post";
import {useDispatch, useSelector} from "react-redux";
import {getFeed} from "../redux/actions/feed-actions";

export function Feed () {
  const [record, setRecord] = useState(10);
  const [page, setPage] = useState(1);

  let feed = useSelector(state => state.feed.feed)

  let {id} = useParams();
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeed(id, record, page))
  }, [])

  return (
      <div className="lg:max-w-screen-lg mx-4 md:mx-auto mt-8">
        <div>
          <ClassPost/>
        </div>
        <div className="text-gray-900 lg:text-2xl text-xl font-medium py-4">
          <hr/>
        </div>
        <div className={"space-y-2"}>
          {feed && feed.map(f => (
              <div key={f.type + f.id}>
                {f.type.toLowerCase() === "attendance" &&
                    <MarkAttendanceCard attendance={f}/>
                }
                {f.type.toLowerCase() === "poll" &&
                    <PollCard poll={f}/>
                }
                {f.type.toLowerCase() === "assessment" &&
                    <AssessmentCard assessment={f}/>
                }
              </div>
          ))}
        </div>
      </div>
  )
}
