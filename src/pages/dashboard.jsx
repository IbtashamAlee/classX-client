import React, {useEffect, useState} from "react";
import Card from '../components/card';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {
  getDepartmentClasses,
  getInstituteClasses,
  getStudentTeacherClasses,
  clearClasses
} from "../redux/actions/user-actions";
import {Header} from "../components/header";

export function Dashboard() {
  const dispatch = useDispatch();
  const [role, setRole] = useState('');
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
      default:
        dispatch(getStudentTeacherClasses());
    }
  }, [dispatch, role]);

  return (
      <React.Fragment>
        <div>
          <Header isSideBarEnabled={false}/>
          <div className="mx-12 md:mx-16 flex flex-col md:px-8 xl:px-0">
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
                <div className="px-4 sm:px-6 md:px-0">
                  <div className="flex flex-wrap gap-4 mt-6">
                    {classes ?
                        classes.map((item) => (
                            <Card classId={item.id} className="mx-auto" key={item.id} image={"./class.png"} classname={item.name || item.class}
                                  classsection={item.section} classdetails={item.description}
                            />
                        )) : <div>No Classes Found</div>
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
