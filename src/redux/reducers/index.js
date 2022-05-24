import {combineReducers} from "redux";
import {setRolesReducer, setClassesReducer, setUserReducer, setCurrentRoleReducer} from "./user-reducer";
import {setSignupUser, setSigninUser} from "./auth-reducer";
import {toasts} from './toast';
import {setClassParticipantsReducer} from './participants-reducer';
import  {setInstitutesRequests, setInstitutes, setDepartmentsInInstitute} from './institute_reducer'
import {setAttendances} from "./attendance-reducer";
import {setAssessments} from "./assessments-reducer";
import {setFeed} from "./feed-reducer";

const reducers = combineReducers({
  signup: setSignupUser,
  access_token: setSigninUser,
  roles: setRolesReducer,
  classes: setClassesReducer,
  participants: setClassParticipantsReducer,
  institute_requests: setInstitutesRequests,
  institutes: setInstitutes,
  departments: setDepartmentsInInstitute,
  attendances: setAttendances,
  assessments: setAssessments,
  user: setUserReducer,
  feed: setFeed,
  currentRole: setCurrentRoleReducer,
  toasts
});

export default reducers;
