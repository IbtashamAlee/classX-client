import React, {useEffect, useState} from "react";
import Card from '../components/card';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {
  getDepartmentClasses,
  getInstituteClasses,
  getStudentTeacherClasses,
  clearClasses, getRoles
} from "../redux/actions/user-actions";
import {Header} from "../components/header";
import {getInstitutes} from "../redux/actions/institute-actions";
import {InstitutesTable} from "../components/institutes-table";

export function Dashboard() {
  const dispatch = useDispatch();
  const [role, setRole] = useState('Teacher');
  let roles = useSelector((state => state.roles.roles));
  let classes = useSelector((state => state.classes.classes));

  useEffect(() => {
    dispatch(clearClasses());
    switch (role) {
      case "DepartmentAdmin":
        dispatch(getDepartmentClasses());
        break;
      case "InstituteAdmin":
        dispatch(getInstituteClasses());
        break;
      case "Teacher":
        dispatch(getStudentTeacherClasses());
        break;
      case "SystemAdmin":
        dispatch(getInstitutes());
        break;
      default:
        dispatch(getStudentTeacherClasses());
    }
  }, [dispatch, role]);

  useEffect(() => {
    dispatch(getRoles());
  }, [])

  return (
      <React.Fragment>
        <div>
          <Header isSideBarEnabled={false}/>
          <div className="mx-2 md:mx-16 flex flex-col md:px-8 xl:px-0">
            <main className="flex-1">
              <div className="py-6">
                <div className="px-4 sm:px-6 md:px-0 md:flex md:justify-between">
                  <h1 className="text-2xl font-semibold text-gray-900 my-auto">Dashboard</h1>
                  <div className="w-64 mt-4 md:mt-0">
                    <FormControl fullWidth variant="filled">
                      <InputLabel id="demo-simple-select-label">Selected Role</InputLabel>
                      <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={role}
                          label="Select Country"
                          onChange={event => {setRole(event.target.value)}}
                      >
                        {roles && roles.map((r) => (
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
                        {classes &&
                            classes.map((ins) => (
                                <div key={ins.id}>
                                  <h1 className="text-lg font-medium text-gray-700">Departments under institute {ins.name}</h1>
                                  {ins.departments &&
                                      ins.departments.map((dept) => (
                                          <div key={dept.id} className="px-2">
                                            <h1 className="text-md font-medium text-gray-500">&bull; Classes under department {dept.name}</h1>
                                            <div className="flex flex-wrap gap-4 my-6 px-4">
                                              {dept.class && dept.class.length ?
                                                  dept.class.map((item) => (
                                                      <Card classId={item.id} className="mx-auto" key={item.id} image={"./class.png"} classname={item.name || item.class}
                                                            classsection={item.section} classdetails={item.description}
                                                      />
                                                  )) : <div>No class found under {dept.name} department :(</div>
                                              }
                                            </div>
                                          </div>
                                      ))
                                  }
                                </div>
                            ))
                        }
                      </div>
                  }
                  {
                      role && role === 'DepartmentAdmin' &&
                      <div>
                        {classes &&
                            classes.map((dept) => (
                                <div key={dept.id}>
                                  <h1 className="text-lg font-medium text-gray-700">&bull; Classes under department {dept.name}</h1>
                                  <div className="flex flex-wrap gap-4 my-6 px-4">
                                    {dept.class && dept.class.length ?
                                        dept.class.map((item) => (
                                            <Card classId={item.id} className="mx-auto" key={item.id} image={"./class.png"} classname={item.name || item.class}
                                                  classsection={item.section} classdetails={item.description}
                                            />
                                        )) : <div>No class found under {dept.name} department :(</div>
                                    }
                                  </div>
                                </div>
                            ))
                        }
                      </div>
                  }
                  {role && (role === 'Teacher' || role === "Student") &&
                      <div className="flex flex-wrap gap-4 mt-6">
                        {classes ?
                            classes.map((item) => (
                                <Card classId={item.id} className="mx-auto" key={item.id} image={"./class.png"} classname={item.name || item.class}
                                      classsection={item.section} classdetails={item.description}
                                />
                            )) : <div>No Classes Found</div>
                        }
                      </div>
                  }
                </div>
              </div>
            </main>
          </div>
        </div>
      </React.Fragment>
  )
}
