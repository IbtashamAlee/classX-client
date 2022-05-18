import * as React from "react";
import {Routes, Route, Outlet, Link} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {signinUser} from "./redux/actions/auth-actions";
import {About} from "./pages/about";
import {Signup} from "./pages/signup";
import {ThemeProvider, createTheme} from "@mui/material";
import {Signin} from "./pages/signin";
import {NotFound} from "./pages/not-found";
import {AccountVerify} from "./pages/account-verify";
import {ForgotPassword} from "./pages/forgot-password";
import CreateInstitute from "./components/request-institute";
import {Dashboard} from "./pages/dashboard";
import {ClassDetails} from "./pages/class-details"
import {Feed} from "./pages/feed";
import {Assessments} from "./pages/assessments";
import Attendance from "./pages/attendance";
import {Participants} from "./pages/participants";
import {AuthorizedRoute, EnrouteToDashboard} from "./generic-services/authorized-routes";
import {Loader} from "./components/loader";
import ClassSettings from "./pages/class-settings";
import {CreateAssessment} from "./pages/create-assessment";

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch({
    //     type: "SET_USER_ACTION",
    //     hi: "hi",
    // });
    dispatch(signinUser());
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
        <Loader/>
        <Routes>
          <Route path="/" element={<EnrouteToDashboard> <Layout/> </EnrouteToDashboard>}>
            <Route index element={<Home/>}/>
            <Route path="about" element={<About/>}/>
            {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}

          </Route>
          <Route path="/class-details/:id" element={<AuthorizedRoute> <ClassDetails/> </AuthorizedRoute>}>
            <Route index element={<AuthorizedRoute> <Feed/> </AuthorizedRoute>}/>
            <Route path="assessments" element={<AuthorizedRoute> <Assessments/> </AuthorizedRoute>}/>
            <Route path="attendances" element={<AuthorizedRoute> <Attendance/> </AuthorizedRoute>}/>
            <Route path="participants" element={<AuthorizedRoute> <Participants/> </AuthorizedRoute>}/>
            <Route path="settings" element={<AuthorizedRoute> <ClassSettings/> </AuthorizedRoute>}/>

            <Route path="*" element={<NotFound/>}/>
          </Route>
          <Route path="signup" element={<EnrouteToDashboard> <Signup/> </EnrouteToDashboard>}/>
          <Route path="signin" element={<EnrouteToDashboard> <Signin/> </EnrouteToDashboard>}/>
          <Route path="dashboard" element={<AuthorizedRoute> <Dashboard/> </AuthorizedRoute>}/>
          <Route path="/assessment/create" element={<AuthorizedRoute> <CreateAssessment/> </AuthorizedRoute>}/>
          <Route path="verify" element={<AccountVerify/>}/>
          <Route path="institute/request" element={ <AuthorizedRoute> <CreateInstitute/> </AuthorizedRoute>}/>
          <Route path="forgot-password" element={<EnrouteToDashboard> <ForgotPassword/> </EnrouteToDashboard>}/>
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
              <Link to="/institute/request">Request institute</Link>
            </li>
            <li>
              <Link to="/verify">Verify page</Link>
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
