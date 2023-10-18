import React, { useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/AppContext";

function Login() {
  const { loggedUser, setLoggedUser } = useContext(AppContext);

  const navigate = useNavigate();
  const formRef = useRef();
  const submitHandler = async (e) => {
    e.preventDefault();
    const userObj = {
      email: formRef.current.email.value,
      password: formRef.current.password.value,
    };

    e.preventDefault("");
    await axios({
      method: "post",
      url: "http://localhost:5000/api/user/getuser",
      data: userObj,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        const userInfo = response?.data.user[0];

        localStorage.setItem("userInfo", JSON.stringify(userInfo));

        localStorage.setItem("userEmail", userObj.email);
        localStorage.setItem("authToken", response?.data?.token);

        navigate("/chats");
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };
  return (
    <section className="bg-[var(--background)]">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto sm:h-screen ">
        <div className="w-full bg-white rounded-lg shadow sm:max-w-md ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Log in to your account
            </h1>
            <form
              ref={formRef}
              className="space-y-4 md:space-y-6"
              action="#"
              onSubmit={submitHandler}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>

              <button
                type="submit"
                className="w-full text-black bg-primary-600 hover:bg-[var(--background)] hover:text-white py-2 rounded-lg"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
