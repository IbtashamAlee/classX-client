import React, {Fragment, useState} from "react";
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

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [classes, setClasses] = useState([
    {
      "_id": "60dcee2f8d30ee001526c72f",
      "name": "Programming Fundamentals",
      "userid": "60dcee0c8d30ee001526c72e",
      "section": "Section B",
      "details": "We will learn basics of programming",
      "image": "https://www.gstatic.com/classroom/themes/img_code.jpg"
    },
    {
      "_id": "60dcee568d30ee001526c730",
      "name": "Web Technologies",
      "userid": "60dcee0c8d30ee001526c72e",
      "section": "Section A",
      "details": "We will go through from MERN stack step by step with practical examples",
      "image": "https://www.gstatic.com/classroom/themes/img_code.jpg"
    },
    {
      "_id": "6122b679ee4fb7001570c69d",
      "name": "Pre 11th",
      "userid": "60dcee0c8d30ee001526c72e",
      "section": "B",
      "details": "ICS- Physics",
      "image": "https://www.gstatic.com/classroom/themes/img_code.jpg"
    },
    {
      "_id": "613218783c52b30015f5dffc",
      "name": "Test Class 3",
      "userid": "60dcee0c8d30ee001526c72e",
      "section": "C",
      "details": "None",
      "image": "https://www.gstatic.com/classroom/themes/img_code.jpg"
    }
  ]);

  const hideShowSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  }

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
                <div className="px-4 sm:px-6 md:px-0">
                  <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                </div>
                <div className="px-4 sm:px-6 md:px-0">
                  {/* Replace with your content */}
                  {/*<div className="py-4">*/}
                  {/*  <div className="h-96 border-4 border-dashed border-gray-200 rounded-lg" />*/}
                  {/*</div>*/}
                  {/* /End replace */}
                  <div className="flex flex-wrap gap-4 mt-6">
                    {classes.length ?
                        classes.map((item) => (
                            <Card classId={item._id} className="mx-auto" key={item._id} image={item.image} classname={item.name}
                                  classsection={item.section} classdetails={item.details}
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
