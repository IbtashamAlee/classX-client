import React, {useState} from "react";
import UploadIcon from '@mui/icons-material/Upload';
import EditIcon from '@mui/icons-material/Edit';
import api from "../generic-services/api";
import {useParams} from "react-router-dom";
import AttachmentIcon from "@mui/icons-material/Attachment";
import IconButton from "@mui/material/IconButton";
import DownloadIcon from "@mui/icons-material/Download";

export default function QuestionResponse({test,k}){
  const [editMode,setEditMode] = useState(false)
  const [marks,setMarks] = useState(test.obtainedScore)
  const {id,assessment_id} = useParams();
  const [key, setKey] = useState(0)

  function forceDown(url, filename) {
    fetch(url).then(function(t) {
      return t.blob().then((b) => {
        var a = document.createElement("a");
        a.href = URL.createObjectURL(b);
        a.setAttribute("download", filename);
        a.click();
      });
    });
  }

  function updateMarks(response_id){
    if(marks>=0) {
      api.execute(`/api/class/${id}/assessment/${assessment_id}/response/${response_id}/marks`, 'PUT', {
        obtainedScore: marks
      })
        .then(res => {
          setMarks(res.data.obtainedScore)
          setKey(key + 1)
          setEditMode(false)
        })
        .catch(err => console.log(err))
    }
  }
  return(
    <div key={key} className="p-4 w-full min-h-[200px] rounded-2xl shadow mb-2" key={k}>
      <div className="flex flex-row justify-between">
        <div>
          <h1 className="font-semibold">Question {k+1} :</h1>
          <h1 className="ml-2">{test.question.statement}</h1>
        </div>
        <div className="p-3 font-semibold text-slate-600 ">
          <span className="flex flex-row">
            { !editMode &&
              <p className="w-10 text-center rounded-md">{marks} </p>
            }
            { editMode &&
              <input type="number" max={test.question.questionScore} min={0} value={marks} onChange={(e)=>setMarks(e.target.value)}
              className="h-6 w-14 text-center rounded-md border-0 bg-yellow-100"/>
            }
            <p>/</p>
            <p className="w-10 text-center rounded-md">{test.question.questionScore}</p>
            {
              editMode &&
                <UploadIcon onClick={()=>updateMarks(test.id)} />
            }
            {
              !editMode &&
              <EditIcon onClick={()=>setEditMode(!editMode)}/>
            }
          </span>
          {/*<p>{(test.obtainedScore ?? 0) + ' / ' + test.question.questionScore}</p>*/}
        </div>
      </div>
      {test.question.option.length < 1 &&
      <div>
        <h1 className="font-semibold mt-2">Answer:</h1>
        <h1 className="ml-2">{test.answerStatment ?? ''}</h1>
      </div>
      }
      {test.question.option.length < 1 &&
      <div>
        {
          test.responseAttachment.length > 0 &&
          (<div>
            {test.responseAttachment?.length > 0  &&
                <div>
                  <div className={"text-gray-500 text-sm space-y-2"}>
                    <hr className="mt-2"/>
                    {test.responseAttachment?.map(p => (
                        <a className="flex w-full mt-5" key={p.file?.id} href={p.file?.publicUrl} target='_blank' rel='noreferrer'>
                          <div className="flex flex-col justify-center mr-2">
                            <AttachmentIcon className="rotate-45 text-gray-300"/>
                          </div>
                          <div className="w-full pl-1 border border-indigo-50 rounded flex justify-between">
                            <div key={p.file?.id} className="flex flex-col justify-center">
                              <p>{p.file?.originalName}</p>
                            </div>

                            <div onClick={()=>forceDown(`${p.file?.publicUrl}`,'testFile')}>
                              <IconButton size="small"><DownloadIcon/></IconButton>
                            </div>
                          </div>
                        </a>
                    ))}
                  </div>
                </div>
            }
          </div>)
        }
        {
          test.responseAttachment.length < 1 &&
          <div className="font-semibold text-red-700 mt-6">
            No files attached
          </div>
        }
      </div>
      }
      {test.question.option.length > 0 &&
      <div>
        <h1 className="font-semibold mt-2">Options:</h1>
        <ul className="flex flex-col items-start justify-start mt-2">
          {
            test.question.option.map(opt => {
              const options = test.questionResponseOption.map(o=> o.option.id)
              return (
                <li>
                  <input type='checkbox' value={opt.value} name={opt.value} defaultChecked={options.includes(opt.id)} disabled={true}/>
                  <label className="ml-2">{opt.value}</label>
                  {
                    options.includes(opt.id) && opt.isCorrect &&
                      <label className="ml-2">✔️</label>
                  }
                  {
                    options.includes(opt.id) && !opt.isCorrect &&
                    <label className="ml-2">❌</label>
                  }
                  </li>
              )
            })
          }
        </ul>
      </div>
      }
      {test.question.option.length > 0 &&
      <div>
        <h1 className="font-semibold mt-2">Correct Answers</h1>
        <ul className="flex flex-row justify-start items-center mt-2">
          {test.question.option.length > 0 &&
          test.question.option.map(opt => {
            if(opt.isCorrect) {
              return (
                <li
                  className={"bg-green-100 text-green-800 px-4 rounded-lg ml-4"}>{opt?.value}</li>
              )
            }
          })
          }
          {
            test.questionResponseOption.length < 1 &&
            <p>No option selected by user </p>
          }
        </ul>
      </div>
      }
    </div>
  )
}
