import React, {useState} from "react";
import {Header} from "../components/header";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import {Button, FormControlLabel, FormGroup, TextareaAutosize} from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import {AddQuestionDialog} from "../components/add-question-dialog";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {createAssessment} from "../redux/actions/assessments-actions";

export function CreateAssessment() {
  const [name, setName] = useState('');
  const [body, setBody] =  useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [questions, setQuestions] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function createNewAssessment() {
    dispatch(createAssessment(name, body, isPublic, questions, navigate));
  }

  function removeQuestion(statement) {
    let filtered = questions.filter(function(el) { return el.statement !== statement; });
    setQuestions(filtered)
  }

  function addQuestions(q) {
    q.forEach(e => {
      setQuestions((questions) => [...questions, e]);
    })
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
                value={name}
                onChange={e => setName(e.target.value)}
                fullWidth
                validators={['required']}
                errorMessages={['This field is required']}
            />
            <div className="text-gray-900 !mt-6 text-base font-medium">Description</div>
            <TextareaAutosize
              className="w-full"
                value={body}
                onChange={e => setBody(e.target.value)}/>
            <FormGroup>
              <FormControlLabel control={<Checkbox onChange={() => {setIsPublic(!isPublic)}}/>} label="Make Public" />
            </FormGroup>
            <Button type={"submit"} variant={"contained"} className={"!mb-6"}>
              Create
            </Button>
         </ValidatorForm>
        </div>
      </div>
  )
}
