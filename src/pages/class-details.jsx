import React, {useState} from "react";
import Sidebar from "../components/sidebar";
import {Outlet} from "react-router-dom";
import {Header} from "../components/header";

export function ClassDetails (props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const hideShowSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  }
  return (
      <div>
        <Header isSideBarEnabled={true}/>
        <div>
          <Sidebar isOpen={sidebarOpen} setSidebarOpen={hideShowSidebar}/>
        </div>
        <div className="md:ml-64 md:px-6">
          <div className="text-gray-900 text-2xl font-medium py-4">Attendance</div>
          <Outlet/>
        </div>
      </div>
  )
}
