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
import {addParticipantsInClass} from "../redux/actions/participants_actions";
import Checkbox from "@mui/material/Checkbox";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function AddQuestionDialog (props) {
  const [open, setOpen] = React.useState(false);
  const [users, setUsers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [statement, setStatement] = useState('');
  const [isTrue, setIsTrue] = useState(false);
  const [options, setOptions] = useState([]);
  const [option, setOption] = useState('');
  const [duration, setDuration] = useState('600');
  const [score, setScore] = useState('10');

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
    let o = {
      value: option,
      isCorrect: isTrue
    }
    setOptions([...options, o]);
    setIsTrue(false);
    setOption('');
  }

  function addQuestion() {
    let q = {
      statement: statement,
      score: score,
      duration: duration,
      options: options
    }
    setOptions([]);
    setStatement('');
    setIsTrue(false);
    setQuestions([...questions, q])
  }

  function removeOption(value) {
    let filtered = options.filter(function(el) { return el.value !== value; });
    setOptions(filtered)
  }

  function removeQuestion(statement) {
    let filtered = questions.filter(function(el) { return el.statement !== statement; });
    setQuestions(filtered)
  }

  function saveQuestions() {
    props.addQuestions(questions);
    handleClose();
  }

  return (
      <div>
        <Button color={"success"} variant={"outlined"} onClick={handleClickOpen} className={"!mr-4"}>Add multiple choice question</Button>
        <Button color={"success"} variant={"outlined"} onClick={handleClickOpen}>Add open ended question</Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title"
                fullWidth
                maxWidth={'lg'}
                TransitionComponent={Transition}
        >
          <DialogTitle id="form-dialog-title">Add Questions</DialogTitle>
          <DialogContent className="!pb-2">
            <DialogContentText>
              Fill the detail and to add the class
            </DialogContentText>
            <div className={"flex justify-center items-center"}>

            </div>
            <ValidatorForm onSubmit={saveQuestions} className="space-y-4 mt-4">
              <TextValidator
                  id="statement"
                  label="Question Statement"
                  placeholder={"Add question statement"}
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
                    validators={['required']}
                    errorMessages={['This field is required']}
                />
                <FormGroup>
                  <FormControlLabel control={<Checkbox checked={isTrue} name={"isTrue"} onChange={() => {setIsTrue(!isTrue)}}/>} label="Mark Correct" />
                </FormGroup>
                <TextValidator
                    id="duration"
                    label="Duration"
                    value={duration}
                    onChange={e => setDuration(e.target.value)}
                    fullWidth
                    validators={['required']}
                    errorMessages={['This field is required']}
                />
                <TextValidator
                    id="score"
                    label="Score"
                    value={score}
                    onChange={e => setScore(e.target.value)}
                    fullWidth
                    validators={['required']}
                    errorMessages={['This field is required']}
                />
                <Button color="primary" variant={"outlined"} onClick={addOption}>
                  Add Option
                </Button>
              </div>
              <Stack direction="row" spacing={1}>
                {options && options.map(option => (
                    <Tooltip title={option.isCorrect ?  "Correct" : "Incorrect"}>
                      <Chip label={option.value} variant="contained" onDelete={() => {removeOption(option.value)}} />
                    </Tooltip>
                ))}
              </Stack>
              <div className={"flex space-x-2"}>
                <Button onClick={handleClose} color="primary">
                  Clear
                </Button>
                <Button color="primary" variant={"outlined"} onClick={addQuestion}>
                  Add Question
                </Button>
              </div>
              <Stack direction="row" spacing={1}>
                {questions && questions.map(question => (
                    <Tooltip title={question.statement}>
                      <Chip label={question.statement} variant="contained" onDelete={() => {removeQuestion(question.statement)}} />
                    </Tooltip>
                ))}
              </Stack>
              <DialogActions className="mt-4">
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button color="primary" onClick={saveQuestions}>
                  Save Questions
                </Button>
              </DialogActions>
            </ValidatorForm>
          </DialogContent>
        </Dialog>
      </div>
  )
}
