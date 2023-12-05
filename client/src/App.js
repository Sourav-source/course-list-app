import React, { useEffect } from "react";
import { Navbar } from "./components/Navbar";
import CourseListings from "./pages/CourseListings";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import CourseDetails from "./pages/CourseDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EnrolledCourses from "./pages/EnrolledCourses";
import SearchedCourses from "./pages/SearchedCourses";

export default function App() {
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
      <Navbar />
      <div className="flex flex-col items-center justify-start body-screen mt-2 display-block">
        <Routes>
          <Route path="/" element={<CourseListings />} />
          <Route path="/course/:id" element={<CourseDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/enrolled-courses" element={<EnrolledCourses />} />
          <Route path="*" element={<p className="text-center my-auto text-rose-700 font-bold text-lg">404 Not Found !</p>} />
          <Route path="/searched-courses/:query" element={<SearchedCourses />} />
        </Routes>
      </div>
    </>
  );
}
