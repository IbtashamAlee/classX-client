/* This example requires Tailwind CSS v2.0+ */
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getParticipantsInClass} from "../redux/actions/participants_actions"

export function Participants() {
  let dispatch = useDispatch();
  let participants = useSelector((state => state.participants.participants));
  let teachers, students;

  if (participants && participants.length) {
    teachers = participants[0].users;
    students = participants[1].users;
  }
  useEffect(() => {
    dispatch(getParticipantsInClass(3));
  }, [dispatch]);


  return (
      <div>
        <div className="text-gray-900 text-2xl font-medium py-4">Participants</div>
        <ul role="list" className="divide-y divide-gray-200">
          <h1 className="text-lg mb-6 font-medium">Teachers</h1>
          {teachers && teachers.map((person) => (
              <li key={person.id} className="py-4 flex">
                <img className="h-10 w-10 rounded-full" src={person.imageURL} alt="" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{person.name}</p>
                  <p className="text-sm text-gray-500">{person.userStatus}</p>
                </div>
              </li>
          ))}
          <h1 className="text-lg mb-6 pt-6 font-medium">Students</h1>
          {students && students.map((person) => (
              <li key={person.id} className="py-4 flex">
                <img className="h-10 w-10 rounded-full" src={person.imageURL} alt="" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{person.name}</p>
                  <p className="text-sm text-gray-500">{person.userStatus}</p>
                </div>
              </li>
          ))}
        </ul>
      </div>
  )
}
