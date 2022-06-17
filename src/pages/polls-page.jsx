import Api from "../generic-services/api";
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {PollCard} from "../components/poll-card";
import {CreatePoll} from "../components/create-poll";
import {useSelector} from "react-redux";

export function PollsPage(props) {
  const [polls, setPolls] = useState([]);

  let currentRole = useSelector((state => state.current_class.role));

  let {id} = useParams();

  function getPolls() {
    Api.execute(`/api/class/${id}/poll?records=100&page=1`).then(res => {
      setPolls(res.data?.reverse());
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
          {currentRole && (currentRole == "Teacher" || currentRole == "DepartmentAdmin") &&
              <div className={"flex justify-end mb-4"}>
                <CreatePoll getPolls={getPolls}/>
              </div>
          }
        </div>
        <div className={"flex flex-col space-y-4"}>
          {polls && polls.map(p => (
              <PollCard poll={p} key={p.id}/>
          ))}
        </div>
      </div>
  )
}
