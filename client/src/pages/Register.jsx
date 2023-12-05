import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { getAllUsersThunk } from "../redux/registeredUsersSlice";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, users, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllUsersThunk());
  }, [dispatch]);

  const registerHandler = () => {
    const ID = uuidv4();
    const formdata = {
      id: ID,
      name: name,
      email: email,
    };

    // Check if the email is already present in the users array
    const emailExists = users.some((user) => user.email === email);

    if (emailExists) {
      // Email already exists
      toast.error("User already exists");
    } else {
      // Email does not exist, proceed with registration
      registerUser(formdata).then((response) => {
        if (response.status === 201 && response.data) {
          toast.success("New User Registered successfully");
          navigate("/login");
        }
      });
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
      <p className="text-xl font-bold text-rose-500 my-5">Register</p>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Name:</span>
        </div>
        <input
          type="text"
          placeholder="Enter name"
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => setName(e.target.value)}
        />
      </label>
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
        onClick={registerHandler}
      >
        Register
      </button>
      <span className="text-sm mt-5">
        Already have an account?{" "}
        <Link className="hover:text-rose-500" to="/login">
          Login
        </Link>
      </span>
    </motion.span>
  );
};

export default Login;
