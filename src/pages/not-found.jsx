import React from "react";
import {Button} from "@mui/material";
import {Link} from "react-router-dom"

export function NotFound() {
  return (
      <>
        <div className="min-h-full pt-16 pb-12 flex flex-col bg-white">
          <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex-shrink-0 flex justify-center">
              <a href="/" className="inline-flex">
                <span className="sr-only">Workflow</span>
                <img
                    className="h-48 w-auto"
                    src="../logo.svg"
                    alt=""
                />
              </a>
            </div>
            <div className="py-16">
              <div className="text-center">
                <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">404 error</p>
                <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">Page not found.</h1>
                <p className="mt-2 text-base text-gray-500">Sorry, we couldn’t find the page you’re looking for.</p>
                <div className="mt-6">
                  <Link to="/">
                    <Button variant="text">
                      Go back home<span aria-hidden="true"> &rarr;</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </>
  )
}
