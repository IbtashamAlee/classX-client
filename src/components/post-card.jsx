import {CalendarIcon} from "@heroicons/react/solid";
import {getEndingDate} from "../functions/date-functions";
import React from "react";
import Api from "../generic-services/api";

export function PostCard (props) {

  function getDownloadLink(key) {
    Api.execute(`/file/download-link/${key}`, 'get').then(res => {
      console.log(res);
    })
  }

  return (
      <div className="flex flex-col p-4 max-w-full bg-white rounded-lg border border-gray-200 shadow-sm hover:bg-gray-100 flex justify-between item-center">
        <div>
          <h5 className="mb-2 font-medium text-gray-900 truncate">{props.post.body}</h5>
          <div className="flex items-center text-sm text-gray-500">
            <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            <p>
              <time dateTime={props.post.startingTime}>{getEndingDate(props.post.startingTime)}</time>
            </p>
          </div>
        </div>
        <div>
          {props.post.postAttachments?.length ?
              <div>
                <h5 className={"mt-4 mb-2 text-gray-900 text-md font-medium"}>Attachments</h5>
                <div className={"text-gray-500 text-sm space-y-2"}>
                  {props.post.postAttachments?.map(p => (
                      <div className="p-2 border border-indigo-500 rounded flex justify-between">
                        <div key={p.file.id}>{p.file.originalName}</div>
                        <a href={p.file.publicUrl} target="_blank" className={"text-indigo-500"} download>Download</a>
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
