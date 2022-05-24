import React, {useRef, useState} from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import {Slide} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {PaperClipIcon} from "@heroicons/react/solid";
import axios from "axios";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
      <div
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          {...other}
      >
        {value === index && (
            <Box sx={{ p: 3 }}>
              <Typography>{children}</Typography>
            </Box>
        )}
      </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


export function FilePicker(props) {
  const [open, setOpen] = React.useState(false);
  const [files, setFiles] = useState([]);
  const [value, setValue] = React.useState(0);

  let {id} = useParams();
  let inp = useRef(null);

  let dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectedFiles = (e) => {
    let names = [];
    for (let i = 0; i < inp.current.files.length; i++) {
      console.log(inp.current.files[i].name);
      names.push(inp.current.files[i].name);
    }
    setFiles(names);
  }

  async function submit(){
    const data = new FormData();
    for (let i = 0; i < inp.current.files.length; i++) {
      data.append('file', document.getElementById('file-upload').files[i]);
    }
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
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                  <Tab label="File Upload" {...a11yProps(0)} />
                  <Tab label="My files" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
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
                          <input id="file-upload" ref={inp} name="file-upload" type="file" className="sr-only" multiple
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
                  {files?.length ?
                      <div>
                        <h5 className={"mt-4 mb-2 text-gray-900 text-md font-medium"}>Selected files</h5>
                        <div className={"text-gray-500 text-sm space-y-2"}>
                          {files && files.map(f => (
                              <div key={f}>{f}</div>
                          ))}
                        </div>
                      </div> : <></>
                  }
                </div>
              </TabPanel>
              <TabPanel value={value} index={1}>
                Item Two
              </TabPanel>
            </Box>
            <DialogActions>
              <Button variant={"contained"} onClick={submit}> Upload</Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </div>
  )
}
