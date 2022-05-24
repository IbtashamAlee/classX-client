import React, {useEffect, useState} from "react";
import Card from '../components/card';
import {FormControl, IconButton, InputLabel, MenuItem, Select} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {
  getDepartmentClasses,
  getInstituteClasses,
  getStudentTeacherClasses,
  clearClasses, getRoles
} from "../redux/actions/user-actions";
import {Header} from "../components/header";
import {getInstituteRequests, getInstitutes} from "../redux/actions/institute-actions";
import {InstitutesTable} from "../components/institutes-table";
import {Link, useLocation, useNavigate} from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";

export function Dashboard() {
  const dispatch = useDispatch();
  const [role, setRole] = useState('Standard');
  let roles = useSelector((state => state.roles.roles));
  let classes = useSelector((state => state.classes.classes));

  let roles2 = [];

  if (roles && roles.length) {
    for (let i = 0; i < roles.length; i++) {
      if (roles[i] !== "Student" && roles[i] !== "Teacher") {
        roles2.push(roles[i])
      }
    }
    roles2.push("Standard");
    console.log(roles2)
  }

  let navigate = useNavigate();
  let location = useLocation();
  if(location.search) {
    let tab = location.search.split('=');
    console.log(tab)
  }

  useEffect(() => {
    dispatch(clearClasses());
    switch (role) {
      case "DepartmentAdmin":
        navigate('/dashboard?tab=DepartmentAdmin')
        dispatch(getDepartmentClasses());
        break;
      case "InstituteAdmin":
        navigate('/dashboard?tab=InstituteAdmin')
        dispatch(getInstituteClasses());
        break;
      case "Standard":
        navigate('/dashboard?tab=Teacher')
        dispatch(getStudentTeacherClasses());
        break;
      case "SystemAdmin":
        navigate('/dashboard?tab=SystemAdmin')
        dispatch(getInstitutes());
        dispatch(getInstituteRequests());
        break;
      default:
        dispatch(getStudentTeacherClasses());
    }
  }, [dispatch, role]);

  useEffect(() => {
    dispatch(getRoles());
  }, []);

  return (
    <React.Fragment>
      <div className="min-w-[310px]">
        <Header isSideBarEnabled={false}/>
        <div className="mx-2 md:mx-16 flex flex-col md:px-8 xl:px-0">
          <main className="flex-1">
            <div className="flex justify-center">
              <div className="py-6 lg:w-5/6 max-w-[1500px]">
                <div className="px-4 sm:px-6 md:px-0 md:flex md:justify-between">
                  <h1 className="text-2xl font-semibold text-gray-900 my-auto">Dashboard</h1>
                  <div className="w-64 mt-4 md:mt-0">
                    <FormControl fullWidth variant="filled">
                      <InputLabel className="md:ml-6" id="demo-simple-select-label">Selected Role</InputLabel>
                      <Select
                        className="md:ml-6"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={role}
                        label="Select Country"
                        onChange={event => {
                          setRole(event.target.value)
                        }}
                      >
                        {roles2 && roles2.map((r) => (
                          <MenuItem value={r} key={r}>{r}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>
                {
                  role && role === 'SystemAdmin' &&
                  <InstitutesTable/>
                }
                <div className="px-4 sm:px-6 md:px-0">
                  {
                    role && role === 'InstituteAdmin' &&
                      <div>
                        <div className={"flex justify-between mt-4"}>
                          <h1 className="text-xl font-semibold text-gray-900 my-auto">Institutes</h1>
                          <div>
                            <Link to={window.location.pathname + "/settings"}>
                              <IconButton>
                                <SettingsIcon/>
                              </IconButton>
                            </Link>
                            <IconButton>
                              <AddIcon/>
                            </IconButton>
                          </div>
                        </div>
                        <div className="mt-10 flex flex-wrap gap-4 mt-6">
                          {classes &&
                              classes.map(item => (
                                  <Card classId={item.id} className="mx-auto" key={item.id}
                                        pathname = {'/institute/' + item.id}
                                        state = {item}
                                        image={item.imageUrl ?? "./class.png"}
                                        classname={item.name || item.class}
                                  />
                              ))
                          }
                        </div>
                      </div>
                  }
                  {
                    role && role === 'DepartmentAdmin' &&
                    <div  className="mt-10 flex flex-wrap gap-4 mt-6">
                      {classes &&
                        classes.map((item) => (
                          <Card classId={item.id} className="mx-auto" key={item.id}
                                pathname ={'/department/' + item.id}
                                image={item.imageUrl ?? "./class.png"}
                                classname={item.name || item.class}
                                classsection={item.section} classdetails={item?.institute?.name}
                          />
                        ))
                      }
                    </div>
                  }
                  {role && (role === 'Standard') &&
                    <div className="flex flex-wrap gap-4 mt-6">
                      {classes ?
                        classes.map((item) => (
                          <Card classId={item.id} className="mx-auto" key={item.id}
                                image={item.imageurl ? item.imageurl : "./class.png"}
                                classname={item.name || item.class}
                                classsection={item.section}
                                role={item.role}
                          />
                        )) : <div>No Classes Found</div>
                      }
                    </div>
                  }
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </React.Fragment>
  )
}
