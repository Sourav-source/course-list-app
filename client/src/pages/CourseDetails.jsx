import React, { useEffect, useState } from "react";
import books from "../assets/books.jpg";
import SkeletonCard from "../components/SkeletonCard";
import { useDispatch, useSelector } from "react-redux";
import { getCourseDetailsThunk } from "../redux/courseDetailSlice";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useCollapse } from "react-collapsed";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
import { enrollCourse } from "../api";
import { motion } from "framer-motion";

const CourseDetails = () => {
  const location = useLocation();
  const [isExpanded, setExpanded] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });
  const params = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, course, error } = useSelector((state) => state.courseDetails);
  const { user } = useSelector((state) => state.loggedInUser);

  useEffect(() => {
    dispatch(getCourseDetailsThunk(params.id)).then((result) => {
      if (result.payload.status === 200) {
        toast.success("Course Details fetched successfully");
      } else {
        toast.error("Failed to fetch course details");
      }
    });
  }, [dispatch, params.id, location.pathname]);

  useEffect(() => {
    const loggedUserId = user?.id;

    course.students &&
      course.students.length > 0 &&
      course.students.forEach((student) => {
        if (student.id === loggedUserId) {
          setEnrolled(true);
        }
      });
  }, [location.pathname, user, course]);

  const enrollmenthandler = () => {
    const prevuser = course?.students ? course?.students : [];
    enrollCourse(prevuser, user, params.id)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Course Enrolled successfully");
          navigate("/enrolled-courses");
        } else {
          toast.error("Failed to enroll course");
        }
      })
      .finally(() => {
        dispatch(getCourseDetailsThunk(params.id));
      });
  };

  if (status === "loading") {
    return <>{Array(3).fill(<SkeletonCard />)}</>;
  }

  if (status === "failed") {
    return (
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
        {error}
      </motion.p>
    );
  }

  if (status === "succeeded") {
    return (
      <>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="card w-[512px] bg-neutral text-neutral-content my-2 rounded-md"
        >
          <div className="card-body flex flex-row gap-4">
            <img src={books} alt="logo" className="w-24 h-24 mt-2" />
            <div className="flex flex-col flex-1">
              <div className="flex items-center justify-between">
                <p className="text-base font-semibold text-rose-500">
                  {course.name}
                </p>
                <button
                  className="btn btn-active btn-accent mt-2 w-28 text-white font-semibold"
                  disabled={course.enrollmentstatus !== "Open" || enrolled}
                  onClick={enrollmenthandler}
                >
                  {course.enrollmentstatus === "Open" && !enrolled
                    ? "Enroll Now"
                    : course.enrollmentstatus === "Closed" && !enrolled
                    ? "Enrollment Closed"
                    : enrolled
                    ? "Enrolled !"
                    : "Enrollment Closed"}
                </button>
              </div>
              <p className="text-sm font-semibold">
                Instructor:{" "}
                <span className="font-medium text-xs">{course.instructor}</span>
              </p>
              <p className="text-sm font-semibold">
                Description:{" "}
                <span className="font-medium text-xs">
                  {course.description}
                </span>
              </p>
              <p className="text-sm font-semibold">
                Duration:{" "}
                <span className="font-medium text-xs">{course.duration}</span>
              </p>
              <p className="text-sm font-semibold">
                Schedule:{" "}
                <span className="font-medium text-xs">{course.schedule}</span>
              </p>
              <p className="text-sm font-semibold">
                Enrollment:{" "}
                <span
                  className={`font-bold text-xs ${
                    course.enrollmentstatus === "Open"
                      ? "text-emerald-500"
                      : "text-rose-500"
                  }`}
                >
                  {course.enrollmentstatus}
                </span>
              </p>
              <p className="text-sm font-semibold">
                Location:{" "}
                <span className="font-medium text-xs">{course.location}</span>
              </p>
              <p className="text-sm font-semibold">
                <span className="mr-2">Prerequisites:</span>
                {course.prerequisites.map((pre, i) => (
                  <span className="badge rounded-sm py-4 mt-2" key={i}>
                    {pre}
                  </span>
                ))}
              </p>
              <div>
                <button
                  className="hover:underline hover:text-rose-500 flex flex-row gap-2"
                  {...getToggleProps({
                    onClick: () => setExpanded((prevExpanded) => !prevExpanded),
                  })}
                >
                  <span>Syllabus:</span>
                  {isExpanded ? (
                    <MdKeyboardArrowDown className="mt-1.5" />
                  ) : (
                    <MdKeyboardArrowRight className="mt-1.5" />
                  )}
                </button>
                <section {...getCollapseProps()}>
                  <p className="text-sm font-semibold">
                    {course.syllabus.map((pre, i) => (
                      <span key={i}>
                        <span className="mr-2 text-rose-500">
                          Week {pre.week}:{" "}
                        </span>
                        <span className="text-blue-300">{pre.topic} --</span>
                        <span className="badge rounded-sm py-10 mt-2">
                          {pre.content}
                        </span>
                      </span>
                    ))}
                  </p>
                </section>
              </div>
            </div>
          </div>
        </motion.div>
      </>
    );
  }
};

export default CourseDetails;
