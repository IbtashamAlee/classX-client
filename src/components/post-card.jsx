import {CalendarIcon} from "@heroicons/react/solid";
import {getEndingDate} from "../functions/date-functions";
import React,{useState} from "react";
import Api from "../generic-services/api";
import DownloadIcon from '@mui/icons-material/Download';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import AttachmentIcon from '@mui/icons-material/Attachment';
import placeholder from '../Sample_User_Icon.png';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import SendIcon from '@mui/icons-material/Send';

export function PostCard (props) {
  let [comment,setComment] = useState('')
  let [initialComment,setInitialComments] = useState(2)

  function getDownloadLink(key) {
    Api.execute(`/file/download-link/${key}`, 'get').then(res => {
      console.log(res);
    })
  }
  function postComment(postId){
    console.log('postId',postId);
    console.log('comment',comment)
  }
  return (
      <div className="flex flex-col p-4 max-w-full bg-white rounded-lg border border-gray-200 shadow-sm flex justify-between item-center overflow-auto">
        <div className="flex items-center mb-8">
          <img src={props.post.user.imageUrl ?? placeholder } className="w-10 h-10 rounded-full"/>
          <div className="ml-5">
          <p className="text-sm">{props.post.user.name}</p>
            <p className="text-xs text-gray-500"> {props.post.startingTime.split('T')[0]}</p>
          </div>
        </div>
        <div>
          <h5 className="mb-2 font-sm text-gray-900 truncate">{props.post.body}</h5>
        </div>
        <div>

          {props.post.postAttachments?.length>0  &&
              <div>
                <div className={"text-gray-500 text-sm space-y-2"}>
                  <hr className="mt-2"/>
                  {props.post.postAttachments?.map(p => (
                    <div className="flex w-full mt-5">
                      <div className="flex flex-col justify-center mr-2">
                    <AttachmentIcon className="rotate-45 text-gray-300"/>
                      </div>
                        <div className="w-full pl-1 border border-indigo-50 rounded flex justify-between">
                        <div key={p.file.id} className="flex flex-col justify-center">
                        <p>{p.file.originalName}</p>
                        </div>
                        <a href={p.file.publicUrl} target="_blank" className={"text-indigo-500"} download>
                          <IconButton size="small"><DownloadIcon/></IconButton>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
          }
          {/*comment section*/}
          {
            props.post.postComments?.length > 0 ?
            <div>
              <h5 className="mt-2 text-md text-gray-900 truncate">Comments</h5>
              {props.post.postComments.slice(0,initialComment??props.post.postComments.length).map(com => {
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
                initialComment && props.post.postComments.length > initialComment &&
                  <Button style={{marginTop:'3px',textDecoration:'underline',backgroundColor:'transparent'}} size='small' onClick={()=>setInitialComments(null)}>show all comments</Button>
              }
              {
                !initialComment &&
                <Button style={{marginTop:'3px',textDecoration:'underline',backgroundColor:'transparent'}} size='small' onClick={()=>setInitialComments(2)}>show less</Button>
              }
              <div className="flex flex-row mt-2">
                <img src="https://picsum.photos/200" className="w-8 h-8 rounded-full"/>
                <div className="ml-2 shadow rounded-2xl bg-slate-50 px-2 w-full flex flex-row justify-between">
                   <input type='text' placeholder="write your comment here" value={comment} onChange={(e)=>setComment(e.target.value)} className="text-sm h-10 w-full border-0 bg-transparent"/>
                   <IconButton style={{padding:0}} onClick={()=>postComment(props.post.id)} disabled={comment.length<1}>
                     <SendIcon style={{width:'1.3rem'}} className="rotate-[-45deg]"/>
                   </IconButton>
                </div>
              </div>
            </div>
              :
              <div>
               <></>
              </div>
          }
        </div>
      </div>
  )
}
