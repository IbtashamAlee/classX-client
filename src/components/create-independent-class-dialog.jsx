import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {createIndependentClass, joinClass} from "../redux/actions/class-actions";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

export default function CreateIndependentClassDialog(props) {
  const [className, setClassName] = useState('');
  const [classCode, setClassCode] = useState('');
  const [description, setDescription] = useState('');

  let dispatch = useDispatch();
  let navigate = useNavigate();

  const handleSubmit = () => {
    props.isJoin ? joinTheClass() : addClass();
  }

  function addClass() {
    dispatch(createIndependentClass(className, description, navigate));
  }
  function joinTheClass() {
    dispatch(joinClass(classCode, navigate));
  }

  return (
      <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title"
              maxWidth={'xs'}
              fullWidth={true}
      >
        <DialogTitle id="form-dialog-title">{props.isJoin ? "Join Class" : "Add Independent Class"}</DialogTitle>
        <DialogContent className="!pb-2">
          <DialogContentText className="!mb-2">
            {props.isJoin ? "Fill the detail and to join class" : "Fill the detail and to create an independent class"}
          </DialogContentText>
          <ValidatorForm onSubmit={handleSubmit}>
            {props.isJoin ?
                <TextValidator
                    id="classname"
                    label="Class Code"
                    value={classCode}
                    onChange={e => setClassCode(e.target.value)}
                    fullWidth
                    validators={['required']}
                    errorMessages={['This field is required']}
                />:
                <div className="space-y-4">
                  <TextValidator
                      id="name"
                      label="Name"
                      value={className}
                      onChange={e => setClassName(e.target.value)}
                      fullWidth
                      validators={['required']}
                      errorMessages={['This field is required']}
                  />
                  <TextValidator
                      id="details"
                      label="Description"
                      fullWidth
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                  />
                </div>
            }
            <DialogActions className="mt-4">
              <Button onClick={props.handleClose} color="primary">
                Cancel
              </Button>
              <Button color="primary" type="submit">
                Add
              </Button>
            </DialogActions>
          </ValidatorForm>
        </DialogContent>
      </Dialog>
  );
}
