import React, {useEffect, useState} from "react";
import {MarkAttendanceCard} from "../components/mark-attendance-card";
import Api from '../generic-services/api'
import {useParams} from "react-router-dom";
import {PollCard} from "../components/poll-card";

export function Feed () {
  const [feed, setFeed] = useState([]);
  const [record, setRecord] = useState(10);
  const [page, setPage] = useState(1);

  let {id} = useParams();

  const getFeed = () => {
    Api.execute('/class/'+ id + '/feed?record=' + record + '&page=' + page, 'get').then((res) => {
      setFeed(res.data);
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    getFeed();
  }, [])

  return (
      <div className="mx-auto lg:max-w-screen-lg">
        <div className={"space-y-2"}>
          {feed && feed.map(f => (
              <div key={f.type + f.id}>
                {f.type.toLowerCase() === "attendance" &&
                    <MarkAttendanceCard attendance={f}/>
                }
                {f.type.toLowerCase() === "poll" &&
                    <PollCard poll={f}/>
                }
              </div>
          ))}
        </div>
      </div>
  )
}
