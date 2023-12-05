import React, { useState } from "react";
import { GiBookshelf } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearUser } from "../redux/loggedinUserSlice";

export const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, user, error } = useSelector((state) => state.loggedInUser);

  const logoutHandler = () => {
    dispatch(clearUser());
  };

  const searchHandler = (e) => {
    e.preventDefault();
    searchQuery !== "" && navigate(`/searched-courses/${searchQuery}`);
    setSearchQuery("");
  };

  return (
    <div className="navbar px-4 sticky top-0 bg-base-300 z-10">
      <Link className="flex-1 text-xl font-bold text-white" to={"/"}>
        <span className="mr-2 text-emerald-300 cursor-pointer">
          <GiBookshelf size={30} />
        </span>
        Online Courses
      </Link>
      <div className="flex-none gap-2">
        <div className="form-control">
          <form onSubmit={searchHandler}>
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-[100%] md:w-auto"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
        {user === null ? (
          <Link
            to={"/login"}
            className="btn btn-active btn-accent text-white font-semibold"
          >
            Login
          </Link>
        ) : (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to={"/enrolled-courses"}>Enrolled Courses</Link>
              </li>
              <li onClick={logoutHandler}>
                <Link to={"/"}>Logout</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
