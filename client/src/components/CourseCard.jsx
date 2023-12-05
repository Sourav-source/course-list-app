import React from "react";
import { useNavigate } from "react-router-dom";
import books from "../assets/books.jpg";
import { motion } from "framer-motion";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className="card w-[512px] bg-neutral text-neutral-content my-2 rounded-md"
      key={course.id}
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
              onClick={() => navigate(`/course/${course.id}`)}
            >
              View Details
            </button>
          </div>
          <p className="text-sm font-semibold">
            Instructor:{" "}
            <span className="font-medium text-xs">{course.instructor}</span>
          </p>
          <p className="text-sm font-semibold">
            Description:{" "}
            <span className="font-medium text-xs">{course.description}</span>
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
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
