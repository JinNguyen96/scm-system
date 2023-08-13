import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { decode } from "../../../middleware/auth";

function AccountInfo() {
  const [account, setAccount] = useState({
    userType: 0,
    userEmail: "",
    userRole: 0,
    userPhoneNumber: "",
    userFirstName: "",
    userLastName: "",
    userDob: "",
    userAdress: "",
    relatedUser: 0,
    relatedType: 0,
  });
  const [role, setRole] = useState("");
  const [type, setType] = useState("");
  const getAccount = async (id: any) => {
    await axios
      .post(`/api/userApi/get-all-user`, id)
      .then((result) => {
        setAccount(result.data.content.dataUsers);
        getTypeDetail({ id: result.data.content.dataUsers.userType });
        getRoleDetail({ id: result.data.content.dataUsers.userRole });
      })
      .catch((err) => {});
  };
  const getTypeDetail = async (id: object) => {
    await axios
      .put("/api/typeApi/type-detail", id)
      .then((result) => {
        setType(result.data.content[0].typeName);
      })
      .catch((err) => {});
  };
  const getRoleDetail = async (id: object) => {
    await axios
      .put("/api/roleApi/role-detail", id)
      .then((result) => {
        setRole(result.data.content[0].roleName);
      })
      .catch((err) => {});
  };
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      let dataInfo = JSON.parse(`${localStorage.getItem("userToken")}`);
      let info: any = decode(dataInfo);
      getAccount({ id: info.data.id });
    }
  }, []);
  return (
    <>
      <div>
        <div className="middle-menu">
          <div>
            <div className="btn-create relative">
              <div className="w-full">
                <div className="" style={{ maxWidth: "90%" }}>
                  <div className="">
                    <div className=" bg-white">
                      <h2
                        className="text-left "
                        style={{
                          fontWeight: 700,
                          fontSize: "20px",
                          lineHeight: "30px",
                          color: " #006C84",
                        }}
                      >
                        ACCOUNT INFOMATION
                      </h2>
                    </div>
                    <form
                      className=" flex justify-between w-full center modal-body"
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
                            value={account.userFirstName}
                            readOnly
                            className="block w-full placeholder-gray-300 border border-gray-300 px-7 py-2 text-gray-900 focus:z-10  focus:outline-none sm:text-sm rounded-md shadow-sm"
                            placeholder="User's first name"
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
                            type="text"
                            value={account.userLastName}
                            readOnly
                            className=" block w-full border placeholder-gray-300 border-gray-300 px-7 py-2 text-gray-900  focus:z-10 focus:outline-none sm:text-sm rounded-md shadow-sm"
                            placeholder="User's last name"
                            style={{ borderRadius: 4 }}
                          />
                        </div>
                        <label
                          htmlFor="userDob"
                          style={{
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
                            name="userDob"
                            value={account.userDob.replace(
                              "T00:00:00.000Z",
                              ""
                            )}
                            readOnly
                            type="date"
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
                            value={account.userEmail}
                            readOnly
                            type="email"
                            autoComplete="email"
                            className=" block w-full border placeholder-gray-300 border-gray-300 px-7 py-2 text-gray-900  focus:z-10 focus:outline-none sm:text-sm rounded-md shadow-sm"
                            placeholder="User's email address"
                            style={{ borderRadius: 4 }}
                          />
                        </div>
                        <label htmlFor="userAdress" className="info-required">
                          Adress
                        </label>
                        <div className="pb-3">
                          <input
                            id="userAdress"
                            name="userAdress"
                            value={account.userAdress}
                            readOnly
                            type="text"
                            autoComplete="current-password"
                            className=" block w-full border placeholder-gray-300 border-gray-300 px-7 py-2 text-gray-900  focus:z-10 focus:outline-none sm:text-sm rounded-md shadow-sm"
                            placeholder="User's last name"
                            style={{ borderRadius: 4 }}
                          />
                        </div>
                      </div>
                      <div style={{ width: "55%" }}>
                        <label
                          htmlFor="userPhoneNumber"
                          className="info-required"
                        >
                          Phone Number
                        </label>
                        <div className="pb-3">
                          <input
                            id="userPhoneNumber"
                            name="userPhoneNumber"
                            value={account.userPhoneNumber}
                            readOnly
                            type="number"
                            autoComplete="current-password"
                            required
                            className=" block w-full border placeholder-gray-300 border-gray-300 px-7 py-2 text-gray-900  focus:z-10 focus:outline-none sm:text-sm rounded-md shadow-sm"
                            placeholder="User's Phone Number"
                            style={{ borderRadius: 4 }}
                          />
                        </div>

                        <label htmlFor="relatedType" className="info-required">
                          Related Type
                        </label>
                        <div className="pb-3">
                          <input
                            id="relatedType"
                            name="relatedType"
                            readOnly
                            value={account.relatedType}
                            type="number"
                            autoComplete="current-password"
                            required
                            className=" block w-full border placeholder-gray-300 border-gray-300 px-7 py-2 text-gray-900  focus:z-10 focus:outline-none sm:text-sm rounded-md shadow-sm"
                            placeholder="Type's related"
                            style={{ borderRadius: 4 }}
                          />
                        </div>
                        <label htmlFor="relatedUser" className="info-required">
                          Related User
                        </label>
                        <div className="pb-3">
                          <input
                            id="relatedUser"
                            name="relatedUser"
                            readOnly
                            value={account.relatedUser}
                            type="number"
                            autoComplete="current-password"
                            className=" block w-full border placeholder-gray-300 border-gray-300 px-7 py-2 text-gray-900  focus:z-10 focus:outline-none sm:text-sm rounded-md shadow-sm"
                            placeholder="User's related"
                            style={{ borderRadius: 4 }}
                          />
                        </div>

                        <div className="pb-3 flex flex-column flex-start">
                          <label
                            htmlFor="user-role"
                            className="info-required pr-5"
                          >
                            Role
                          </label>
                          <input
                            id="relatedUser"
                            name="relatedUser"
                            readOnly
                            value={role}
                            type="string"
                            autoComplete="current-password"
                            className=" block w-full border placeholder-gray-300 border-gray-300 px-7 py-2 text-gray-900  focus:z-10 focus:outline-none sm:text-sm rounded-md shadow-sm"
                            placeholder="User's related"
                            style={{ borderRadius: 4 }}
                          />
                        </div>

                        <div className="pb-3 flex flex-column flex-start ">
                          <label
                            htmlFor="user-role"
                            className="info-required pr-5"
                          >
                            Type
                          </label>
                          <input
                            id="relatedUser"
                            name="relatedUser"
                            readOnly
                            value={type}
                            type="string"
                            autoComplete="current-password"
                            className=" block w-full border placeholder-gray-300 border-gray-300 px-7 py-2 text-gray-900  focus:z-10 focus:outline-none sm:text-sm rounded-md shadow-sm"
                            placeholder="User's related"
                            style={{ borderRadius: 4 }}
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="search-by-tag"></div>
        </div>
      </div>
    </>
  );
}

export default AccountInfo;
