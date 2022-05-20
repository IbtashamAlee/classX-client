import React, {useEffect, useState} from "react";
import {MarkAttendanceCard} from "../components/mark-attendance-card";
import Api from '../generic-services/api'
import {useParams} from "react-router-dom";

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
      <div>
        {feed && feed.map(f => (
            <div>
              {f.type.toLowerCase() === "attendance" &&
                  <MarkAttendanceCard attendance={f}/>
              }
            </div>
        ))}
      </div>
  )
}
