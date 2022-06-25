import React, {useEffect, useState} from "react";
import {MarkAttendanceCard} from "../components/mark-attendance-card";
import {useLocation, useParams} from "react-router-dom";
import {PollCard} from "../components/poll-card";
import {AssessmentCard} from "../components/assessment-card";
import ClassPost from "../components/class-post";
import {useDispatch, useSelector} from "react-redux";
import {getFeed} from "../redux/actions/feed-actions";
import {CreatePoll} from "../components/create-poll";
import {PostCard} from "../components/post-card";
import {CreateAttendance} from "../components/create-attendance";

export function Feed () {
  const [record, setRecord] = useState(10);
  const [page, setPage] = useState(1);

  let feed = useSelector(state => state.feed.feed)
  let currentRole = useSelector(state => state.current_class.role)

  let {id} = useParams();
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeed(id, record, page));
  }, [])

  return (
      <div className="lg:max-w-screen-lg mx-4 md:mx-auto mt-8 pb-8">
        <div>
          <ClassPost/>
        </div>
        <div className="text-gray-900 lg:text-2xl text-xl font-medium py-4">
          <hr/>
        </div>
        {currentRole && currentRole !== "Teacher" || currentRole !== "DepartmentAdmin" &&
            <div className={"flex justify-end mb-4 space-x-2"}>
              <CreatePoll/>
              <CreateAttendance/>
            </div>
        }
        <div className={"space-y-6"}>
          {feed && feed.map(f => (
              <div key={f.type + f.id}>
                {f.type.toLowerCase() === "attendance" &&
                    <MarkAttendanceCard attendance={f} currentRole={currentRole}/>
                }
                {f.type.toLowerCase() === "poll" &&
                    <PollCard poll={f} currentRole={currentRole}/>
                }
                {f.type.toLowerCase() === "assessment" &&
                    <AssessmentCard assessment={f} currentRole={currentRole}/>
                }
                {f.type.toLowerCase() === "post" &&
                    <PostCard post={f} currentRole={currentRole}/>
                }
              </div>
          ))}
        </div>
      </div>
  )
}
