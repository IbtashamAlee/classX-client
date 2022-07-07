import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {TextField} from "@mui/material";

export default function QuestionsToDisplayDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [q, setQ] = React.useState('0');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <div>
        <p variant="outlined" onClick={handleClickOpen}>
          {props.children}
        </p>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" className={"w-full"}>
              <h4 className={"mb-4"}>Question Available: {props.length}</h4>
              <TextField
                  label={"Questions to display"}
                  value={q}
                  className={"w-full"}
                  onChange={e => {setQ(e.target.value)}}
              />
              <h4 className={"mt-2 text-sm"}>Hint: Questions to display must be less than or equal to questions available.</h4>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            <Button onClick={() => {props.actionDone(q)}} disabled={parseInt(q) > props.length} color={"error"} autoFocus>
              Assign
            </Button>
          </DialogActions>
        </Dialog>
      </div>
  );
}
