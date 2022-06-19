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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export function AddQuestionDialog (props) {
  const [open, setOpen] = React.useState(false);
  const [questions, setQuestions] = useState([]);
  const [statement, setStatement] = useState('');
  const [isTrue, setIsTrue] = useState(false);
  const [options, setOptions] = useState([]);
  const [option, setOption] = useState('');
  const [duration, setDuration] = useState('60');
  const [score, setScore] = useState('10');
  const [isOpenEnded, setIsOpenEnded] = useState(false);

  let {id} = useParams();
  let dispatch = useDispatch();

  const handleClickOpen = (openEnded = false) => {
    setOpen(true);
    setIsOpenEnded(openEnded);
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
      duration: duration * 1000,
      options: options
    }
    setOptions([]);
    setStatement('');
    setIsTrue(false);
    setQuestions([...questions, q])
    saveQuestions();
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
        <Button color={"success"} variant={"outlined"} onClick={() => {handleClickOpen(false)}} className={"!mr-4"}>Add multiple choice question</Button>
        <Button color={"success"} variant={"outlined"} onClick={() => {handleClickOpen(true)}}>Add open ended question</Button>
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
            <ValidatorForm onSubmit={addQuestion} className="space-y-4 mt-4">
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
                    id="duration"
                    label="Duration (s)"
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
              </div>
              {!isOpenEnded &&
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
                    <FormGroup>
                      <FormControlLabel control={<Checkbox checked={isTrue} name={"isTrue"} onChange={() => {setIsTrue(!isTrue)}}/>} label="Mark Correct" />
                    </FormGroup>
                    <Button color="primary" variant={"outlined"} onClick={addOption}>
                      Add Option
                    </Button>
                  </div>}
              <Stack direction="row" spacing={1}>
                {options && options.map(option => (
                    <Tooltip title={option.isCorrect ?  "Correct" : "Incorrect"} key={option.value}>
                      <Chip label={option.value} variant="contained" onDelete={() => {removeOption(option.value)}} />
                    </Tooltip>
                ))}
              </Stack>
              <DialogActions className="mt-4">
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button color="primary" type={"submit"} disabled={!statement}>
                  Add Question
                </Button>
              </DialogActions>
            </ValidatorForm>
          </DialogContent>
        </Dialog>
      </div>
  )
}
