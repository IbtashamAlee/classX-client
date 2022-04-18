import React, {Fragment, useEffect, useState} from "react";
import Sidebar from "../components/sidebar";
import Card from '../components/card'
import {
  BellIcon,
  CalendarIcon, ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  MenuAlt2Icon,
  UsersIcon
} from "@heroicons/react/outline";
import {SearchIcon} from "@heroicons/react/solid";
import {Menu, Transition} from "@headlessui/react";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {
  getRoles,
  getDepartmentClasses,
  getInstituteClasses,
  getStudentTeacherClasses,
  clearClasses
} from "../redux/actions/user-actions";

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function Dashboard() {
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [role, setRole] = useState('');
  let roles = useSelector((state => state.roles.roles));
  let classes = useSelector((state => state.classes.classes));

  const hideShowSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  }

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
        {/*<Sidebar isOpen={sidebarOpen} setSidebarOpen={hideShowSidebar}/>*/}
        <div className="">
          <div className="mx-12 md:mx-16 flex flex-col md:px-8 xl:px-0">
            <div className="sticky top-0 z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 flex">
              {/*<button*/}
              {/*    type="button"*/}
              {/*    className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"*/}
              {/*    onClick={() => setSidebarOpen(true)}*/}
              {/*>*/}
              {/*  <span className="sr-only">Open sidebar</span>*/}
              {/*  <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />*/}
              {/*</button>*/}
              <div className="flex-1 flex justify-end px-4 md:px-0">
                {/*<div className="flex-1 flex">*/}
                {/*  <form className="w-full flex md:ml-0" action="#" method="GET">*/}
                {/*    <label htmlFor="search-field" className="sr-only">*/}
                {/*      Search*/}
                {/*    </label>*/}
                {/*    <div className="relative w-full text-gray-400 focus-within:text-gray-600">*/}
                {/*      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">*/}
                {/*        <SearchIcon className="h-5 w-5" aria-hidden="true" />*/}
                {/*      </div>*/}
                {/*      <input*/}
                {/*          id="search-field"*/}
                {/*          className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"*/}
                {/*          placeholder="Search"*/}
                {/*          type="search"*/}
                {/*          name="search"*/}
                {/*      />*/}
                {/*    </div>*/}
                {/*  </form>*/}
                {/*</div>*/}
                <div className="ml-4 flex items-center md:ml-6">
                  <button
                      type="button"
                      className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span className="sr-only">Open user menu</span>
                        <img
                            className="h-8 w-8 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                        />
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
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none">
                        {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                  <a
                                      href={item.href}
                                      className={classNames(
                                          active ? 'bg-gray-100' : '',
                                          'block py-2 px-4 text-sm text-gray-700'
                                      )}
                                  >
                                    {item.name}
                                  </a>
                              )}
                            </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <main className="flex-1">
              <div className="py-6">
                <div className="px-4 sm:px-6 md:px-0 md:flex md:justify-between">
                  <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
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
                            <Card classId={item.classId} className="mx-auto" key={item.classId} image={"./class.png"} classname={item.name || item.class}
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
