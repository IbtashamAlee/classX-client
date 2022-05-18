import React, {useState} from "react";
import {Header} from "../components/header";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import {Chip, FormControlLabel, FormGroup, Radio, Stack, TextareaAutosize, Tooltip} from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import {AddQuestionDialog} from "../components/add-question-dialog";

export function CreateAssessment() {
  const [isTeachers, setIsTeachers] = useState(false);
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('');
  const [body, setBody] =  useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [questions, setQuestions] = useState([]);

  function createNewAssessment() {

  }

  function removeQuestion(statement) {
    let filtered = questions.filter(function(el) { return el.statement !== statement; });
    setQuestions(filtered)
  }

  function addQuestions(q) {
    setQuestions(q);
  }

  return (
      <div>
        <Header/>
        <div className="px-4 md:px-0 mx-4 md:mx-16">
          <div className="flex justify-between py-4">
            <div className="text-gray-900 text-2xl font-medium">Create New assessment</div>
          </div>
          <ValidatorForm onSubmit={createNewAssessment} className="space-y-2 mt-4">
            <TextValidator
                id="name"
                label="Assessment Name"
                type="name"
                value={email}
                onChange={e => setEmail(e.target.value)}
                fullWidth
                validators={['required']}
                errorMessages={['This field is required']}
            />
            <div className="text-gray-900 !mt-6 text-base font-medium">Description</div>
            <TextareaAutosize
                value={body}
                onChange={e => setBody(e.target.value)}/>
            <FormGroup>
              <FormControlLabel control={<Checkbox onChange={() => {setIsPublic(!isPublic)}}/>} label="Make Public" />
            </FormGroup>
         </ValidatorForm>
          <AddQuestionDialog addQuestions={addQuestions}/>
          <Stack direction="row" spacing={1} className={"mt-6"}>
            {questions && questions.map(question => (
                <Tooltip title={question.statement}>
                  <Chip label={question.statement} variant="contained" onDelete={() => {removeQuestion(question.statement)}} />
                </Tooltip>
            ))}
          </Stack>
        </div>
      </div>
  )
}
