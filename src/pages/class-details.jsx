import React, {useEffect, useState} from "react";
import Sidebar from "../components/sidebar";
import {Outlet, useLocation, useParams} from "react-router-dom";
import {Header} from "../components/header";
import {useDispatch} from "react-redux";
import {clearFeed} from "../redux/actions/feed-actions";

export function ClassDetails (props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  let dispatch = useDispatch()
  const hideShowSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  }

  let location = useLocation();
  let state = location.state;

  useEffect(() => {
    return () => {
      dispatch(clearFeed());
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
