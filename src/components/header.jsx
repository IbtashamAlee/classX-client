import React, {Fragment, useEffect, useState} from "react";
import {
  BellIcon,
  MenuAlt2Icon,
} from "@heroicons/react/outline";
import {Menu, Transition} from "@headlessui/react";
import Sidebar from "./sidebar";
import {useNavigate} from "react-router-dom";
import {IconButton} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RequestInstituteDialog from "./request-institute-dialog";
import CreateIndependentClassDialog from "./create-independent-class-dialog";
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../redux/actions/user-actions";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function Header(props) {
  let navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openRequestInstituteDialog, setOpenRequestInstituteDialog] = useState(false);
  const [openCreateJoinClass, setOpenCreateJoinClass] = useState(false);
  const [joinClass, setJoinClass] = useState(false);

  const user = useSelector((state => state.user.user));

  const dispatch = useDispatch();

  const signOut = () => {
    localStorage.clear();
  }

  const hideShowSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  }

  const handleCloseRequestInstituteDialog = () => {
    setOpenRequestInstituteDialog(!openRequestInstituteDialog);
  }

  const handleOpenCloseCreateJoinClass = () => {
    setOpenCreateJoinClass(!openCreateJoinClass);
    if (joinClass) {
      setTimeout(() => {
        setJoinClass(false);
      }, 200);
    }
  }

  const handleJoinClassFeature = () => {
    setJoinClass(!joinClass);
    handleOpenCloseCreateJoinClass();
  }

  const userNavigation = [
    {name: 'My assessments', href: '/assessments', click: ''},
    {name: 'Messenger', href: '/messenger', click: ''},
    {name: 'Settings', href: '/profile', click: ''},
    {name: 'Sign out', href: '/', click: signOut}
  ]

  const addNavigation = [
    {name: 'Join class', href: '#', click: handleJoinClassFeature},
    {name: 'Create class', href: '#', click: handleOpenCloseCreateJoinClass},
    {name: 'Request institute', href: '#', click: handleCloseRequestInstituteDialog},
  ]

  useEffect(() => {
    dispatch(getUser());
  }, [])

  return (
    <React.Fragment>
      <CreateIndependentClassDialog open={openCreateJoinClass} handleClose={handleOpenCloseCreateJoinClass}
                                    isJoin={joinClass}/>
      <RequestInstituteDialog open={openRequestInstituteDialog} handleClose={handleCloseRequestInstituteDialog}/>
      {props.isSideBarEnabled &&
        <Sidebar isOpen={sidebarOpen} setSidebarOpen={hideShowSidebar}/>
      }

      <div className="sticky top-0 z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 flex">
        {props.isSideBarEnabled &&
          <button
            type="button"
            className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuAlt2Icon className="h-6 w-6" aria-hidden="true"/>
          </button>
        }
        <div
          className={`flex-1 flex justify-between px-4 md:px-0 mx-4 md:mx-16`}>
          <div className={`flex px-4 md:px-0 items-center`}>
            <ArrowBackIcon onClick={() => {navigate(-1);}} className={"text-gray-500"}/>
            <img className="hidden md:flex w-10 h-10 ml-4 mb-1" src={window.location.origin + '/logo.svg'} onClick={() => {
              navigate('/');
            }}/>
          </div>
          <div className="ml-4 flex items-center md:ml-6 space-x-3">
            <Menu as="div" className="relative">
              <div>
                <Menu.Button>
                  <span className="sr-only">Open user menu</span>
                  <IconButton type="button">
                    <span className="sr-only">View notifications</span>
                    <AddIcon className="h-6 w-6" aria-hidden="true"/>
                  </IconButton>
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none">
                  {addNavigation.map((item) => (
                    <Menu.Item key={item.name} onClick={item.click}>
                      {({active}) => (
                        <span
                          className={classNames(
                            active ? 'bg-gray-100' : '',
                            'block py-2 px-4 text-sm text-gray-700 select-none cursor-pointer'
                          )}
                        >
                                {item.name}
                              </span>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>

            <IconButton type="button">
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" aria-hidden="true"/>
            </IconButton>

            {/* Profile dropdown */}
            <Menu as="div" className="ml-3 relative">
              <div>
                <Menu.Button>
                  <span className="sr-only">Open user menu</span>
                  <IconButton>
                    <img
                      className="h-8 w-8 rounded-full"
                      src={user?.imageUrl ? user?.imageUrl: `${window.location.origin}/Sample_User_Icon.png`}
                      alt=""
                    />
                  </IconButton>
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none">
                  {userNavigation.map((item) => (
                    <Link to={item.href} key={item.href}>
                    <Menu.Item key={item.name} onClick={item.click}>
                      {({active}) => (
                        <span
                          className={classNames(
                            active ? 'bg-gray-100' : '',
                            'block py-2 px-4 text-sm text-gray-700 select-none cursor-pointer'
                          )}
                        >
                                {item.name}
                              </span>
                      )}
                    </Menu.Item>
                    </Link>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
