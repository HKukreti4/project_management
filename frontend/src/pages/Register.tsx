import React, { useEffect, useState } from "react";
import { IoKey } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";

import { FaHome } from "react-icons/fa";
import axiosInstance from "../services/api";
import Swal from "sweetalert2";

const Register = () => {
  const [registerDetails, setRegisterDetails] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  useEffect(() => {
    const user = localStorage.getItem("user");

    // If user exists in localStorage, redirect to dashboard
    if (user) {
      navigate("/dashboard");
    }
  });
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await axiosInstance.post("/register", registerDetails);
      if (result) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully registered the user",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/login");
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: error?.response?.data?.message || "Something went wrong",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gray-950 relative">
      <div className="circle absolute top-0 left-0 w-52 h-52 rounded-full bg-emerald-300/20 blur-2xl"></div>
      <div className="circle absolute bottom-0 right-0 w-52 h-52 rounded-full bg-emerald-300/20 blur-2xl"></div>
      <div
        className="login-form bg-gray-900 py-18 px-8  rounded-md min-w-[20rem] md:min-w-[30rem] text-white relative
       overflow-hidden"
      >
        <div className="circle absolute -top-20 -right-10 w-52 h-52 rounded-full bg-blue-300/20  -z-0"></div>
        <div className="flex justify-center mb-2 items-center  mx-auto">
          <NavLink to={"/"}>
            <FaHome />
          </NavLink>
        </div>
        <h3 className="text-center text-2xl font-bold mb-2">Register</h3>
        <p className="text-sm mb-6 text-center">
          Enter your details to continue
        </p>
        <form
          className="flex flex-col gap-5 w-full text-white"
          onSubmit={(e) => handleRegister(e)}
        >
          <div className="">
            <label className=" w-full flex items-center gap-2 border-1 p-1 rounded-md">
              <MdOutlineMail />
              <input
                type="text"
                placeholder="Email"
                required
                name="email"
                className="w-full outline-none p-1 rounded-md"
                onChange={(e) => changeHandler(e)}
              />
            </label>
            <div className="validator-hint hidden ">
              Enter valid email address
            </div>
          </div>
          <div>
            <label className="input validator w-full flex items-center border-1 p-1 gap-2 rounded-md">
              <IoKey />
              <input
                type="password"
                className="w-full outline-none p-1 rounded-md"
                name="password"
                required
                placeholder="Password"
                onChange={(e) => changeHandler(e)}
                value={registerDetails.password}
              />
            </label>
          </div>
          <button
            className="btn bg-emerald-400 p-1  hover:bg-emerald-600 cursor-pointer rounded-md"
            type="submit"
          >
            Register
          </button>
        </form>
        <p className="mt-4">
          Already have and Account ?
          <NavLink to={"/login"} className="text-emerald-500 cursor-pointer">
            &nbsp; Login
          </NavLink>{" "}
        </p>
      </div>
    </div>
  );
};

export default Register;
