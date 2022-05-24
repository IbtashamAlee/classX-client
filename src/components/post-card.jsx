import {CalendarIcon} from "@heroicons/react/solid";
import {getEndingDate} from "../functions/date-functions";
import React from "react";
import Api from "../generic-services/api";
import DownloadIcon from '@mui/icons-material/Download';
import IconButton from '@mui/material/IconButton';
import AttachmentIcon from '@mui/icons-material/Attachment';
import placeholder from '../Sample_User_Icon.png';

export function PostCard (props) {

  function getDownloadLink(key) {
    Api.execute(`/file/download-link/${key}`, 'get').then(res => {
      console.log(res);
    })
  }

  return (
      <div className="flex flex-col p-4 max-w-full bg-white rounded-lg border border-gray-200 shadow-sm flex justify-between item-center">
        <div className="flex items-center mb-8">
          <img src={props.post.user.imageUrl ?? placeholder } className="w-11 rounded-full"/>
          <div className="ml-5">
          <p className="text-sm">{props.post.user.name}</p>
            <p className="text-xs text-gray-500"> {props.post.startingTime.split('T')[0]}</p>
          </div>
        </div>
        <div>
          <h5 className="mb-2 font-medium text-gray-900 truncate">{props.post.body}</h5>
        </div>
        <div>
          {props.post.postAttachments?.length ?
              <div>
                {/*<h5 className={"mt-4 mb-2 text-gray-900 text-md font-medium"}>Attachments</h5>*/}
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
                  {/*{files && files.map(f => (*/}
                  {/*    <div key={f}>{f}</div>*/}
                  {/*))}*/}
                </div>
              </div> : <></>
          }
        </div>
      </div>
  )
}
