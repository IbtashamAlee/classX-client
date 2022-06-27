import {Header} from "../components/header";
import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import {styled} from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import {FilePicker} from "../components/file-picker";
import {Button} from "@mui/material";
import api from '../generic-services/api'
import done from '../done.svg';
import {useNavigate, useLocation} from 'react-router-dom';
import Api from "../generic-services/api";

const BpIcon = styled('span')(({theme}) => ({
  borderRadius: '50%',
  width: 16,
  height: 16,
  boxShadow:
      theme.palette.mode === 'dark'
          ? '0 0 0 1px rgb(16 22 26 / 40%)'
          : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
  backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
  backgroundImage:
      theme.palette.mode === 'dark'
          ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
          : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background:
        theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: '#137cbd',
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&:before': {
    display: 'block',
    width: 16,
    height: 16,
    backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: '#106ba3',
  },
});

// Inspired by blueprintjs
function BpRadio(props) {
  return (
      <Radio
          sx={{
            '&:hover': {
              bgcolor: 'transparent',
            },
          }}
          disableRipple
          color="default"
          checkedIcon={<BpCheckedIcon/>}
          icon={<BpIcon/>}
          {...props}
      />
  );
}


export default function AttemptAssessment() {
  const [questions, setQuestions] = useState([])
  const [current, setCurrent] = useState(0)
  const [isMCQ, setIsMCQ] = useState(false)
  let navigate = useNavigate();
  const location = useLocation();
  let state = location.state ?? null;
  let assessment_id = state.id;
  let class_id = location.state.class_id

  const [content, setContent] = useState('');
  const [files, setFiles] = useState([]);
  let totalSeconds = 0;

  const [timeInterval, setTimeInterval] = useState();
  const secondsRef = React.useRef();
  const minutesRef = React.useRef();
  let hoursRef = React.useRef();
  let nextbtn = useRef(null);

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [questionId, setQuestionId] = useState('');
  const [submission, setSubmission] = useState('');

  function getFiles(files) {
    setFiles(files);
  }

  function pad(val)
  {
    var valString = val + "";
    if(valString.length < 2)
    {
      return "0" + valString;
    }
    else
    {
      return valString;
    }
  }

  function setTime()
  {
    if(!secondsRef.current?.getAttribute('value')) return
    totalSeconds = parseInt(secondsRef.current.getAttribute('value'));
    --totalSeconds;

    localStorage.setItem('seconds', totalSeconds.toString());
    secondsRef.current.setAttribute("value", pad(totalSeconds));

    secondsRef.current.innerHTML = pad(totalSeconds%60);
    minutesRef.current.innerHTML = pad(parseInt((totalSeconds/60)%60));
    hoursRef.current.innerHTML = pad(parseInt((totalSeconds/60)/60))

    if (totalSeconds === 0) {
      localStorage.setItem("current" + assessment_id, current - 1 + 2)
      setCurrent(current - 1 + 2)
      setContent('');
      setSelectedOptions([]);
    }
  }

  const setMcqs = (op, isRadio) => {
    if (op === undefined) return

    if (isRadio) {
      if (!selectedOptions.includes(op)) {
        setSelectedOptions((selectedOptions) => [...[], {id: op}])
      }
    } else {
      if (!selectedOptions.includes(op)) {
        setSelectedOptions((selectedOptions) => [...selectedOptions, {id: op}])
      }
    }
  }

  let submitAnswer = () => {
    Api.execute('/api/class/' + class_id + "/assessment/" + assessment_id + "/question/" + questionId + "/response", 'post', {
      options: selectedOptions,
      answer: content
    }).then(res => {
      localStorage.setItem("current" + assessment_id, current - 1 + 2)
      setCurrent(current - 1 + 2)
      setContent('');
      setSelectedOptions([]);
      if (current ==  questions.length - 1) {
        submitAssessment();
      }
      console.log(res)
    }).catch(err => {
      console.log(err);
    })
  }

  let submitAssessment = () => {
    Api.execute('/api/class/assessment/' + assessment_id + '/done', 'post').then(res => {
      setSubmission(res.data);
    }).catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    clearInterval(timeInterval);
    setTimeInterval(setInterval(setTime, 1000));
    return () => {
      clearInterval(timeInterval);
    }
  }, [current, questionId])


  useEffect(() => {
    api.execute("/api/class/assessment/" + assessment_id, 'get')
        .then((res) => {
          setQuestions(res.data.assessment.question)
          localStorage.getItem("current" + assessment_id) ? setCurrent(localStorage.getItem("current" + assessment_id)) : localStorage.setItem("current" + assessment_id, 0)
        })
  }, [])

  useEffect(() => {
    if (questions.length === 0) return;
    let correct = 0
    questions[current]?.option?.map(opt => {
      console.log(opt.isCorrect)
      if (opt.isCorrect) correct++
    })
    if (correct === 1) {
      setIsMCQ(true)
    } else {
      setIsMCQ(false);
    }
    setQuestionId(questions[current]?.id)
  }, [questions, current])

  if (current == questions.length) {
    clearInterval(timeInterval);
    return (
        <div>
          <Header/>
          <div className="flex justify-center items-center flex-col h-full w-full m-auto fixed">
            <img src={done} className="w-96"/>
            <p className="mt-4 font-semibold text-2xl">Assessment Attempted Successfully</p>
            <p className="mt-4 font-semibold text-2xl">Marks Obtained: {submission.obtainedMarks}</p>
            <p className="mt-4 font-semibold text-2xl">Marks Obtained: {submission.totalMarks}</p>
            <Button onClick={() => navigate('/')} variant='contained' style={{marginTop: '10px'}}>Back to dashboard</Button>
          </div>
        </div>
    )
  }

  return (
      <React.Fragment>
        <Header/>
        <div className="bg-white flex flex-col items-center justify-center h-[90vh]">
          <div className="max-w-7xl py-8 px-4 sm:px-6 lg:py-16 lg:px-8 bg-slate-50 shadow w-full">
            <h2 className="text-sm tracking-tight text-gray-900 sm:text-xl font-bold flex justify-between">
              <span className="block">QUESTION {(current - 1 + 2)} :</span>
              <div className="text-gray-500">
                Timer
                <div className="text-gray-900 font-medium text-3xl">
                  <label ref={hoursRef}>00</label>
                  <label>:</label>
                  <label ref={minutesRef}>00</label>
                  <label>:</label>
                  <span value={questions[current]?.duration/1000} ref={secondsRef}>00</span>
                </div>
              </div>
            </h2>
            <p className="text-2xl my-3">{questions[current]?.statement}</p>

            {
                questions && questions[current] && questions[current].option.length < 1 &&
                <form action="#" className="relative">
                  <div
                      className="border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                    <label htmlFor="comment" className="sr-only">
                      Add your comment
                    </label>
                    <textarea
                        rows={3}
                        name="comment"
                        id="comment"
                        className="block w-full py-3 border-0 resize-none focus:ring-0 sm:text-sm"
                        placeholder="Write you answer here...."
                        value={content}
                        onChange={(e) => {
                          setContent(e.target.value)
                        }}
                    />
                    <div className="py-2" aria-hidden="true">
                      <div className="py-px">
                        <div className="h-9"/>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-0 inset-x-0 pl-3 pr-2 py-2 flex justify-between">
                    <div className="flex items-center space-x-5">
                      <div className="flex items-center">
                        <FilePicker fileReturn={getFiles}/>
                      </div>
                    </div>
                  </div>
                </form>
            }

            {
                questions && questions[current] && isMCQ &&
                <FormControl onChange={(e) => console.log(e.target.value)}>
                  <RadioGroup
                      aria-labelledby="demo-customized-radios"
                      name="customized-radios"
                      onChange={e => {setMcqs(e.target.value, true)}}
                  >
                    {
                      questions[current].option.map((opt) => {
                        return (<FormControlLabel value={opt.id} key={opt.value} control={<BpRadio/>} label={opt.value} />)
                      })
                    }
                  </RadioGroup>
                </FormControl>

            }

            {
                questions && questions[current] && questions[current].option?.length > 0 && !isMCQ &&
                <div className="flex flex-col justify-start items-start">
                  {
                    questions[current].option.map(opt => {
                      return (
                          <div className="flex inline-flex justify-center items-center" key={opt.value}>
                            <Checkbox label={opt.value} value={opt.id} onChange={(e) => setMcqs(e.target.value, false, e.target.checked)}
                                      color="secondary"/>
                            <p>{opt.value}</p>
                          </div>
                      );
                    })
                  }
                </div>
            }

            <div className="mt-8 flex justify-center">
              <div className="inline-flex rounded-md shadow">
                {current == questions.length -1 ?
                    <Button onClick={submitAnswer} variant={"contained"}>Submit</Button>
                    :
                    <Button
                        variant={"contained"}
                        onClick={() => {
                          submitAnswer();
                        }}
                        ref={nextbtn}
                    >
                      Next
                    </Button>
                }
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
  )
}
