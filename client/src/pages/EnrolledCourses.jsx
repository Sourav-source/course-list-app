import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCoursesThunk } from "../redux/courseSlice";
import toast from "react-hot-toast";
import SkeletonCard from "../components/SkeletonCard";
import CourseCard from "../components/CourseCard";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const EnrolledCourses = () => {
  const location = useLocation();
  const [filteredCourses, setFilteredCourses] = useState([]);

  const dispatch = useDispatch();
  const { status, courses, error } = useSelector((state) => state.course);
  const { user } = useSelector((state) => state.loggedInUser);

  useEffect(() => {
    dispatch(getAllCoursesThunk()).then((result) => {
      if (result.payload.status === 200) {
        toast.success("Courses fetched successfully");
      } else {
        toast.error("Failed to fetch courses");
      }
    });
  }, [dispatch, location.pathname]);

  useEffect(() => {
    setFilteredCourses([]);
    const loggedUserId = user?.id;

    courses &&
      courses.length > 0 &&
      courses.forEach((mycourse) => {
        if (mycourse.students && mycourse.students.length > 0) {
          mycourse.students.forEach((student) => {
            if (student.id === loggedUserId) {
              // iterate here
              setFilteredCourses((prevCourses) => [...prevCourses, mycourse]);
              console.log(filteredCourses, "mycourse");
            }
          });
        }
      });
  }, [courses, user, location.pathname]);

  return (
    <>
      {status === "loading" ? (
        Array(4).fill(<SkeletonCard />)
      ) : status === "succeeded" &&
        filteredCourses &&
        filteredCourses.length > 0 ? (
        filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))
      ) : (
        <motion.p
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="text-center my-auto text-rose-700 font-bold text-lg"
        >
          You have not enrolled in any courses
        </motion.p>
      )}
    </>
  );
};

export default EnrolledCourses;
