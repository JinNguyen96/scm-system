import React from "react";

export default function ForgotPasswordForm() {
  const [isPasswordViewed, setIsPasswordViewed] = React.useState(false);
  const [isPasswordViewed2, setIsPasswordViewed2] = React.useState(false);

  return (
    <div className="m-auto h-screen  ">
      <div className="  flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
        <div className="py-20 px-10 border-none  shadow-2xl rounded-lg" style={{width:"444px"}}>
        <div className="w-full max-w-md space-y-6 h-full m-auto">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Create new password
            </h2>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px">
              <div className="py-3 showPassWord">
                <label htmlFor="password" className="sr-only">
                  New Password
                </label>
                <input
                  id="password"
                  name="password"
                  type={isPasswordViewed ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="relative block w-full border placeholder-gray-300 border-gray-300 px-7 py-2 text-gray-900  focus:z-10 focus:outline-none sm:text-sm rounded-md shadow-sm"
                  placeholder="New Password"
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
              <div className="py-3 showPassWord">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type={isPasswordViewed2 ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="relative block w-full border placeholder-gray-300 border-gray-300 px-7 py-2 text-gray-900  focus:z-10 focus:outline-none sm:text-sm rounded-md shadow-sm"
                  placeholder="Confirm Password"
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
                <div></div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="btnEffect group  flex w-full justify-center rounded-md border  bg-indigo-600 py-2 px-4 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Next
              </button>
            </div>
          </form>
        </div>
        </div>
      </div>
    </div>
  );
}
