import React, {useEffect, useState} from "react";
import {CalendarIcon} from "@heroicons/react/solid";
import {Button} from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import {getEndingDate} from "../functions/date-functions";
import {useDispatch, useSelector} from "react-redux";
import {participateInAttendance} from "../redux/actions/attendance-actions";
import {Link, useLocation, useParams} from "react-router-dom";
import placeholder from "../Sample_User_Icon.png";

export function MarkAttendanceCard (props) {
  const [isAttendanceTimeEnded, setIsAttendanceTimeEnded] = useState(false);
  const [isPresent, setIsPresent] = useState(false);

  let user = useSelector((state => state.user.user))

  const dispatch = useDispatch();
  const {id} = useParams();
  useEffect(() => {
    if (props.attendance.endingTime && new Date(props.attendance.endingTime) < new Date()) {
      setIsAttendanceTimeEnded(true);
    }
    let record = props.attendance.attendanceRecord.filter(x => x.userId == user.id)
    if(record[0]?.isPresent === true) {
      setIsPresent(true);
    }
  }, [dispatch, props.attendance]);
  const percentage = (Math.ceil((props.attendance.present/props.attendance.total)*100));
  return (
      <div
          className="block p-4 max-w-full bg-white rounded-lg border-2 border-gray-200 flex justify-between item-center flex-col">
       <div className="flex justify-between items-center">
        <div className="flex items-center mb-2">
          <img src={props.attendance.imageUrl ?? placeholder } className="w-11 rounded-full"/>
          <div className="ml-5">
            <p className="text-sm">{props.attendance.user.name}</p>
            <p className="text-xs text-gray-500"> {props.attendance.startingTime.split('T')[0]}</p>
          </div>
        </div>
        {/*//progress bar */}
         {(props?.currentRole === "Teacher" || props?.currentRole === "DepartmentAdmin") &&
           <div className="bg-rose-300 h-5 w-[15%] rounded-md flex justify-start items-center">
             {percentage>0 &&
               <div style={{width:`${percentage}%`,padding:'13px'}}
             className={"text-xs text-slate-700 h-full rounded-l-md bg-green-300 flex justify-center items-center"}>
                 <p>{percentage}%</p>
           </div>}
             {
               percentage<1 &&
                 <div className="w-full text-xs text-slate-700 flex flex-col justify-center items-center">
                   <p>{parseInt(percentage)}%</p>
                 </div>

             }
         </div>}

       </div>
        <div className="flex w-full justify-between items-center">
        <div>
          <h5 className="mb-2 font-medium text-gray-900 truncate">{props.attendance.title}</h5>
          <div className="flex items-center text-sm text-gray-500">
            <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            <p>
              <time dateTime={props.attendance.endingTime}>{getEndingDate(props.attendance.endingTime)}</time>
            </p>
          </div>
        </div>
        <div className={"flex items-center"}>
          {props?.currentRole === "Teacher" || props?.currentRole === "DepartmentAdmin" ?
              <Link to={`/class-details/${id}/attendance/${props.attendance.id}`}>
                <Button variant={"contained"} size='small'>Details</Button>
              </Link>
              :
              <>
                {isPresent ?
                    <Button variant={"contained"} disabled={isPresent}>Marked Present</Button>:
                    <Button variant={"contained"} color={"success"} onClick={() => {dispatch(participateInAttendance(id, props.attendance.id))}} disabled={isAttendanceTimeEnded} title={isAttendanceTimeEnded ? "Time's Up :(" : "Mark attendance"}>
                      <DoneIcon className={"mr-2"}/>
                      <span>Mark Present</span>
                    </Button>
                }
              </>
          }
        </div>
        </div>
      </div>
  )
}
