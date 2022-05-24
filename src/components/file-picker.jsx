import React, {useRef, useState} from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import {Chip, Radio, Slide, Stack, Tooltip} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {PaperClipIcon} from "@heroicons/react/solid";
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function FilePicker(props) {
  const [open, setOpen] = React.useState(false);
  const [files, setFiles] = useState([]);
  let {id} = useParams();

  let dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectedFiles = (e) => {
    // for (let i = 0; i < e.target.files.length; i++) {
    //   console.log(e.target.files[i].name)
    //   let f = [...files, e.target.files[i].name]
    //   setFiles(f);
    // }
    setFiles(e.target.files);
    // switch (e.target.name) {
    //     // Updated this
    //   case 'file-upload':
    //     if(e.target.files.length > 0) {
    //       // Accessed .name from file
    //       this.setState({ fileName: e.target.files[0].name });
    //     }
    //     break;
    //   default:
    //     this.setState({ [e.target.name]: e.target.value });
    // }
  }

  async function submit(){
    const data = new FormData()
    data.append('file', document.getElementById('file-upload').files)
    console.log(document.getElementById('file-upload').files);
    let url = "/file/multiple";

    // axios.post(url, data, { // receive two parameter endpoint url ,form data
    //   url: url,
    //   files: data
    // })
    //     .then(res => { // then print response status
    //       console.warn(res);
    //     })
    try {
      const response = await axios({
        method: "post",
        url: "/file/multiple",
        data: data,
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch(error) {
      console.log(error)
    }

  }
  return (
      <div>
        <IconButton
            type="button"
            onClick={handleClickOpen}
        >
          <PaperClipIcon className="h-5 w-5" aria-hidden="true" />
          <span className="sr-only">Attach a file</span>
        </IconButton>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title"
                fullWidth
                TransitionComponent={Transition}
        >
          <DialogTitle id="form-dialog-title">Upload files</DialogTitle>
          <DialogContent className="!pb-2">
            <DialogContentText>
              Fill the detail and to add the class
            </DialogContentText>
            <div className="sm:col-span-6">
              <div
                  className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                  >
                    <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Upload a files</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple
                             onChange={event => {
                               setFiles([]);
                               handleSelectedFiles(event)
                             }}
                      />
                    </label>
                    <p className="pl-1 my-auto text-center">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">Any Supporting documents upto 10mb</p>
                </div>
              </div>
              <div className={"text-indigo-500 text-sm space-y-2 mt-4"}>
                {/*{files && files.map(f => (*/}
                {/*    <div>{f.name}</div>*/}
                {/*))}*/}
              </div>
            </div>
            <DialogActions>
              <Button variant={"contained"} onClick={submit}> Upload</Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </div>
  )
}
