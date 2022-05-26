import Api from "../generic-services/api";
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {PollCard} from "../components/poll-card";

export function PollsPage(props) {
  const [polls, setPolls] = useState([]);

  let {id} = useParams();

  function getPolls() {
    Api.execute(`/class/${id}/poll?records=100&page=1`).then(res => {
      setPolls(res.data);
    }).catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    getPolls();
  }, [])

  return (
      <div className={"lg:max-w-screen-lg mx-4 md:mx-auto mt-8 pb-8"}>
        <div className="text-gray-900 text-2xl font-medium flex justify-between mb-4">
          <h1>Polls</h1>
        </div>
        <div className={"flex flex-col space-y-4"}>
          {polls && polls.map(p => (
              <PollCard poll={p}/>
          ))}
        </div>
      </div>
  )
}
