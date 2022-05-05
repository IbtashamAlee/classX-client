import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {useDispatch} from "react-redux";
import {Chip, Radio, Slide, Stack, Tooltip} from "@mui/material";
import {addParticipantsInClass} from "../redux/actions/participants_actions";
import {useParams} from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddParticipantsDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [isTeachers, setIsTeachers] = useState(false);
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('');
  let {id} = useParams();

  let dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setUsers([]);
    setEmail('');
    setIsTeachers(false);
    setOpen(false);
  };

  function addParticipant() {
    let role;
    isTeachers ? role = 'Teacher' : role = 'Student';
    let p = {
      email: email.replaceAll(' ', ''),
      role: role
    }
    setUsers([...users, p]);
    setEmail('');
    setIsTeachers(false);
  }

  function removeParticipant(email) {
    let filtered = users.filter(function(el) { return el.email !== email; });
    setUsers(filtered)
  }

  function saveParticipants() {
    dispatch(addParticipantsInClass(id, users));
    handleClose();
  }

  return (
      <div>
        <Button variant="contained" onClick={handleClickOpen}>Add participants</Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title"
                fullScreen
                TransitionComponent={Transition}
        >
          <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
              <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleClose}
                  aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Add Participants
              </Typography>
              <Button disabled={!users.length} autoFocus color="inherit" onClick={saveParticipants}>
                Save
              </Button>
            </Toolbar>
          </AppBar>
          <DialogTitle id="form-dialog-title">Add Participants</DialogTitle>
              <DialogContent className="!pb-2">
                <DialogContentText>
                  Fill the detail and to add the class
                </DialogContentText>
                <ValidatorForm onSubmit={addParticipant} className="space-y-2 mt-4">
                  <TextValidator
                      id="participant-email"
                      label="Participant's emails"
                      type="email"
                      placeholder={"Add participant's email"}
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      fullWidth
                      validators={['required', 'isEmail']}
                      errorMessages={['This field is required', 'Email is not valid']}
                  />
                  <div>
                    <div className="text-gray-900">
                      <Radio checked={!isTeachers} onChange={() => {setIsTeachers(false)}} color="primary" name="isNotTeacher"/>
                      <span>Students</span>
                    </div>
                    <div className="text-gray-900">
                      <Radio checked={isTeachers} onChange={() => {setIsTeachers(true)}} color="primary" name="isTeacher"/>
                      <span>Teachers</span>
                    </div>
                  </div>
                  <Stack direction="row" spacing={1}>
                    {users && users.map(user => (
                        <Tooltip title={user.role}>
                          <Chip label={user.email} variant="contained" onDelete={() => {removeParticipant(user.email)}} />
                        </Tooltip>
                    ))}
                  </Stack>
                  <DialogActions className="mt-4">
                    <Button onClick={handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button color="primary" type="submit">
                      Add
                    </Button>
                  </DialogActions>
                </ValidatorForm>
              </DialogContent>
        </Dialog>
      </div>
  );
}
