import React from "react";
import Link from "next/link";
import axios from "axios";
import Router from "next/router";
export default function Example() {
  const [isPasswordViewed, setIsPasswordViewed] = React.useState(false);
  const [isPasswordViewed2, setIsPasswordViewed2] = React.useState(false);
  const [formSignup, setFormSignUp] = React.useState({
    userName: "",
    userRole: "QuanLi",
    userEmail: "",
    userPassword: "",
  });

  const formSignUpFecth = async (data: object) => {
    try {
      let result = await axios
        .post("/api/userApi/signup", data)
        .then((result) => {})
        .catch((err) => {});
    } catch (err) {}
  };
  return (
    <>
      <div className="m-auto h-screen  ">
        <div className="flex min-h-full items-center justify-center  sm:px-6 lg:px-8">
          <div
            className=" border-none  shadow-2xl"
            style={{
              width: "546px",
              padding: "32px 57px 61px 57px",
              borderRadius: 4,
            }}
          >
            <div className="w-full max-w-md space-y-6 h-full">
              <div>
                <h2
                  className="text-center"
                  style={{
                    fontWeight: 800,
                    fontSize: "22px",
                    lineHeight: "30px",
                    color: " #006C84",
                  }}
                >
                  SIGN UP
                </h2>
              </div>

              <div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                  className=" mt-5  space-y-6"
                  action="#"
                  method="POST"
                >
                  <div className="">
                    <div className="py-3">
                      <label htmlFor="email-address" className="sr-only">
                        Email
                      </label>
                      <input
                        id="email-address"
                        name="userEmail"
                        type="email"
                        autoComplete="email"
                        required
                        onChange={(e) => {
                          setFormSignUp({
                            ...formSignup,
                            userEmail: e.target.value,
                          });
                        }}
                        className="relative block w-full placeholder-gray-300 border border-gray-300 px-7 py-2 text-gray-900 focus:z-10  focus:outline-none sm:text-sm rounded-md shadow-sm"
                        placeholder="Email"
                        style={{ borderRadius: 4 }}
                      />
                    </div>
                    <div className="py-3 showPassWord">
                      <label htmlFor="password" className="sr-only">
                        Password
                      </label>
                      <input
                        id="password"
                        name="userPassword"
                        onChange={(e) => {
                          setFormSignUp({
                            ...formSignup,
                            userPassword: e.target.value,
                          });
                        }}
                        type={isPasswordViewed ? "text" : "password"}
                        autoComplete="current-password"
                        required
                        className="relative block w-full border placeholder-gray-300 border-gray-300 px-7 py-2 text-gray-900  focus:z-10 focus:outline-none sm:text-sm rounded-md shadow-sm"
                        placeholder="Password"
                        style={{ borderRadius: 4 }}
                      />
                      <span>
                        <img
                          id="on"
                          onClick={() => {
                            setIsPasswordViewed(!isPasswordViewed);
                          }}
                          src={
                            isPasswordViewed
                              ? "show-pass.svg"
                              : "no-show-pass.svg"
                          }
                        />
                      </span>
                    </div>
                    <div className="py-3 showPassWord">
                      <label htmlFor="confirm-password" className="sr-only">
                        confirm password
                      </label>
                      <input
                        id="password"
                        name="confirmPassword"
                        onChange={(e) => {
                          setFormSignUp({ ...formSignup });
                        }}
                        type={isPasswordViewed2 ? "text" : "password"}
                        autoComplete="confirm-password"
                        required
                        className="relative block w-full border placeholder-gray-300 border-gray-300 px-7 py-2 text-gray-900  focus:z-10 focus:outline-none sm:text-sm rounded-md shadow-sm"
                        placeholder="Confirm password"
                        style={{ borderRadius: 4 }}
                      />
                      <span>
                        <img
                          id="on"
                          onClick={() => {
                            setIsPasswordViewed2(!isPasswordViewed2);
                          }}
                          src={
                            isPasswordViewed2
                              ? "show-pass.svg"
                              : "no-show-pass.svg"
                          }
                        />
                      </span>
                    </div>
                  </div>
                  <div className="text-right justify-between">
                    <div className="flex items-center justify-between py-3">
                      <div className="flex items-center">
                        <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                          className="h-4 w-4"
                        />
                        <label
                          htmlFor="remember-me"
                          className="ml-2 block text-sm text-gray-900"
                        >
                          Save Password?
                        </label>
                      </div>

                      <div className="text-sm">
                        <Link
                          href="/password-reset"
                          className="aEffect ml-2 block"
                          style={{
                            fontWeight: 400,
                            fontSize: "14px",
                            lineHeight: "20px",
                          }}
                        >
                          Forgot password?
                        </Link>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btnEffect group  flex w-full justify-center py-2 px-4 text-sm "
                    style={{
                      fontWeight: 700,
                      fontSize: "20px",
                      lineHeight: "22px",
                      color: "white",
                      padding: "10px 0",
                    }}
                    onClick={() => {
                      if (
                        formSignup.userName &&
                        formSignup.userRole !== "Role"
                      ) {
                        if (formSignup.userEmail && formSignup.userPassword) {
                          formSignUpFecth(formSignup);
                        }
                      } else {
                        //! validation
                      }
                    }}
                  >
                    Sign up
                  </button>
                </form>

                <div className="pt-5"></div>
                <div className="text-center">
                  <span
                    style={{
                      fontFamily: "Inter",
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "20px",
                      letterSpacing: "0.01em",
                      textAlign: "center",
                    }}
                  >
                    Already have an account?{" "}
                    <Link
                      href="/signup"
                      style={{ color: "#006C84", fontWeight: "700" }}
                    >
                      Sign in.
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
