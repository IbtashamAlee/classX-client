import React, {useEffect, useState} from "react";
import Card from '../components/card';
import {Header} from "../components/header";
import {useLocation} from "react-router-dom";
import Typography from "@mui/material/Typography";
import SettingsIcon from '@mui/icons-material/Settings';
import {IconButton} from "@mui/material";
import {Link} from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';

export function InstituteDepartments() {
  const location = useLocation();
  const data = location.state?.data

  return (
    <React.Fragment>
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
                    </div>
                    <Link to={location.pathname + "/settings"}>
                      <IconButton>
                        <AddIcon/>
                      </IconButton>
                      <IconButton>
                        <SettingsIcon/>
                      </IconButton>
                    </Link>
                  </div>
                  <div className="mt-10 flex flex-wrap gap-4 mt-6">
                    {data.departments &&
                      data.departments.map(item => (
                        <Card classId={item.id} className="mx-auto" key={item.id}
                              pathname ={'/department/'+item.id+'/settings'}
                              image={item.imageUrl ?? "./class.png"}
                              classname={item.name || item.class}
                              classsection={item.section} classdetails={item?.institute?.name}
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
