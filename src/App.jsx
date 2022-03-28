import * as React from "react";
import {Routes, Route, Outlet, Link} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {getUser} from "./redux/actions/user-actions";
import {signupUser} from "./redux/actions/auth-actions";
import {About} from "./pages/about";
import {Signup} from "./pages/signup";
import {ThemeProvider, createTheme} from "@mui/material";
import {Signin} from "./pages/signin";
import {NotFound} from "./pages/not-found";
import {AccountVerify} from "./pages/account-verify";
import {ForgotPassword} from "./pages/forgot-password";

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch({
    //     type: "SET_USER_ACTION",
    //     hi: "hi",
    // });
    dispatch(getUser({hi: "hi payload"}));
  }, [dispatch]);

  const outerTheme = createTheme({
    palette: {
      primary: {
        light: '#8284f3',
        main: '#6366F1',
        dark: '#4547a8',
        contrastText: '#fff',
      },
    },
  });

  return (
    <ThemeProvider theme={outerTheme}>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="about" element={<About/>}/>
          <Route path="dashboard" element={<Dashboard/>}/>
          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}

        </Route>
        <Route path="signup" element={<Signup/>}/>
        <Route path="signin" element={<Signin/>}/>
        <Route path="verify" element={<AccountVerify/>}/>
        <Route path="forgot-password" element={<ForgotPassword/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </ThemeProvider>
  );
}

function Layout() {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/signin">Sign in</Link>
          </li>
          <li>
            <Link to="/signup">Sign up</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/nothing-here">Nothing Here</Link>
          </li>
        </ul>
      </nav>

      <hr/>

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet/>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}


function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
