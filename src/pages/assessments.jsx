import { CalendarIcon } from '@heroicons/react/solid'
import AttendanceTable from "../components/attendance-table";
import { IconButton} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {getAttendance} from "../redux/actions/attendance-actions";

export function Assessments() {
  let dispatch = useDispatch();
  let {id} = useParams();
  let positions = useSelector((state => state.attendances.attendances));
  const [record, setRecord] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getAttendance(id,record, page));
  }, [dispatch]);

  function getDateTime(clockDate) {
    let date = new Date(clockDate);
    return date.getDate() + "-" + parseInt(date.getMonth() + 1)+ "-" + date.getFullYear() + ' ending at '+ date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();;
  }

  function handleClick(e) {
    let value = e.target.value;
    console.log(value)
    if (document.getElementById(value).classList.contains('hidden')) {
      document.getElementById(value).classList.remove('hidden')
    } else {
      document.getElementById(value).classList.add('hidden');
    }
  }

  return (
      <React.Fragment>
        <div className="text-gray-900 text-2xl font-medium py-4">Attendance</div>
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {positions && positions.length && positions.map((position) => (
                <li key={position.id}>
                <span className="block hover:bg-gray-50">
                  <div className="px-4 py-4 flex items-center sm:px-6">
                    <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                      <div className="truncate">
                        <div className="flex text-sm">
                          <p className="font-medium text-gray-900 truncate">{position.title}</p>
                        </div>
                        <div className="mt-2 flex">
                          <div className="flex items-center text-sm text-gray-500">
                            <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                            <p>
                              <time dateTime={position.endingTime}>{getDateTime(position.endingTime)}</time>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <IconButton value={position.id} onClick={(e) => {handleClick(e)}} className="!ml-3">
                      <KeyboardArrowDownIcon className="text-gray-400 pointer-events-none" />
                    </IconButton>
                    <div className="ml-5 flex-shrink-0 p-2 cursor-pointer">
                    </div>
                  </div>
                  <div id={position.id} className="hidden">
                    <AttendanceTable records={position.attendanceRecord}/>
                  </div>
                </span>
                </li>
            ))}
          </ul>
        </div>
      </React.Fragment>
  )
}
