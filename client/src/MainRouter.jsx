import { Routes, Route } from "react-router-dom";

import Home from "./components/Home.jsx";
import About from "./components/about.jsx";
import Contact from "./components/contact.jsx";
import Project from "./components/project.jsx";
import Services from "./components/services.jsx";

import Signup from "./user/Signup.jsx";
import Signin from "./auth/Signin.jsx";
import Users from "./user/Users.jsx";
import Profile from "./user/Profile.jsx";    

import EducationForm from "./components/EducationForm.jsx";
import PrivateRoute from "./lib/PrivateRoute.jsx";

export default function MainRouter() {
  return (
    <Routes>
      {/* Public pages */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<Services />} />

      {/* Still public routes, but the NAV only shows them when logged in */}
      <Route
        path="/project"
        element={
          <PrivateRoute>
            <Project />
          </PrivateRoute>
        }
      />
      <Route
        path="/education"
        element={
          <PrivateRoute>
            <EducationForm />
          </PrivateRoute>
        }
      />

      {/* Auth pages */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />

      {/* Users – only for logged-in admins; PrivateRoute guards it */}
      <Route
        path="/users"
        element={
          <PrivateRoute>
            <Users />
          </PrivateRoute>
        }
      />
         <Route
        path="/user/:userId"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
