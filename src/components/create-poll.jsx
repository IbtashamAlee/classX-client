import React, {useState} from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import {Chip, FormControlLabel, FormGroup, Radio, Slide, Stack, Tooltip} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import Checkbox from "@mui/material/Checkbox";
import Api from "../generic-services/api";
import {getFeed} from "../redux/actions/feed-actions";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function CreatePoll (props) {
  const [open, setOpen] = React.useState(false);
  const [questions, setQuestions] = useState([]);
  const [statement, setStatement] = useState('');
  const [options, setOptions] = useState([]);
  const [option, setOption] = useState('');

  let {id} = useParams();
  let dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOptions([]);
    setQuestions([]);
    setOpen(false);
  };

  function addOption() {
    setOptions([...options, option]);
    setOption('');
  }

  function addQuestion() {
    // let q = {
    //   statement: statement,
    //   score: score,
    //   duration: duration,
    //   options: options
    // }
    // setOptions([]);
    // setStatement('');
    // setIsTrue(false);
    // setQuestions([...questions, q])
  }

  function removeOption(value) {
    let filtered = options.filter(function(el) { return el !== value; });
    setOptions(filtered)
  }

  function saveQuestions() {
    Api.execute(`/api/class/${id}/poll`, 'post', {
      statement: statement,
      pollOptions: options
    }).then((res) => {
      handleClose();
      setStatement("");
      setOptions([]);
      dispatch(getFeed(id,40, 1));
      if (props.getPolls) props.getPolls();
    }).catch(err => {
      console.log(err);
    })
  }

  return (
      <div>
        <Button variant={"contained"} onClick={handleClickOpen} color={"info"}>Create Poll</Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title"
                fullWidth
                maxWidth={'lg'}
                TransitionComponent={Transition}
        >
          <DialogTitle id="form-dialog-title">Create Poll</DialogTitle>
          <DialogContent className="!pb-2">
            <DialogContentText>
              Fill the detail to add poll
            </DialogContentText>
            <ValidatorForm onSubmit={saveQuestions} className="space-y-4 mt-4">
              <TextValidator
                  id="statement"
                  label="Poll Statement"
                  placeholder={"Add poll statement"}
                  value={statement}
                  onChange={e => setStatement(e.target.value)}
                  fullWidth
                  validators={['required']}
                  errorMessages={['This field is required']}
              />
              <div className={"flex space-x-2 items-center"}>
                <TextValidator
                    id="option"
                    label="Option"
                    placeholder={"Add option"}
                    className={"!w-96"}
                    value={option}
                    onChange={e => setOption(e.target.value)}
                    fullWidth
                />
                <Button color="primary" variant={"outlined"} onClick={addOption}>
                  Add Option
                </Button>
              </div>
              <Stack direction="row" spacing={1}>
                {options && options.map(option => (
                    <Tooltip>
                      <Chip label={option} variant="contained" onDelete={() => {removeOption(option)}} />
                    </Tooltip>
                ))}
              </Stack>
              {/*<div className={"flex space-x-2"}>*/}
              {/*  <Button onClick={handleClose} color="primary">*/}
              {/*    Clear*/}
              {/*  </Button>*/}
              {/*  <Button color="primary" variant={"outlined"} onClick={addQuestion}>*/}
              {/*    Add Question*/}
              {/*  </Button>*/}
              {/*</div>*/}
              <DialogActions className="mt-4">
                <Button onClick={handleClose} color="primary">
                  Clear
                </Button>
                <Button color="primary" variant={"contained"} type="submit">
                  Post Poll
                </Button>
                {/*<Button onClick={handleClose} color="primary">*/}
                {/*  Cancel*/}
                {/*</Button>*/}
                {/*<Button color="primary" onClick={saveQuestions}>*/}
                {/*  Save Questions*/}
                {/*</Button>*/}
              </DialogActions>
            </ValidatorForm>
          </DialogContent>
        </Dialog>
      </div>
  )
}
