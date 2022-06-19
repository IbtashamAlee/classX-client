import React, {useEffect, useState} from 'react';
import Api from "../generic-services/api";
import {useParams} from "react-router-dom";
import {Header} from "../components/header";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Button} from "@mui/material";
import {AddQuestionDialog} from "../components/add-question-dialog";

export function EditAssessment(props) {
  const [assessment, setAssessment] = useState({});

  let {id} = useParams();

  let getSpecificAssessment = () => {
    Api.execute('/api/assessment/' + id).then((res) => {
      setAssessment(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }

  let deleteQuestion = (question_id) => {
    Api.execute('/api/assessment/' + id + '/question/' + question_id + '/remove', 'put').then(res => {
      getSpecificAssessment();
    }).catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    getSpecificAssessment();
  }, [])

  return (
      <div>
        <Header/>
        <div className="flex flex-col md:px-8 xl:px-0 px-4 md:px-0 mx-4 md:mx-16 mt-6">
          <div className={"flex justify-between items-center"}>
            <div>
              <h3 className={"text-xs md:text-sm text-gray-400"}>Assessment Title</h3>
              <h1 className={"text-2xl text-gray-900 flex flex-col"}>{assessment.name}
                <p className={"text-xs md:text-sm text-gray-400"}>{assessment.isPublic && "(This is a public assessment)"}</p>
              </h1>
            </div>
            <AddQuestionDialog getAssessment={getSpecificAssessment}/>
          </div>
          <h2 className={"text-xl text-gray-900 mt-5"}>Description</h2>
          <p className={"text-gray-700 mt-1"}>{assessment.body}</p>

          <h2 className={"text-xl text-gray-900 mt-5 mb-2"}>Questions</h2>
          <TableContainer component={Paper} className={"mb-4"}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Statement</TableCell>
                  <TableCell align="right">Type</TableCell>
                  <TableCell align="right">Time&nbsp;(sec)</TableCell>
                  <TableCell align="right">Score</TableCell>
                  <TableCell align="right">Options</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {assessment.question && [...assessment.question].reverse().map((row) => (
                    <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.statement}
                      </TableCell>
                      <TableCell align="right">{row.option.length > 0 ? "MCQs" : "Open Ended"}</TableCell>
                      <TableCell align="right">{row.duration}</TableCell>
                      <TableCell align="right">{row.score}</TableCell>
                      <TableCell align="right">{row.option.length}</TableCell>
                      <TableCell align="right">
                        <Button variant={"outlined"} color={"error"} onClick={() => {deleteQuestion(row.id)}}> Delete</Button>
                      </TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
  )
}
