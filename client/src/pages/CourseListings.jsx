import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCoursesThunk } from "../redux/courseSlice";
import CourseCard from "../components/CourseCard";
import toast from "react-hot-toast";
import SkeletonCard from "../components/SkeletonCard";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function CourseListings() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { status, courses, error } = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(getAllCoursesThunk()).then((result) => {
      if (result.payload.status === 200) {
        toast.success("Courses fetched successfully");
      } else {
        toast.error("Failed to fetch courses");
      }
    });
  }, [dispatch, location.pathname]);

  return (
    <>
      {status === "loading" ? (
        Array(8).fill(<SkeletonCard />)
      ) : status === "succeeded" ? (
        courses.map((course) => <CourseCard key={course.id} course={course} />)
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
          No Courses Found
        </motion.p>
      )}
    </>
  );
}
