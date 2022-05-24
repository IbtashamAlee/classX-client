import { CalendarIcon } from '@heroicons/react/solid'
import AttendanceTable from "../components/attendance-table";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {createAttendance, getAttendance} from "../redux/actions/attendance-actions";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";

export default function Attendance() {
  let dispatch = useDispatch();
  let {id} = useParams();
  let positions = useSelector((state => state.attendances.attendances));
  const [record, setRecord] = useState(40);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getAttendance(id,record, page));
  }, [dispatch]);

  function getDateTime(clockDate) {
    let date = new Date(clockDate);
    return date.getDate() + "-" + parseInt(date.getMonth() + 1)+ "-" + date.getFullYear() + ' ending at '+ date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();;
  }

  return (
      <React.Fragment>
        <div className="text-gray-900 text-2xl font-medium py-4 flex justify-between">
          <h1>Attendance</h1>
          <FormDialog/>
        </div>
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {positions && positions.length > 0 && positions.map((position) => (
                <li key={position.id}>
                  <span className="block hover:bg-gray-50">
                    <div className="px-4 py-4 flex items-center justify-between sm:px-6">
                      <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                        <div className="truncate">
                          <div className="flex text-sm">
                            <p className="font-medium text-gray-900 truncate">{position.title}</p>
                          </div>
                          <div className="mt-2 flex">
                            <div className="flex items-center text-sm text-gray-500">
                              <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                              <p className={"whitespace-pre-line"}>
                                <time dateTime={position.endingTime}>{getDateTime(position.endingTime)}</time>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Link to={`/class-details/${id}/attendance/${position.id}`}>
                        <Button variant={"contained"}>View details</Button>
                      </Link>
                    </div>
                  </span>
                </li>
            ))}
          </ul>
        </div>
      </React.Fragment>
  )
}

function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();
  let {id} = useParams();

  const handleClickOpenClose = () => {
    setOpen(!open);
  };

  const handleSubmit = () => {
    dispatch(createAttendance(id, title));
    handleClickOpenClose();
  };

  return (
      <div>
        <Button variant="contained" onClick={handleClickOpenClose}>
          Create Attendance
        </Button>
        <Dialog open={open} onClose={handleClickOpenClose}>
          <DialogTitle>Create Attendance</DialogTitle>
          <DialogContent className="!pb-2 !pt-4">
            <ValidatorForm onSubmit={handleSubmit} className={"w-96"}>
              <TextValidator
                  id="title"
                  label="Title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  fullWidth
                  validators={['required']}
                  errorMessages={['This field is required']}
              />
              <DialogActions className="mt-4">
                <Button onClick={handleClickOpenClose}>Cancel</Button>
                <Button type={"submit"}>Create</Button>
              </DialogActions>
            </ValidatorForm>
          </DialogContent>
        </Dialog>
      </div>
  );
}
