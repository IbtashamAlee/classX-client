import { useState } from 'react'
import {
  EmojiHappyIcon,
  EmojiSadIcon,
  FireIcon,
  HeartIcon,
  ThumbUpIcon,
  XIcon,
} from '@heroicons/react/solid'
import {Button, Chip} from "@mui/material";
import {FilePicker} from "./file-picker";
import Api from "../generic-services/api";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {getFeed} from "../redux/actions/feed-actions";

const moods = [
  { name: 'Excited', value: 'excited', icon: FireIcon, iconColor: 'text-white', bgColor: 'bg-red-500' },
  { name: 'Loved', value: 'loved', icon: HeartIcon, iconColor: 'text-white', bgColor: 'bg-pink-400' },
  { name: 'Happy', value: 'happy', icon: EmojiHappyIcon, iconColor: 'text-white', bgColor: 'bg-green-400' },
  { name: 'Sad', value: 'sad', icon: EmojiSadIcon, iconColor: 'text-white', bgColor: 'bg-yellow-400' },
  { name: 'Thumbsy', value: 'thumbsy', icon: ThumbUpIcon, iconColor: 'text-white', bgColor: 'bg-blue-500' },
  { name: 'I feel nothing', value: null, icon: XIcon, iconColor: 'text-gray-400', bgColor: 'bg-transparent' },
]


export default function ClassPost() {
  const [selected, setSelected] = useState(moods[5]);
  const [content, setContent] = useState('');
  const [files, setFiles] = useState([]);

  let {id} = useParams();
  let dispatch = useDispatch();

  function getFiles (files) {
    setFiles(files);
  }

  function createPost() {
    Api.execute(`/api/class/${id}/post`, 'post', {
      content: content,
      files: files
    }).then(res => {
      console.log(res);
      setFiles([]);
      setContent('');
      dispatch(getFeed(id,40, 1));
    }).catch(err => {
      console.log(err);
    })
  }

  return (
      <div className="flex items-start space-x-4">
        <div className="min-w-0 flex-1">
          <form action="#" className="relative">
            <div className="border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
              <label htmlFor="comment" className="sr-only">
                Add your comment
              </label>
              <textarea
                  rows={3}
                  name="comment"
                  id="comment"
                  className="block w-full py-3 border-0 resize-none focus:ring-0 sm:text-sm"
                  placeholder="Post something here......."
                  value={content}
                  onChange={(e) => {setContent(e.target.value)}}
              />

              {/* Spacer element to match the height of the toolbar */}
              <div className="py-2" aria-hidden="true">
                {/* Matches height of button in toolbar (1px border + 36px content height) */}
                <div className="py-px">
                  <div className="h-9" />
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 inset-x-0 pl-3 pr-2 py-2 flex justify-between">
              <div className="flex items-center space-x-5">
                <div className="flex items-center">
                  <FilePicker fileReturn={getFiles}/>
                  {
                    files.length ?
                      <div className={"flex flex-nowrap space-x-2 overflow-x-scroll w-[13rem] md:w-[44rem] pb-1"}>
                        {files.map(f => (
                            <Chip label={f.originalName} />
                        ))}
                      </div> : <></>
                  }
                </div>
              </div>
              <div className="flex-shrink-0">
                <Button variant={"contained"} onClick={createPost}>Post</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
  )
}
