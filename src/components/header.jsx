import React, {Fragment, useState} from "react";
import {
  BellIcon,
  MenuAlt2Icon,
} from "@heroicons/react/outline";
import {SearchIcon} from "@heroicons/react/solid";
import {Menu, Transition} from "@headlessui/react";
import Sidebar from "./sidebar";
import {useNavigate} from "react-router-dom";
import {IconButton} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function Header(props) {
  let navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const signOut = () => {
    localStorage.clear();
    navigate('/');
  }

  const hideShowSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  }

  const userNavigation = [
    { name: 'Your Profile', href: '#', click: '' },
    { name: 'Settings', href: '#', click: '' },
    { name: 'Sign out', href: '#', click: signOut },
  ]

  const addNavigation = [
    { name: 'Create class', href: '#', click: '' },
    { name: 'Create class in department', href: '#', click: '' },
    { name: 'Create institute', href: '#', click: '' },
    { name: 'Join class', href: '#', click: '' },
  ]

  return (
      <React.Fragment>
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
                <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
              </button>
          }
          <div className="flex-1 flex justify-end px-4 md:px-0 mx-4 md:mx-16">
            {props.isSearchEnabled &&
                <div className="flex-1 flex">
                  <form className="w-full flex md:ml-0" action="#" method="GET">
                    <label htmlFor="search-field" className="sr-only">
                      Search
                    </label>
                    <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                        <SearchIcon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <input
                          id="search-field"
                          className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                          placeholder="Search"
                          type="search"
                          name="search"
                      />
                    </div>
                  </form>
                </div>
            }
            <div className="ml-4 flex items-center md:ml-6 space-x-3">
              <Menu as="div" className="relative">
                <div>
                  <Menu.Button>
                    <span className="sr-only">Open user menu</span>
                    <IconButton type="button">
                      <span className="sr-only">View notifications</span>
                      <AddIcon className="h-6 w-6" aria-hidden="true" />
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
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none">
                    {addNavigation.map((item) => (
                        <Menu.Item key={item.name} onClick={item.click}>
                          {({ active }) => (
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
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </IconButton>

              {/* Profile dropdown */}
              <Menu as="div" className="ml-3 relative">
                <div>
                  <Menu.Button>
                    <span className="sr-only">Open user menu</span>
                    <IconButton>
                      <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
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
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none">
                    {userNavigation.map((item) => (
                        <Menu.Item key={item.name} onClick={item.click}>
                          {({ active }) => (
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
            </div>
          </div>
        </div>
      </React.Fragment>
  )
}
