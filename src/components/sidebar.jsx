import React, {useState} from 'react';
import PollIcon from '@mui/icons-material/Poll';
import FeedIcon from '@mui/icons-material/Feed';
import QuizIcon from '@mui/icons-material/Quiz';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';

import {Link} from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Sidebar(props) {
  const [navigation, setNavigation] = useState([
    {name: 'Feed', href: ``, icon: FeedIcon, current: true},
    {name: 'Assessments', href: `assessments`, icon: QuizIcon, current: false},
    {name: 'Attendances', href: `attendances`, icon: PersonIcon, current: false},
    {name: 'Polls', href: `polls`, icon: PollIcon, current: false},
    {name: 'Participants', href: `participants`, icon: GroupIcon, current: false},
    {name: 'Settings', href: `settings`, icon: SettingsIcon, current: false},
  ])

  const changeNavigation = (name) => {
    navigation.forEach(n => {
      n.current = n.name === name;
    })
    props.setSidebarOpen();
  }

  return (
      <>
        <div>
          {/*<Transition.Root show={props.isOpen} as={Fragment}>*/}
          {/*  <Dialog as="div" className="fixed inset-0 z-40 flex md:hidden" onClose={props.setSidebarOpen}>*/}
          {/*    <Transition.Child*/}
          {/*        as={Fragment}*/}
          {/*        enter="transition-opacity ease-linear duration-300"*/}
          {/*        enterFrom="opacity-0"*/}
          {/*        enterTo="opacity-100"*/}
          {/*        leave="transition-opacity ease-linear duration-300"*/}
          {/*        leaveFrom="opacity-100"*/}
          {/*        leaveTo="opacity-0"*/}
          {/*    >*/}
          {/*      <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75"/>*/}
          {/*    </Transition.Child>*/}
          {/*    <Transition.Child*/}
          {/*        as={Fragment}*/}
          {/*        enter="transition ease-in-out duration-300 transform"*/}
          {/*        enterFrom="-translate-x-full"*/}
          {/*        enterTo="translate-x-0"*/}
          {/*        leave="transition ease-in-out duration-300 transform"*/}
          {/*        leaveFrom="translate-x-0"*/}
          {/*        leaveTo="-translate-x-full"*/}
          {/*    >*/}
          {/*      <div className="relative max-w-xs w-full bg-white pt-5 pb-4 flex-1 flex flex-col">*/}
          {/*        <Transition.Child*/}
          {/*            as={Fragment}*/}
          {/*            enter="ease-in-out duration-300"*/}
          {/*            enterFrom="opacity-0"*/}
          {/*            enterTo="opacity-100"*/}
          {/*            leave="ease-in-out duration-300"*/}
          {/*            leaveFrom="opacity-100"*/}
          {/*            leaveTo="opacity-0"*/}
          {/*        >*/}
          {/*          <div className="absolute top-0 right-0 -mr-12 pt-2">*/}
          {/*            <button*/}
          {/*                type="button"*/}
          {/*                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"*/}
          {/*                onClick={() => props.setSidebarOpen(false)}*/}
          {/*            >*/}
          {/*              <span className="sr-only">Close sidebar</span>*/}
          {/*              <XIcon className="h-6 w-6 text-white" aria-hidden="true"/>*/}
          {/*            </button>*/}
          {/*          </div>*/}
          {/*        </Transition.Child>*/}
          {/*        <div className="flex-shrink-0 px-4 flex items-center">*/}
          {/*          <img*/}
          {/*              className="h-14 w-auto"*/}
          {/*              src={window.location.origin + '/logo.svg'}*/}
          {/*              alt="ClassX"*/}
          {/*          />*/}
          {/*        </div>*/}
          {/*        <div className="mt-5 flex-1 h-0 overflow-y-auto">*/}
          {/*          <nav className="px-2 space-y-1">*/}
          {/*            {navigation.map((item) => (*/}
          {/*                <Link to={item.href} key={item.name} onClick={() => {changeNavigation(item.name)}}>*/}
          {/*                  <span*/}
          {/*                      className={classNames(*/}
          {/*                          item.current*/}
          {/*                              ? 'bg-gray-100 text-gray-900'*/}
          {/*                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',*/}
          {/*                          'group rounded-md py-2 px-2 flex items-center text-base font-medium'*/}
          {/*                      )}*/}
          {/*                  >*/}
          {/*                  <item.icon*/}
          {/*                      className={classNames(*/}
          {/*                          item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',*/}
          {/*                          'mr-4 flex-shrink-0 h-6 w-6'*/}
          {/*                      )}*/}
          {/*                      aria-hidden="true"*/}
          {/*                  />*/}
          {/*                    {item.name}*/}
          {/*                </span>*/}
          {/*                </Link>*/}
          {/*            ))}*/}
          {/*          </nav>*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    </Transition.Child>*/}
          {/*    <div*/}
          {/*        className="flex-shrink-0 w-14">/!* Dummy element to force sidebar to shrink to fit close icon *!/</div>*/}
          {/*  </Dialog>*/}
          {/*</Transition.Root>*/}

          {/* Static sidebar for desktop */}
          <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="border-r border-gray-200 pt-5 flex flex-col flex-grow bg-white overflow-y-auto">
              <div className="flex-shrink-0 px-4 flex items-center">
                <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                    alt="Workflow"
                />
              </div>
              <div className="flex-grow mt-5 flex flex-col">
                <nav className="flex-1 px-2 pb-4 space-y-1">
                  {navigation.map((item) => (
                      <Link
                          key={item.name}
                          to={item.href}
                          onClick={() => {changeNavigation(item.name)}}
                      >
                        <span
                            className={classNames(
                                item.current ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                'group rounded-md py-2 px-2 flex items-center text-sm font-medium'
                            )}
                        >
                          <item.icon
                              className={classNames(
                                  item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                                  'mr-3 flex-shrink-0 h-6 w-6'
                              )}
                              aria-hidden="true"
                          />
                          {item.name}
                        </span>
                      </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </>
  )
}
