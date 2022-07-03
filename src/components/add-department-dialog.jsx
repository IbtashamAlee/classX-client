import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {useDispatch} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {IconButton} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {addDepartmentInInstitute} from "../redux/actions/institute-actions";

export default function AddDepartmentDialog(props) {
  const [departmentName, setDepartmentName] = useState('');
  const [description, setDescription] = useState('');

  const [open, setOpen] = useState(false);

  let dispatch = useDispatch();
  let navigate = useNavigate();
  let {id} = useParams();

  function addDepartment() {
    dispatch(addDepartmentInInstitute(id, departmentName));
  }

  function handleOpenClose() {
    setOpen(!open);
  }

  return (
      <React.Fragment>
        <IconButton onClick={handleOpenClose}>
          <AddIcon/>
        </IconButton>
        <Dialog open={open} onClose={handleOpenClose} aria-labelledby="form-dialog-title"
                maxWidth={'xs'}
                fullWidth={true}
        >
          <DialogTitle id="form-dialog-title">Create Department</DialogTitle>
          <DialogContent className="!pb-2">
            <DialogContentText className="!mb-2">
              {"Fill the detail and to create a department"}
            </DialogContentText>
            <ValidatorForm onSubmit={addDepartment}>

              <div className="space-y-4">
                <TextValidator
                    id="name"
                    label="Name"
                    value={departmentName}
                    onChange={e => setDepartmentName(e.target.value)}
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

              <DialogActions className="mt-4">
                <Button onClick={handleOpenClose} color="primary">
                  Cancel
                </Button>
                <Button color="primary" type="submit">
                  Add
                </Button>
              </DialogActions>
            </ValidatorForm>
          </DialogContent>
        </Dialog>
      </React.Fragment>
  );
}
