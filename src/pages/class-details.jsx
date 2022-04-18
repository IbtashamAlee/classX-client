import React, {useState} from "react";
import Sidebar from "../components/sidebar";
import {Link, Outlet, useLocation} from "react-router-dom";
import {Header} from "../components/header";

export function ClassDetails (props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const hideShowSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  }
  return (
      <div>
        <Header isSideBarEnabled={true}/>
        <div>
          <Sidebar isOpen={sidebarOpen} setSidebarOpen={hideShowSidebar}/>
        </div>
        <div className="md:ml-64">
          <div>This is class details page</div>
          <Link to={`${location.pathname}/assessments`}>Home</Link>
          <Outlet/>
        </div>
      </div>
  )
}
