import React, {useEffect, useState} from "react";
import Card from '../components/card';
import {Header} from "../components/header";
import {useLocation, useParams} from "react-router-dom";
import Typography from "@mui/material/Typography";
import SettingsIcon from '@mui/icons-material/Settings';
import {IconButton} from "@mui/material";
import {Link} from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import CreateIndependentClassDialog from "../components/create-independent-class-dialog";
import Api from "../generic-services/api";
import {useDispatch} from "react-redux";
import {getDepartmentClasses} from "../redux/actions/user-actions";

export function DepartmentClasses() {
  const location = useLocation();
  const data = location.state?.data;
  const {id} = useParams();
  const dispatch = useDispatch();

  const [openCreateJoinClass, setOpenCreateJoinClass] = useState(false);

  const handleOpenCloseCreateJoinClass = () => {
    setOpenCreateJoinClass(!openCreateJoinClass);
  }

  const creatClassInDepartment = (name, description) => {
    Api.execute(`/departments/${id}/add-class`, 'post', {
      name: name,
      description: description
    }).then(res => {
      dispatch(getDepartmentClasses());
      setOpenCreateJoinClass(false);
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <React.Fragment>
      <CreateIndependentClassDialog open={openCreateJoinClass} handleClose={handleOpenCloseCreateJoinClass} creatClassInDepartment={creatClassInDepartment}/>
      <div className="min-w-[310px]">
        <Header isSideBarEnabled={false}/>
        <div className="mx-2 md:mx-16 flex flex-col md:px-8 xl:px-0">
          <main className="flex-1">
            <div className="flex justify-center">
              <div className="px-6 py-6 lg:w-5/6 max-w-[1500px]">

                <div className="px-4 sm:px-6 md:px-0">
                  <div className="mx-2 flex justify-between items-center">
                    <div>
                      <Typography gutterBottom variant="h3" component="h2">
                        {data.name}
                      </Typography>
                      <Typography gutterBottom variant="subtitle2" component="h2">
                        {data.institute.name}
                      </Typography>
                    </div>
                    <div>
                      <Link to={location.pathname + "/settings"}>
                        <IconButton>
                          <SettingsIcon/>
                        </IconButton>
                      </Link>
                      <IconButton onClick={handleOpenCloseCreateJoinClass}>
                        <AddIcon/>
                      </IconButton>
                    </div>
                  </div>
                  <div className="mt-10 flex flex-wrap gap-4 mt-6">
                    {data.class &&
                      data.class.map(item => (
                        <Card classId={item.id} className="mx-auto" key={item.id}
                              image={item.imageUrl ?? "./class.png"}
                              classname={item.name || item.class}
                              classsection={item.section} classdetails={item.description}
                        />
                      ))}

                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </React.Fragment>
  )
}
