import React, {useState} from 'react';
import {CalendarIcon} from "@heroicons/react/solid";
import {getEndingDate} from "../functions/date-functions";
import {Button} from "@mui/material";
import placeholder from "../Sample_User_Icon.png";
import IconButton from "@mui/material/IconButton";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import SendIcon from "@mui/icons-material/Send";

export function AssessmentCard(props) {
  let [comment, setComment] = useState('')
  let [initialComment, setInitialComments] = useState(2)


  function postComment(postId) {
    console.log('postId', postId);
    console.log('comment', comment)
  }

  return (
    <div
      className="block p-4 max-w-full bg-white rounded-lg border-2 border-gray-200 shadow-sm flex flex-col justify-between item-center">
      <div className="flex items-center mb-8">
        <img src={props.assessment.user.imageUrl ?? placeholder} className="w-11 rounded-full"/>
        <div className="ml-5">
          <p className="text-sm">{props.assessment.user.name}</p>
          <p className="text-xs text-gray-500"> {props.assessment.startingTime.split('T')[0]}</p>
        </div>
      </div>
      <div className="w-full flex flex justify-between">
        <div>
          <h5 className="mb-2 font-medium text-gray-900 truncate">{props.assessment.assessment?.name}</h5>
          <div className="flex items-center text-sm text-gray-500">
            <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true"/>
            <p>
              <time dateTime={props.assessment.startingTime}>{getEndingDate(props.assessment.startingTime)}</time>
            </p>
          </div>
        </div>
        <div className={"flex items-center"}>
          <Button variant={"contained"}>
            Attempt
          </Button>
        </div>
      </div>
      {/*comment section*/}
      <hr className="mt-2"/>
      <h5 className="mt-2 text-md text-gray-900 truncate">Comments</h5>
      {
        props.assessment.assessmentComments?.length > 0 ?
          <div>
            {props.assessment.assessmentComments.slice(0, initialComment ?? props.assessment.assessmentComments.length).map(com => {
              return (<div className="flex flex-row mt-2" key={com.id}>
                <img src={com?.user?.imageUrl ?? placeholder} className="w-8 h-8 rounded-full"/>
                <div className="ml-2 shadow rounded-2xl bg-slate-50 px-2 py-1 w-full flex flex-row justify-between">
                  <div className="flex flex-col">
                    <p className="text-xs text-gray-900 font-medium">{com.user.name}</p>
                    <p className="text-xs text-gray-600 truncate">{com.body}</p>
                  </div>
                  {/*check if comment is of current user give delete access (if com.user.id === current_user_id*/}
                  {true &&
                  <IconButton style={{padding: 0}}>
                    <RemoveCircleOutlineIcon className="text-red-500" style={{height: '1.3rem'}}/>
                  </IconButton>
                  }
                </div>
              </div>)
            })
            }
            {
              initialComment && props.assessment.assessmentComments.length > initialComment &&
              <Button style={{marginTop: '3px', textDecoration: 'underline', backgroundColor: 'transparent'}}
                      size='small' onClick={() => setInitialComments(null)}>show all comments</Button>
            }
            {
              !initialComment &&
              <Button style={{marginTop: '3px', textDecoration: 'underline', backgroundColor: 'transparent'}}
                      size='small' onClick={() => setInitialComments(2)}>show less</Button>
            }

          </div>
          :
          <div>
            <></>
          </div>
      }
      <div className="flex flex-row mt-2">
        <img src="https://picsum.photos/200" className="w-8 h-8 rounded-full"/>
        <div className="ml-2 shadow rounded-2xl bg-slate-50 px-2 w-full flex flex-row justify-between">
          <input type='text' placeholder="write your comment here" value={comment}
                 onChange={(e) => setComment(e.target.value)} className="text-sm h-10 w-full border-0 bg-transparent"/>
          <IconButton style={{padding: 0}} onClick={() => postComment(props.assessment.id)}
                      disabled={comment.length < 1}>
            <SendIcon style={{width: '1.3rem'}} className="rotate-[-45deg]"/>
          </IconButton>
        </div>
      </div>
    </div>
  )
}
