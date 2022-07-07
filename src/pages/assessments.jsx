import { CalendarIcon } from '@heroicons/react/solid'
import {Button, IconButton} from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {getAssessments, getPublicAssessments} from "../redux/actions/assessments-actions";
import {Header} from "../components/header";
import {Link} from 'react-router-dom'
import Api from "../generic-services/api";
import QuestionsToDisplayDialog from "../components/questions-to-display-dialog";
import {addToast} from "../redux/actions/toast-actions";

export function Assessments() {
  let dispatch = useDispatch();
  let {id} = useParams();

  let public_assessments = useSelector((state => state.assessments.public_assessments));
  let assessments = useSelector((state => state.assessments.assessments));

  const [record, setRecord] = useState(10);
  const [page, setPage] = useState(1);

  let navigate = useNavigate();

  let forkPublicAssessment = (id) => {
    Api.execute('/api/assessment/' + id + "/fork", 'post').then(res => {
      dispatch(getAssessments());
      dispatch(getPublicAssessments());
    }).catch(err => {
      console.log(err);
    })
  }

  let assignAssessment = (assessments_id, q) => {
    Api.execute('/api/class/' + id +'/assessment/' + assessments_id, 'post', {
      questionsToDisplay: parseInt(q)
    }).then(res => {
      dispatch(addToast({text: "Assessment Assigned"}))
      navigate(-1);
    }).catch(err => {
      dispatch(addToast({text: "Unable to assign assessment", danger: true}))
      console.log(err);
    })
  }


  useEffect(() => {
    dispatch(getAssessments());
    dispatch(getPublicAssessments());
  }, [dispatch]);

  function getDateTime(clockDate, isPublic) {
    let date = new Date(clockDate);
    if (isPublic) return date.getDate() + "-" + parseInt(date.getMonth() + 1)+ "-" + date.getFullYear() + ' created at '+ date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    else return date.getDate() + "-" + parseInt(date.getMonth() + 1)+ "-" + date.getFullYear() + ' ending at '+ date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

  }

  return (
      <React.Fragment>
        <Header/>
        <div className="flex flex-col md:px-8 xl:px-0 px-4 md:px-0 mx-4 md:mx-16">
          <div className="flex-wrap text-gray-900 text-2xl font-medium py-4 flex justify-between item-center">
            <div>Assessments</div>
            <Link to="/assessment/create">
              <Button variant={"contained"} className="!mt-2">Create Assessment</Button>
            </Link>
          </div>
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
                    {id ?
                        <QuestionsToDisplayDialog actionDone={(q) => {assignAssessment(position.id, q)}} length={position.question?.length}>
                          <Button variant={"contained"}>Assign</Button>
                        </QuestionsToDisplayDialog>
                        :
                        <Link to={"/assessment/" + position.id}>
                          <IconButton value={position.id} className="!ml-3">
                            <ArrowForwardIosIcon className="text-gray-400 pointer-events-none" />
                          </IconButton>
                        </Link>
                    }
                  </div>
                </span>
                    </li>
                )) : <div className="text-gray-500 text-base font-medium py-4 px-4 sm:px-6">No assessments in your library</div>
                }
              </div>
              <div>
                <h1 className="text-gray-800 text-xl font-medium pt-8 pb-2 px-4 sm:px-6">Public Assessments</h1>
                {(public_assessments && public_assessments.length) ? public_assessments.map((position) => (
                    <li key={position.id}>
                <span className="block">
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
                    <Button variant={"contained"} onClick={() => {forkPublicAssessment(position.id)}}>Fork</Button>
                  </div>
                </span>
                    </li>
                )): <div className="text-gray-500 text-base font-medium py-4 px-4 sm:px-6">No public assessments found</div>
                }
              </div>
            </ul>
          </div>
        </div>
      </React.Fragment>
  )
}
