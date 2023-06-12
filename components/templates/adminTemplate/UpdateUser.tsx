import axios from "axios";
import React from "react";
import Router from "next/router";

const UpdateUser = (_props: any) => {
  const [isPasswordViewed, setIsPasswordViewed] = React.useState(false);
  const [isPasswordViewed2, setIsPasswordViewed2] = React.useState(false);
  const [formSignup, setFormSignUp] = React.useState({
    userName: "",
    userRole: "",
    userEmail: "",
    userPassword: "",
  });

  const [isError, setIsError] = React.useState(false);
  const [isError2, setIsError2] = React.useState(false);

  let userInfo = {
    userDayOfBirth: "",
    userFirstName: "",
    userLastName: "",
    confirmPassword: "",
  };

  React.useEffect(() => {});

  return (
    <>
      <div className="m-auto h-screen parent-center-table ">
        <div className=" min-h-full items-center   sm:px-6 lg:px-8  ">
          <div
            className=" border-none center-table-hoc  shadow-2xl"
            style={{
              width: "780px",
              height: "504px",
              padding: "16px 21px 30px 19px",
              borderRadius: 4,
            }}
          >
            <div className="w-full  h-full relative">
              <div>
                <h2
                  className="text-left"
                  style={{
                    fontWeight: 700,
                    fontSize: "20px",
                    lineHeight: "30px",
                    color: " #006C84",
                  }}
                >
                  UPDATE USER
                </h2>
              </div>

              <div className="w-full">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                  className=" mt-5  flex flex-column justify-between w-full center"
                  action="#"
                  method="POST"
                >
                  <div style={{ width: "40%" }}>
                    <label htmlFor="first-name" className="info-required">
                      First name
                    </label>
                    <div className="pb-3">
                      <input
                        id="first-name"
                        name="userFirstName"
                        type="text"
                        required
                        onChange={(e) => {
                          userInfo = {
                            ...userInfo,
                            userFirstName: e.target.value,
                          };

                          setFormSignUp({
                            ...formSignup,
                            userName: e.target.value,
                          });
                        }}
                        className="block w-full placeholder-gray-300 border border-gray-300 px-7 py-2 text-gray-900 focus:z-10  focus:outline-none sm:text-sm rounded-md shadow-sm"
                        placeholder="Your first name"
                        style={{ borderRadius: 4 }}
                      />
                    </div>
                    <label htmlFor="last-name" className="info-required">
                      Last name
                    </label>
                    <div className="pb-3">
                      <input
                        id="last-name"
                        name="userLastName"
                        onChange={(e) => {
                          userInfo = {
                            ...userInfo,
                            userLastName: e.target.value,
                          };
                        }}
                        type="text"
                        autoComplete="current-password"
                        required
                        className=" block w-full border placeholder-gray-300 border-gray-300 px-7 py-2 text-gray-900  focus:z-10 focus:outline-none sm:text-sm rounded-md shadow-sm"
                        placeholder="Your last name"
                        style={{ borderRadius: 4 }}
                      />
                    </div>
                    <label
                      htmlFor="day-of-birth"
                      style={{
                        fontWeight: 600,
                        fontSize: "14px",
                        lineHeight: "22px",
                        color: "#262626",
                      }}
                    >
                      Day of birth
                    </label>
                    <div className="pb-3">
                      <input
                        id="day-of-birth"
                        name="dayOfBirth"
                        onChange={(e) => {
                          userInfo = {
                            ...userInfo,
                            userDayOfBirth: e.target.value,
                          };
                        }}
                        type="date"
                        required
                        className=" block w-full border placeholder-gray-300 border-gray-300 px-7 py-2 text-gray-900  focus:z-10 focus:outline-none sm:text-sm rounded-md shadow-sm"
                        style={{ borderRadius: 4 }}
                      />
                    </div>
                    <label htmlFor="user-email" className="info-required">
                      Email
                    </label>
                    <div className="pb-3">
                      <input
                        id="user-email"
                        name="userEmail"
                        onChange={(e) => {
                          setFormSignUp({
                            ...formSignup,
                            userEmail: e.target.value,
                          });
                        }}
                        type="email"
                        autoComplete="email"
                        required
                        className=" block w-full border placeholder-gray-300 border-gray-300 px-7 py-2 text-gray-900  focus:z-10 focus:outline-none sm:text-sm rounded-md shadow-sm"
                        placeholder="Your email address"
                        style={{ borderRadius: 4 }}
                      />
                    </div>
                  </div>
                  <div style={{ width: "55%" }}>
                    <label htmlFor="password" className="info-required">
                      Password
                    </label>
                    <div className=" showPassWord">
                      <input
                        id="password"
                        name="userPassword"
                        onChange={(e) => {
                          setFormSignUp({
                            ...formSignup,
                            userPassword: e.target.value,
                          });
                          if (
                            formSignup.userPassword.match(
                              /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,16}$/
                            )
                          ) {
                            setIsError2(false);
                          } else {
                            setIsError2(true);
                          }
                        }}
                        type={isPasswordViewed2 ? "text" : "password"}
                        autoComplete="current-password"
                        required
                        className="block w-full border placeholder-gray-300 border-gray-300 px-7 py-2 text-gray-900  focus:z-10 focus:outline-none sm:text-sm rounded-md shadow-sm"
                        placeholder="Your password"
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
                    {isError2 ? (
                      <p className="validation-info pb-3">
                        The password should be at leat six character long to
                        make it stronger use upper and lower case letter case
                        letter number and symbols like !@#$%^&*()
                      </p>
                    ) : (
                      ""
                    )}
                    <label htmlFor="confirm-password" className="info-required">
                      Confirm password
                    </label>
                    <div className=" showPassWord">
                      <input
                        id="confirm-password"
                        name="confirmPassword"
                        type={isPasswordViewed ? "text" : "password"}
                        autoComplete="current-password"
                        required
                        className="relative block w-full border placeholder-gray-300 border-gray-300 px-7 py-2 text-gray-900  focus:z-10 focus:outline-none sm:text-sm rounded-md shadow-sm"
                        placeholder="Password"
                        style={{ borderRadius: 4 }}
                        onChange={(e) => {
                          userInfo = {
                            ...userInfo,
                            confirmPassword: e.target.value,
                          };
                          if (formSignup.userPassword !== e.target.value) {
                            setIsError(true);
                          } else {
                            setIsError(false);
                          }
                        }}
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
                    {isError ? (
                      <p className="validation-info pb-3">
                        Password does not match
                      </p>
                    ) : (
                      ""
                    )}
                    <div className="py-3 flex items-center">
                      <label htmlFor="user-role" className="info-required pr-5">
                        Role
                      </label>
                      <select
                        id="user-role"
                        name="userRole"
                        onChange={(e) => {
                          setFormSignUp({
                            ...formSignup,
                            userRole: e.target.value,
                          });
                        }}
                        required
                        className="block w-40 border placeholder-gray-300 border-gray-300 px-5 py-2 text-gray-900  focus:z-10 focus:outline-none sm:text-sm shadow-sm"
                        placeholder="Phone number"
                        style={{ borderRadius: 4 }}
                      >
                        <option value="">Chọn vai trò</option>
                        <option value="QuanLi">Quản Lí</option>
                        <option value="Nhanvien">Nhân Viên</option>
                      </select>
                      <div></div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btnEffect "
                    style={{
                      fontWeight: 700,
                      fontSize: "20px",
                      lineHeight: "22px",
                      color: "white",
                      padding: "7px 17px",
                      position: "absolute",
                      right: 0,
                      bottom: 0,
                    }}
                    onClick={() => {
                      if (isError == false && isError2 == false) {
                      }
                    }}
                  >
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default UpdateUser;
