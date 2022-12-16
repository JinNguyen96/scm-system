import React from "react";
import Link from "next/link";

export default function LoginForm() {
  const [isPasswordViewed, setIsPasswordViewed] = React.useState(false);

  return (
    <>
      <div className="m-auto h-screen  ">
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className=" py-20 px-10 border-none  shadow-2xl rounded-lg" style={{width:"444px"}}>
            <div className="w-full max-w-md space-y-6 h-full">
              <div>
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                  Sign in
                </h2>
              </div>
              <form className="mt-8 space-y-6" action="#" method="POST">
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="-space-y-px">
                  <div className="py-3">
                    <label htmlFor="email-address" className="sr-only">
                      Email
                    </label>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="relative block w-full placeholder-gray-300 border border-gray-300 px-7 py-2 text-gray-900 focus:z-10  focus:outline-none sm:text-sm rounded-md shadow-sm"
                      placeholder="Email"
                      style={{ borderRadius: 24 }}
                    />
                  </div>
                  <div className="py-3 showPassWord">
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type={isPasswordViewed ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      className="relative block w-full border placeholder-gray-300 border-gray-300 px-7 py-2 text-gray-900  focus:z-10 focus:outline-none sm:text-sm rounded-md shadow-sm"
                      placeholder="Password"
                      style={{ borderRadius: 24 }}
                    />
                    <span>
                      <img
                        id="on"
                        onClick={() => {
                          setIsPasswordViewed(!isPasswordViewed);
                        }}
                        src={
                          isPasswordViewed
                            ? "https://img.icons8.com/fluency-systems-filled/48/null/visible.png"
                            : "https://img.icons8.com/ios/50/null/closed-eye.png"
                        }
                      />
                    </span>
                    <div></div>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="btnEffect group  flex w-full justify-center rounded-md border  bg-indigo-600 py-2 px-4 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Sign in
                  </button>
                  <div className="flex items-center justify-between px-3 py-3">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
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
                        className="aEffect ml-2 block text-sm text-gray-900"
                      >
                        Forgot password?
                      </Link>
                    </div>
                  </div>
                </div>
              </form>
              <div
                className="w-90 m-auto text-center relative font-bold"
                style={{ borderTop: "1px solid #C4C4C4", opacity: "80%" }}
              >
                <span
                  className="absolute m-auto"
                  style={{
                    width: "25%",
                  left: 0,
                  right: 0,
                  top: -10,
                  background: "white",
                  fontSize:12
                  }}
                >
                  OR
                </span>
              </div>
              <div className="SocialNetwork flex justify-around w-40 m-auto mt-5">
                <a href="#">
                  <img src="icons8-facebook.svg" alt="facebook-icon" />
                </a>
                <a href="#">
                  <img src="icons8-google.svg" alt="google-icon" />
                </a>
              </div>
              <div className="text-center">
                <span>
                  Don't have an account ?{" "}
                  <Link href="/signup" style={{ color: "#e35c22", fontWeight: "700" }}>
                    Sign up.
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
