import React, { useEffect } from "react";
import SkeletonCard from "../components/SkeletonCard";
import CourseCard from "../components/CourseCard";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getSearchedCoursesThunk } from "../redux/courseSlice";
import { useLocation, useParams } from "react-router-dom";

const SearchedCourses = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { status, courses, error } = useSelector((state) => state.course);
  const params = useParams();

  useEffect(() => {
    dispatch(getSearchedCoursesThunk(params.query)).then((result) => {
      if (result.payload.status === 200) {
        toast.success("Courses fetched successfully");
      } else {
        toast.error("Not Found");
      }
    });
  }, [dispatch, params.query, location.pathname]);

  if (status === "succeeded" && courses.length === 0) {
    return (
      <p className="text-center my-auto text-rose-700 font-bold text-lg">
        No Courses Found
      </p>
    );
  }

  return (
    <>
      {status === "loading" ? (
        Array(8).fill(<SkeletonCard />)
      ) : status === "succeeded" ? (
        courses.map((course) => <CourseCard key={course.id} course={course} />)
      ) : (
        <p className="text-center my-auto text-rose-700 font-bold text-lg">
          No Courses Found
        </p>
      )}
    </>
  );
};

export default SearchedCourses;
