import React, {useEffect, useState} from 'react';
import {CalendarIcon} from "@heroicons/react/solid";
import {Button} from "@mui/material";
import {getEndingDate} from "../functions/date-functions";
import {useDispatch, useSelector} from "react-redux";
import {pollParticipation} from "../redux/actions/poll-actions";
import placeholder from "../Sample_User_Icon.png";
import IconButton from "@mui/material/IconButton";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import SendIcon from "@mui/icons-material/Send";
import Api from "../generic-services/api";

export function PollCard(props) {
  let user = useSelector((state => state.user.user))
  const [Comments,setComments] = useState(props.poll.pollComments)
  const [isPoolEnded, setIsPoolEnded] = useState(false);
  const [title, setTitle] = useState("Participate");
  let [comment,setComment] = useState('')
  let [initialComment,setInitialComments] = useState(2)


  // const {id} = useParams();
  const dispatch = useDispatch();

  const handleKeypress = e => {
    if (e.charCode === 13) {
      postComment();
    }
  };

  function postComment(){
    const postId = props.poll.id
    console.log('postId',postId);
    console.log('comment',comment)
    Api.execute(`/api/class/poll/${postId}/comment`, 'post', {
      comment
    }).then(res => {
      console.log(res.data.pollComment);
      setComments([res.data.pollComment,...Comments])
      setComment('')
    }).catch(err => {
      console.log(err);
    })
  }

  function deleteComment(commentId){
    Api.execute(`/api/class/poll/comment/${commentId}`, 'put')
      .then(res => {
      console.log('deleted');
      const temp = Comments.filter(c=> c.id !== commentId);
      setComments(temp)
    }).catch(err => {
      console.log(err);
    })
  }

  const submitParticipatePoll = (selectedOptionId) => {
    console.log(props.poll.id)
    dispatch(pollParticipation(props.poll.classId, props.poll.id, selectedOptionId))
  }

  useEffect(() => {
    if (props.poll.endingTime && new Date(props.poll.endingTime) < new Date()) {
      setIsPoolEnded(true);
      setTitle("Oops poll ended :)")
    }
    if (props.poll.hasParticipated) {
      setTitle("Participated")
    }
  }, [props.poll])

  return (
      <div title={title} className="block p-4 max-w-full bg-white rounded-lg border-2 border-gray-200 shadow-sm flex justify-between item-center flex-col">
        <div className="flex items-center mb-8">
          <img src={props.poll.user.imageUrl ?? placeholder } alt="profile" className="w-11 h-11 rounded-full"/>
          <div className="ml-5">
            <p className="text-sm">{props.poll.user.name}</p>
            <p className="text-xs text-gray-500"> {props.poll.startingTime.split('T')[0]}</p>
          </div>
        </div>
        <div className={"w-full"}>
          <div className={"flex justify-between"}>
            <h5 className="mb-2 font-medium text-gray-900 truncate w-5/">{props.poll.statement}</h5>
            {isPoolEnded && !props.poll.hasParticipated &&
                <h5 className={"text-sm font-medium text-gray-500 my-auto text-center"}>Ended</h5>
            }
            {props.poll.hasParticipated &&
                <h5 className={"text-sm font-medium text-gray-500 my-auto text-center"}>Participated</h5>
            }
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            <p>
              <time dateTime={props.poll.endingTime}>{getEndingDate(props.poll.endingTime)}</time>
            </p>
          </div>
          <div className={"flex flex-col w-full mt-6 space-y-2"}>
            {props.poll.pollOptions && props.poll.pollOptions.map(op => (
                <div key={op.id} className={"flex"}>
                  <Button className={"flex-1 !mr-4"} variant={"outlined"} disabled={isPoolEnded || props.poll.hasParticipated} onClick={() => {submitParticipatePoll(op.id)}}>{op.option}</Button>
                  {props.poll.hasParticipated &&
                      <h5 className={"text-sm font-medium text-gray-500 my-auto text-center"}>{op.votes + `${op.votes>1?" votes":" vote"}`}</h5>
                  }
                </div>
            ))}
          </div>
          {/*comment section*/}
          <hr className="mt-2"/>
          <h5 className="mt-2 mb-2 text-md text-gray-900">Comments</h5>
          {
            Comments?.length > 0 ?
              <div>
                {Comments.slice(0,initialComment??Comments.length).map(com => {
                  return (<div className="flex flex-row mt-2" key={com.id}>
                    <img src={com?.user?.imageUrl ?? placeholder} alt="profile" className="w-8 h-8 rounded-full"/>
                    <div className="ml-2 shadow rounded-2xl bg-slate-50 px-2 py-1 w-full flex flex-row justify-between">
                      <div className="flex flex-col">
                        <p className="text-xs text-gray-900 font-medium">{com.user.name}</p>
                        <p className="text-xs text-gray-600 truncate">{com.body}</p>
                      </div>
                      {/*check if comment is of current user give delete access (if com.user.id === current_user_id*/}
                      {user.id === com.user.id &&
                      <IconButton style={{padding: 0}} onClick={()=>deleteComment(com.id)}>
                        <RemoveCircleOutlineIcon className="text-red-500" style={{height: '1.3rem'}}/>
                      </IconButton>
                      }
                    </div>
                  </div>)
                })
                }
                {
                  initialComment && Comments.length > initialComment &&
                  <Button style={{marginTop:'3px',textDecoration:'underline',backgroundColor:'transparent'}} size='small' onClick={()=>setInitialComments(null)}>show all comments</Button>
                }
                {
                  !initialComment &&
                  <Button style={{marginTop:'3px',textDecoration:'underline',backgroundColor:'transparent'}} size='small' onClick={()=>setInitialComments(2)}>show less</Button>
                }
              </div>
              :
              <div>
                <></>
              </div>
          }
          <div className="flex flex-row mt-2">
            <img src="https://picsum.photos/200" alt="profile" className="w-8 h-8 rounded-full"/>
            <div className="ml-2 shadow rounded-2xl bg-slate-50 px-2 w-full flex flex-row justify-between">
              <input type='text' onKeyPress={handleKeypress} placeholder="write your comment here" value={comment} onChange={(e)=>setComment(e.target.value)} className="text-sm h-10 w-full border-0 bg-transparent"/>
              <IconButton style={{padding:0}} onClick={()=>postComment(props.poll.id)} disabled={comment.length<1}>
                <SendIcon style={{width:'1.3rem'}} className="rotate-[-45deg]"/>
              </IconButton>
            </div>
          </div>
        </div>
      </div>
  )
}
