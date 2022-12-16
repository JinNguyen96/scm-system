import React from "react";
import Link from "next/link";
export default function Example() {

  const [isfilled, setIsFilled] = React.useState(true);
  const [isPasswordViewed, setIsPasswordViewed] = React.useState(false);
  const [isPasswordViewed2, setIsPasswordViewed2] = React.useState(false);
  
  return (
    <>
      <div className="m-auto h-screen  ">
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div
            className=" py-20 px-10 border-none  shadow-2xl rounded-lg"
            style={{ width: "444px" }}
          >
            <div className="w-full max-w-md space-y-6 h-full">
              <div>
                <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
                  Sign up
                </h2>
              </div>

              <div>
                <div className="relative">
                  <ul className="flex text-sm font-medium">
                    <li className="mr-2 w-2/4">
                      <p className="inline-block  p-4 rounded-t-lg font-bold">
                        User information
                      </p>
                    </li>
                    <li className="mr-2 w-2/4">
                      <p className="inline-block p-4 font-bold border-transparent">
                        Account information
                      </p>
                    </li>
                  </ul>
                  <div
                    style={{
                      height: "3px",
                      width: "100%",
                      borderRadius: "20px",
                      backgroundColor: "#D9D9D9",
                    }}
                  >
                    <div className={isfilled ? "": "left-2/4"}
                      style={{
                        height: "3px",
                        width: "50%",
                        borderRadius: "20px",
                        backgroundColor: "#E88224",
                        position: 'absolute',

                      }}
                    ></div>
                  </div>
                </div>

                <form
                  className=" mt-5  space-y-6"
                  action="#"
                  method="POST"
                >
                  <div className={isfilled ? "-space-y-px": "hidden"}>
                    <div className="py-3">
                      <label htmlFor="user-name" className="sr-only">
                        Name
                      </label>
                      <input
                        id="user-name"
                        name="name"
                        type="text"
                        required
                        className="relative block w-full placeholder-gray-300 border border-gray-300 px-7 py-2 text-gray-900 focus:z-10  focus:outline-none sm:text-sm rounded-md shadow-sm"
                        placeholder="Name"
                        style={{ borderRadius: 24 }}
                      />
                    </div>
                    <div className="py-3">
                      <label htmlFor="phone-number" className="sr-only">
                        Phone Number
                      </label>
                      <input
                        id="phone-number"
                        name="phone-number"
                        type="number"
                        required
                        className="block w-full border placeholder-gray-300 border-gray-300 px-7 py-2 text-gray-900  focus:z-10 focus:outline-none sm:text-sm rounded-md shadow-sm"
                        placeholder="Phone number"
                        style={{ borderRadius: 24 }}
                      />

                      <div></div>
                    </div>
                  </div>

                 
                  <div className={isfilled ? "hidden": "-space-y-px"}>
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
                    </div> 
                    <div className="py-3 showPassWord">
                      <label htmlFor="confirm-password" className="sr-only">
                        Password
                      </label>
                      <input
                        id="password"
                        name="password"
                        type={isPasswordViewed2 ? "text" : "password"}
                        autoComplete="confirm-password"
                        required
                        className="relative block w-full border placeholder-gray-300 border-gray-300 px-7 py-2 text-gray-900  focus:z-10 focus:outline-none sm:text-sm rounded-md shadow-sm"
                        placeholder="Confirm password"
                        style={{ borderRadius: 24 }}
                      />
                      <span>
                        <img
                          id="on"
                          onClick={() => {
                            setIsPasswordViewed2(!isPasswordViewed2);
                          }}
                          src={
                            isPasswordViewed2
                              ? "https://img.icons8.com/fluency-systems-filled/48/null/visible.png"
                              : "https://img.icons8.com/ios/50/null/closed-eye.png"
                          }
                        />
                      </span>
                    </div>
                  </div>
                </form>
                
                <div className="pt-5">
                    <button
                      type="submit"
                      className="btnEffect group  flex w-full justify-center rounded-md border  bg-indigo-600 py-2 px-4 text-sm font-medium text-white focus:outline-none  mb-2"
                      onClick={() => { 
                        setIsFilled(!isfilled)
                       }}
                    >
                      {isfilled ? "Next" : "Sign up"}
                    </button>

                    <div className="flex items-center justify-between px-2 pb-5">
                      <div className="text-sm">
                        <Link
                          href="/login"
                          className="aEffect block text-xs  text-gray-900"
                        >
                          I already has an account.
                        </Link>
                      </div>

                      <div className="text-sm">
                        <Link
                          href="/password-reset"
                          className="aEffect ml-2 block text-xs text-gray-900"
                        >
                          Forgot password?
                        </Link>
                      </div>
                    </div>
                  </div>
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
                      fontSize: 12,
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
