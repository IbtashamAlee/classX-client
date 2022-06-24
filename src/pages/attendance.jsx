import { CalendarIcon } from '@heroicons/react/solid'
import AttendanceTable from "../components/attendance-table";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {createAttendance, getAttendance} from "../redux/actions/attendance-actions";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import {CreateAttendance} from "../components/create-attendance";
import {AssessmentCard} from "../components/assessment-card";
import {MarkAttendanceCard} from "../components/mark-attendance-card";

export default function Attendance() {
  let dispatch = useDispatch();
  let {id} = useParams();
  let positions = useSelector((state => state.attendances.attendances));
  const [record, setRecord] = useState(40);
  const [page, setPage] = useState(1);

  let currentRole = useSelector((state => state.current_class.role));

  useEffect(() => {
    dispatch(getAttendance(id,record, page));
  }, [dispatch]);

  function getDateTime(clockDate) {
    let date = new Date(clockDate);
    return date.getDate() + "-" + parseInt(date.getMonth() + 1)+ "-" + date.getFullYear() + ' ending at '+ date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();;
  }

  return (
      <React.Fragment>
        <div className="text-gray-900 text-2xl font-medium py-4 flex justify-between">
          <h1>Attendance</h1>
          {currentRole && (currentRole == "Teacher" || currentRole == "DepartmentAdmin") &&
              <CreateAttendance/>
          }
        </div>
        <div className="bg-white overflow-hidden sm:rounded-md">
          <ul className="divide-y space-y-2">
            {positions && positions.length > 0 && positions.map((position) => (
              <MarkAttendanceCard attendance={position} currentRole={currentRole}/>
            ))}
          </ul>
        </div>
      </React.Fragment>
  )
}
