import {Header} from "../components/header";
import * as React from 'react';
import {useEffect, useState} from 'react';
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
import {useNavigate,useLocation} from 'react-router-dom';


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
  const location  = useLocation();
  const assessment = location.state ?? null;

  useEffect(() => {
    api.execute("/api/class/assessment/" + assessment.id, 'get')
      .then((res) => {
        setQuestions(res.data.assessment.question)
        localStorage.getItem("current" + assessment.id) ? setCurrent(localStorage.getItem("current" + assessment.id)) : localStorage.setItem("current" + assessment.id, 0)
      })
  }, [])

  useEffect(() => {
    console.log(current)
    let correct = 0
    questions[current]?.option?.map(opt => {
      if (opt.isCorrect) correct++
    })
    if (correct === 1) setIsMCQ(true)
  }, [current])

  const [content, setContent] = useState('');
  const [files, setFiles] = useState([]);

  function getFiles(files) {
    setFiles(files);
  }

  if (current >= questions.length) {
    return (
      <div className="">
        <Header/>
        <div className="min-h-[90vh] flex justify-center items-center flex-col">
          <img src={done} className="h-1/2 w-1/2"/>
          <p className="mt-4 font-semibold text-2xl">Assessment Attempted Successfully</p>
          <Button onClick={() => navigate('/')} variant='contained' style={{marginTop: '10px'}}>BACK TO
            DASHBOARD</Button>
        </div>
      </div>
    )
  }

  return (
    <React.Fragment>
      <Header/>
      <div className="bg-white flex flex-col items-center justify-center h-[90vh]">
        <div className="max-w-7xl py-8 px-4 sm:px-6 lg:py-16 lg:px-8 bg-slate-50 shadow w-full">
          <h2 className="text-sm tracking-tight text-gray-900 sm:text-xl font-bold">
            <span className="block">QUESTION {(current - 1 + 2)} :</span>
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
              >
                {
                  questions[current].option.map((opt) => {
                    return (<FormControlLabel value={opt.value} control={<BpRadio/>} label={opt.value}/>)
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
                    <div className="flex inline-flex justify-center items-center">
                      <Checkbox label={opt.value} value={opt.value} onChange={(e) => console.log(e.target.value)}
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
              <a
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                onClick={() => {
                  localStorage.setItem("current" + assessment.id, current - 1 + 2)
                  setCurrent(current - 1 + 2)
                  setContent('')
                }}
              >
                Next
              </a>
            </div>
          </div>

        </div>

      </div>
    </React.Fragment>
  )
}
