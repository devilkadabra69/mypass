import React, { useState } from "react";
import { InputComp, ButtonComp, Logo } from "../components/index";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Auth from "../appwrite/Auth";
import { useDispatch } from "react-redux";
import { login } from "../store/AuthSlice";

function Signup() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const create = async (data) => {
    setError(""); // Clear previous error
    try {
      const userData = await Auth.createAccount(data);
      if (userData) {
        const userdata = await Auth.getCurrentUser();
        if (userdata) {
          dispatch(login(userdata));
          navigate("/");
        }
      }
    } catch (error) {
      // Ensure error is a string
      setError(error.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        <div className="mb-2 flex justify-center items-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo
              width="100%"
              height="100%"
              className="mx-auto"
              src="./src/assets/main-logo.svg"
            />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">
            <InputComp
              label="Full Name: "
              placeholder="Enter your full name"
              {...register("name", { required: true })}
            />
            <InputComp
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <InputComp
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: true })}
            />
            <ButtonComp
              children="Create Account"
              type="submit"
              className="hover:text-pink-600 hover:bg-white font-bold outline-none px-4 py-2 rounded whitespace-nowrap transition-all duration-200 ease-in-out bg-gray-600 text-pink-500 mt-4"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
