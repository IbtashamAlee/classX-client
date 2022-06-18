import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {createAttendance} from "../redux/actions/attendance-actions";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";

export function CreateAttendance(props) {
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
