import { CalendarIcon } from '@heroicons/react/solid'
import { IconButton} from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {getAttendance} from "../redux/actions/attendance-actions";
import {getAssessments, getPublicAssessments} from "../redux/actions/assessments-actions";

export function Assessments() {
  let dispatch = useDispatch();
  let {id} = useParams();
  let public_assessments = useSelector((state => state.assessments.public_assessments));
  let assessments = useSelector((state => state.assessments.assessments));
  const [record, setRecord] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getAttendance(id,record, page));
    dispatch(getAssessments());
    dispatch(getPublicAssessments());
  }, [dispatch]);

  function getDateTime(clockDate, isPublic) {
    let date = new Date(clockDate);
    if (isPublic) return date.getDate() + "-" + parseInt(date.getMonth() + 1)+ "-" + date.getFullYear() + ' created at '+ date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    else return date.getDate() + "-" + parseInt(date.getMonth() + 1)+ "-" + date.getFullYear() + ' ending at '+ date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

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
        <div className="text-gray-900 text-2xl font-medium py-4">Assessments</div>
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            <div>
              <h1 className="text-gray-800 text-xl font-medium pt-8 pb-2 px-4 sm:px-6">Your Assessments</h1>
              {(assessments && assessments.length) ? assessments.map((position) => (
                  <li key={position.id}>
                <span className="block hover:bg-gray-50">
                  <div className="px-4 py-4 flex items-center sm:px-6">
                    <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                      <div className="truncate">
                        <div className="flex text-sm">
                          <p className="font-medium text-gray-900 truncate">{position.name}</p>
                        </div>
                        <div className="mt-2 flex">
                          <div className="flex items-center text-sm text-gray-500">
                            <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                            <p>
                              <time dateTime={position.createdAt}>{getDateTime(position.createdAt, true)}</time>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <IconButton value={position.id} onClick={(e) => {handleClick(e)}} className="!ml-3">
                      <ArrowForwardIosIcon className="text-gray-400 pointer-events-none" />
                    </IconButton>
                  </div>
                </span>
                  </li>
              )) : <div className="text-gray-500 text-base font-medium py-4 px-4 sm:px-6">No assessments in this class</div>
              }
            </div>
            <div>
              <h1 className="text-gray-800 text-xl font-medium pt-8 pb-2 px-4 sm:px-6">Public Assessments</h1>
              {(public_assessments && public_assessments.length) ? public_assessments.map((position) => (
                  <li key={position.id}>
                <span className="block hover:bg-gray-50">
                  <div className="px-4 py-4 flex items-center sm:px-6">
                    <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                      <div className="truncate">
                        <div className="flex text-sm">
                          <p className="font-medium text-gray-900 truncate">{position.name}</p>
                        </div>
                        <div className="mt-2 flex">
                          <div className="flex items-center text-sm text-gray-500">
                            <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                            <p>
                              <time dateTime={position.createdAt}>{getDateTime(position.createdAt, true)}</time>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <IconButton value={position.id} onClick={(e) => {handleClick(e)}} className="!ml-3">
                      <ArrowForwardIosIcon className="text-gray-400 pointer-events-none" />
                    </IconButton>
                  </div>
                </span>
                  </li>
              )): <div className="text-gray-500 text-base font-medium py-4 px-4 sm:px-6">No public assessments found</div>
              }
            </div>
          </ul>
        </div>
      </React.Fragment>
  )
}
