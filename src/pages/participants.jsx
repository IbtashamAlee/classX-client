/* This example requires Tailwind CSS v2.0+ */
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getParticipantsInClass, removeParticipantsInClass} from "../redux/actions/participants_actions"
import AddParticipantsDialog from "../components/add-participants-dialog";
import {useParams} from "react-router-dom";
import {Button} from "@mui/material";

export function Participants() {
  let dispatch = useDispatch();
  let {id} = useParams();
  let participants = useSelector((state => state.participants.participants));
  let teachers, students, department_admin;

  if (participants && participants.length) {
    for (let i = 0; i < participants.length; i++) {
      let name = participants[i].name.split('_')[0];
      console.log(name);
      if (name === "DepartmentAdmin") {
        department_admin = participants[i]?.users;
        console.log(department_admin)
      } else if (name === "Teacher") {
        teachers = participants[i]?.users;
      } else if (name === "Student") {
        students = participants[i]?.users;
      }
    }
  }

  function removeParticipant(email, role) {
    let users = [];
    users.push({email: email, role: role});
    dispatch(removeParticipantsInClass(id, users));
  }

  useEffect(() => {
    dispatch(getParticipantsInClass(id));
  }, [dispatch]);


  return (
      <div>
        <div className="flex justify-between py-4">
          <div className="text-gray-900 text-2xl font-medium">Participants</div>
          <AddParticipantsDialog/>
        </div>
        {department_admin && department_admin ?
            <ul className="divide-y divide-gray-200">
              <h1 className="text-lg mb-6 font-medium">Department Admin</h1>
              {department_admin && department_admin.map((person) => (
                  <li key={person.id} className="py-4 flex">
                    <img className="h-10 w-10 rounded-full" src={person.imageURL ? person.imageURL : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"} alt="img" />
                    <div className="flex justify-between items-center w-full">
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{person.name}</p>
                        <p className="text-sm text-gray-500">{person.userStatus ? person.userStatus: "Hi there, I'm using classX"}</p>
                      </div>
                      {/*<Button variant="outlined" color="error" onClick={() => {removeParticipant(person.email, "Teacher")}}>Remove</Button>*/}
                    </div>
                  </li>
              ))}
            </ul> : <div></div>
        }
        <ul className="divide-y divide-gray-200">
          <h1 className="text-lg mb-6 pt-6 font-medium">Teachers</h1>
          {teachers && teachers.map((person) => (
              <li key={person.id} className="py-4 flex">
                <img className="h-10 w-10 rounded-full" src={person.imageURL ? person.imageURL : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"} alt="img" />
                <div className="flex justify-between items-center w-full">
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{person.name}</p>
                    <p className="text-sm text-gray-500">{person.userStatus ? person.userStatus: "Hi there, I'm using classX"}</p>
                  </div>
                  <Button variant="outlined" color="error" onClick={() => {removeParticipant(person.email, "Teacher")}}>Remove</Button>
                </div>
              </li>
          ))}
        </ul>
        <ul className="divide-y divide-gray-200">
          <h1 className="text-lg mb-6 pt-6 font-medium">Students</h1>
          {students && students.map((person) => (
              <li key={person.id} className="py-4 flex">
                <img className="h-10 w-10 rounded-full" src={person.imageURL ? person.imageURL : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"} alt="" />
                <div className="flex justify-between items-center w-full">
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{person.name}</p>
                    <p className="text-sm text-gray-500">{person.userStatus ? person.userStatus: "Hi there, I'm using classX"}</p>
                  </div>
                  <Button variant="outlined" color="error" onClick={() => {removeParticipant(person.email, "Student")}}>Remove</Button>
                </div>
              </li>
          ))}
        </ul>
      </div>
  )
}
