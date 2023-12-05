import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllUsersThunk } from "../redux/registeredUsersSlice";
import toast from "react-hot-toast";
import { setUser } from "../redux/loggedinUserSlice";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, users, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllUsersThunk());
  }, [dispatch]);

  const loginHandler = () => {
    const formdata = {
      email: email,
      user: null,
    };

    // Check if the email is already present in the users array
    const emailExists = users.some((user) => {
      if (user.email === email) {
        formdata.user = user;
        return true;
      }
      return false;
    });

    if (emailExists) {
      dispatch(setUser(formdata.user));
      toast.success("User Logged In successfully");
      navigate("/");
    } else {
      // Email does not exist, proceed with registration
      toast.error("User not found");
    }
  };

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <p className="text-xl font-bold text-rose-500 my-5">Login</p>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Email:</span>
        </div>
        <input
          type="email"
          placeholder="Enter email"
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Password:</span>
        </div>
        <input
          type="password"
          placeholder="Enter password"
          className="input input-bordered w-full max-w-xs"
        />
      </label>
      <button
        className="btn btn-active btn-accent w-full max-w-xs text-white font-semibold mt-8"
        onClick={loginHandler}
      >
        Login
      </button>
      <span className="text-sm mt-5">
        Don't have an account?{" "}
        <Link className="hover:text-rose-500" to="/register">
          Register
        </Link>
      </span>
    </motion.span>
  );
};

export default Login;
