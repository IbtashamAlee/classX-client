import React, {useEffect, useState} from "react";
import Sidebar from "../components/sidebar";
import {Outlet, useLocation, useParams} from "react-router-dom";
import {Header} from "../components/header";
import {useDispatch} from "react-redux";
import {clearFeed} from "../redux/actions/feed-actions";
import Api from "../generic-services/api";
import {removeCurrentClass, removeCurrentRole, setCurrentClass, setCurrentRole} from "../redux/actions/user-actions";

export function ClassDetails (props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  let dispatch = useDispatch()
  const hideShowSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  }

  let location = useLocation();
  let state = location.state;

  let {id} = useParams();

  const getCurrentClass = () => {
    Api.execute('/api/class/' + id).then(res => {
      dispatch(setCurrentClass(res.data))
      dispatch(setCurrentRole(res.data?.role))
    }).catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    getCurrentClass();
    return () => {
      dispatch(clearFeed());
      dispatch(removeCurrentClass());
      dispatch(removeCurrentRole());
    }
  }, [])

  return (
      <div>
        <Header isSideBarEnabled={true}/>
        <div>
          {/*<Sidebar isOpen={sidebarOpen} setSidebarOpen={hideShowSidebar}/>*/}
        </div>
        <div className="md:ml-64 md:px-6 mx-4 md:mx-auto">
          <Outlet/>
        </div>
      </div>
  )
}
