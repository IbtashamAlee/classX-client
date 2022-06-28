import AttendanceTable from "../components/attendance-table";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {getAttendance} from "../redux/actions/attendance-actions";
import {useParams} from "react-router-dom";

export function AttendanceDetails(props) {

  let attendances = useSelector((state => state.attendances.attendances));
  let dispatch = useDispatch();
  let {id, attendance_id} = useParams();
  let attendance;

  if(attendances && attendances.length) {
    attendance = attendances.filter((att) => {return att.id == attendance_id});
    console.log(attendance)
    if (attendance.length) {
      attendance = attendance[0];
    }
    console.log(attendance)
  }

  useEffect(() => {
    dispatch(getAttendance(id, 40, 1));
  }, [])

  return (
      <div>
        <div className="text-gray-900 text-2xl font-medium py-4 flex justify-between flex-col">
          <h1>Attendance</h1>
          {attendance &&
          <div className="text-sm mt-2 text-slate-60 flex flex-row justify-start items-center flex-wrap">
            <h1 className="bg-green-200 text-green-600 px-2 w-fit rounded-xl min-w-[20%] text-center">Presents
              : {attendance.present}</h1>
            <h1 className="bg-red-200 text-red-600 px-2 w-fit rounded-xl min-w-[20%] text-center ml-2 ">Absents
              : {attendance.total - attendance.present}</h1>
          </div>
          }
        </div>
        <AttendanceTable  records={attendance?.attendanceRecord}/>
      </div>
  )
}