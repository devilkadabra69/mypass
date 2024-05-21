import React, { useState } from "react";
import { InputComp, ButtonComp, Logo } from "../components/index.js";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Auth from "../appwrite/Auth.js";
import { login } from "../store/AuthSlice.js";

function Login() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onLogin = async (data) => {
    setError("");
    try {
      const session = await Auth.login(data);
      if (session) {
        console.log("Logged in successfully:", session);
        const userData = await Auth.getCurrentUser();
        if (userData) {
          console.log("User data:", userData);
          dispatch(login(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message || "An unexpected error occurred.");
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-auto min-h-screen">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo
              height="100%"
              width="100%"
              className="mx-auto"
              src="./src/assets/main-logo.svg"
            />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
        <form className="mt-8" onSubmit={handleSubmit(onLogin)}>
          <div className="space-y-5">
            <InputComp
              label="Email: "
              type="email"
              className="mt-4"
              {...register("email", { required: true })}
            />
            <InputComp
              label="Password: "
              type="password"
              className="mt-4"
              {...register("password", { required: true })}
            />
            <ButtonComp
              children="Log In"
              type="submit"
              className="hover:text-pink-600 hover:bg-white font-bold outline-none px-4 py-2 rounded whitespace-nowrap transition-all duration-200 ease-in-out bg-gray-600 text-pink-500 mt-4"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
