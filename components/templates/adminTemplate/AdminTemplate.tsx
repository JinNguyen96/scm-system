import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { object, string, date } from "yup";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { decode } from "../../../middleware/auth";
import Pagination from "../../panigation";
import ExportUserToCsv from "./ExportUserToCsv";
import { notifiError, notifiSuccess } from "../../toastify-noti/notifi";

import UserTable from "./UserTable";
import { setCurrentModalState } from "../../../recoil/Modal/modalState";
import { useSetRecoilState } from "recoil";
import _ from "lodash";
const animatedComponents = makeAnimated();

function AdminTemplate() {
  const [users, setUsers] = useState([]);
  const [userDetail, setUserDetail] = useState({
    relatedType: 1,
    relatedUser: 2,
    userAdress: "",
    userDob: "",
    userEmail: "",
    userFirstName: "",
    userLastName: "",
    userPhoneNumber: "",
    userRole: "",
    userType: "",
  });
  const [relaType, setRelaType] = useState([]);
  const [relaUser, setRelaUser] = useState({ relaUser: [] });
  const [formSignup, setFormSignUp] = useState({
    userType: [""],
    userEmail: "",
    userPassword: "",
    userRole: [""],
    userPhoneNumber: "",
    userFirstName: "",
    userLastName: "",
    userDob: "",
    userAdress: "",
    relatedUser: [""],
    relatedType: [""],
  });

  const handleChangeChecked = (e: any) => {
    if (e.target.name === "relaType") {
      if (e.target.checked) {
        setFormSignUp({
          ...formSignup,
          relatedType: [...formSignup.relatedType, e.target.value],
        });
      } else {
        setFormSignUp({
          ...formSignup,
          relatedType: formSignup.relatedType.filter(
            (obj: any) => obj !== e.target.value || obj === ""
          ),
        });
      }
    } else if (e.target.name === "relaUser") {
      if (e.target.checked) {
        setFormSignUp({
          ...formSignup,
          relatedUser: [...formSignup.relatedUser, e.target.value],
        });
      } else {
        setFormSignUp({
          ...formSignup,
          relatedUser: formSignup.relatedUser.filter(
            (obj: any) => obj !== e.target.value || obj === ""
          ),
        });
      }
    }
  };
  const getAllUser = useCallback(async () => {
    await axios
      .get("/api/userApi/get-all-user")
      .then((result) => {
        setUsers(result.data.content.usersPerPage);
      })
      .catch((err) => {});
  }, [users]);

  const [isPasswordViewed, setIsPasswordViewed] = useState(false);
  const [isPasswordViewed2, setIsPasswordViewed2] = useState(false);

  const [formUpdate, setformUpdate] = useState({
    userType: [""],
    userEmail: "",
    userPassword: "",
    userRole: [""],
    userPhoneNumber: "",
    userFirstName: "",
    userLastName: "",
    userDob: "",
    userAdress: "",
    relatedUser: "",
    relatedType: "",
  });

  const handleOnchange = (e: any) => {
    let { name } = e.target;
    setformUpdate({ ...formUpdate, [name]: e.target.value });
  };
  const handleOnChangeSignup = (e: any) => {
    let { name } = e.target;
    setFormSignUp({ ...formSignup, [name]: e.target.value });
    setConfirmPass({ ...confirmPass, [name]: e.target.value });
  };
  const [isError, setIsError] = useState(false);
  const [search, setSearch] = useState("");
  const [roles, setRoles] = useState([]);
  const [roleDetail, setRoleDetail] = useState([]);
  const [rol, setRol]: any = useState([]);
  let userInfo = {
    userDayOfBirth: "",
    userFirstName: "",
    userLastName: "",
    confirmPassword: "",
  };

  const [confirmPass, setConfirmPass] = useState({
    confirmPassword: "",
  });
  const [typeDetail, setTypeDetail] = useState([]);
  const schema = object({
    userRole: string().required(),
    userEmail: string().required().email(),
    userPassword: string().required(),
    confirmPassword: string()
      .required()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,16}$/
      ),
    userDayOfBirth: date(),
    userFirstName: string().required().min(2).max(12),
    userLasName: string().required().min(2).max(50),
  });

  const getUserDetail = useCallback(() => {
    async (id: object) => {
      let result = await axios.post("/api/userApi/get-all-user", id);
      setUserDetail(result.data.content.dataUsers);
      setRoles(result.data.content.roleData);
      setRoleDetail(result.data.content.data);
    };
  }, []);
  const getTypeDetail = async (id: any) => {
    await axios
      .put("/api/typeApi/type-detail", id)
      .then((result) => {
        setTypeDetail(result.data.content);
      })
      .catch((err) => {});
  };
  const getRoleDetail = async (id: any) => {
    await axios
      .put("/api/roleApi/role-detail", id)
      .then((result) => {
        let data =
          result.data.content.length > 1
            ? result.data.content.map((item: any) => {
                return item.map((value: any) => {
                  return value.roleScopes;
                });
              })
            : result.data.content.map((item: any) => {
                return item.roleScopes;
              });
        setRol(data);
      })
      .catch((err) => {});
  };
  const delUser = async (id: object) => {
    await axios
      .post("/api/userApi/delete-user", id)
      .then((result) => {
        notifiSuccess({ message: "Delete User success!!" });
      })
      .catch((err: any) => {
        notifiError({ message: "Delete User Failed!!!" });
      });
  };

  const editUser = async (data: object) => {
    await axios
      .put("api/update/update-user", data)
      .then((result) => {
        notifiSuccess({ message: "Update User success!!" });
      })
      .catch((err) => {
        notifiError({ message: "Update User Failed!!!" });
      });
  };

  const formCreateUserFetch = useCallback(async (data: object) => {
    try {
      await axios
        .post("/api/userApi/signup", data)
        .then((result) => {
          notifiSuccess({ message: "Create New User success!!" });
          setFormSignUp({
            userType: [""],
            userEmail: "",
            userPassword: "",
            userRole: [""],
            userPhoneNumber: "",
            userFirstName: "",
            userLastName: "",
            userDob: "",
            userAdress: "",
            relatedUser: [""],
            relatedType: [""],
          });
        })
        .catch((err) => {
          // console.log(err);
          notifiError({ message: "Create New User fail!!" });
        });
    } catch (err) {}
  }, []);
  const [role, setRole] = useState([]);
  const getRole = async () => {
    await axios
      .get("/api/roleApi/get-all-role")
      .then((result) => {
        setRole(result.data.content);
      })
      .catch((err) => {});
  };

  const [type, setType] = useState([]);

  const getType = async (id: any) => {
    let typeFilter: any = [];
    await axios
      .put("/api/typeApi/get-all-type", id)
      .then((result) => {
        // console.log(_.union(result.data.content.map((obj: any) => obj)));

        result.data.content.map(
          (type: { [x: string]: any; typeLevel: any }) => {
            type.map((level: any) => {
              // console.log(level);
              return typeFilter.push(type[0]);
            });
          }
        );
        for (let i = 1; i < typeFilter.length; i++) {
          let max = typeFilter[0].typeLevel;
          typeFilter = typeFilter[0];
          if (typeFilter[i].typeLevel < max) {
            typeFilter = typeFilter[i];
            max = typeFilter[i].typeLevel;
          }
        }
      })
      .catch((err) => {});

    await axios
      .get("/api/typeApi/get-all-type")
      .then((result) => {
        // console.log(result.data.content);

        setType(
          result.data.content.filter((lv: any) => {
            return lv.typeLevel >= typeFilter.typeLevel;
          })
        );

        // console.log(typeFilter.typeLevel);
      })
      .catch((err: any) => {});
  };

  const [sort, setSort] = useState("ASC");

  const [userRoleDetail, setUserRoleDetail] = useState([]);

  const getUserRoleDetail = useCallback(
    async (id: object) => {
      await axios
        .post(`/api/userApi/get-all-user`, id)
        .then((result) => {
          // console.log(result.data.content.data);
          const arr: any[] = [];
          result.data.content.data.map((roleId: any) => {
            return roleId.map((user: any) => {
              arr.push(user);
            });
          });
          setUserRoleDetail(
            arr.map((obj: any) => {
              return obj.roleScopes;
            }) as any
          );
        })
        .catch((err) => {});
    },
    [userRoleDetail]
  );

  const roleOptionEdit = useMemo(() => {
    return role
      .filter((rol: any) =>
        rol.roleScopes.includes(userRoleDetail.map((item) => item))
      )
      .map((obj: any) => {
        return { value: obj.id, label: obj.roleName };
      });
  }, [role]);

  const typeOptionEdit = useMemo(() => {
    return type?.map((type: any) => {
      return { value: `${type.id}`, label: `${type.typeName}` };
    });
  }, [type]);

  // console.log(type);

  const [id, setId] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const lastIndex = currentPage * usersPerPage;
  const firstIndex = lastIndex - usersPerPage;
  const usersPagi = users.slice(firstIndex, lastIndex);
  const npage = Math.ceil(users.length / usersPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const modalTypeHandle = useSetRecoilState(setCurrentModalState);

  useEffect(() => {
    // getRole();
    getAllUser();

    // if (typeof window !== null) {
    //   let dataInfo = JSON.parse(`${localStorage.getItem("userToken")}`);
    //   let info: any = decode(dataInfo);
    //   getUserRoleDetail({ id: info.data.id });
    //   setId(info.data.id);
    //   console.log(info.data.id);
    //   getType({ id: info.data.id });
    // }

    // console.log(window.document.URL)
  }, []);
  useEffect(() => {
    getRole();
  }, [users]);
  return (
    <>
      <div className="admin">
        <div className="container-full">
          <div className="material-header page-header category-header">
            <div className="row">
              <div className="col-lg-6 flex align-items-center">
                <h1 className="--title-page">USER </h1>
              </div>

              <div className="col-lg-6 search-bar">
                <label htmlFor="search-bar" className="sr-only">
                  Search
                </label>
                <input
                  type="text"
                  id="search-bar"
                  placeholder="Search by email..."
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <img
                  src="/search-icon.svg"
                  style={{ right: 20 }}
                  alt="search icon"
                />
              </div>
            </div>
          </div>
          <div className="material-main">
            <div>
              <div className="btn-create relative d-inline-block">
                <span>All ({users.length}) </span>
                <button
                  className="--button-create"
                  type="button"
                  onClick={() => {
                    modalTypeHandle({ typeModal: "CREATE_USER" });
                  }}
                >
                  Create new user
                </button>
                <span
                  style={{
                    position: "absolute",
                    right: "-14%",
                    bottom: "48%",
                    transform: "translateY(50%)",
                  }}
                >
                  <ExportUserToCsv users={users} />
                </span>
              </div>
            </div>
            <UserTable
              usersPagi={usersPagi}
              search={search}
              delUser={delUser}
              setformUpdate={setformUpdate}
              getUserDetail={getUserDetail}
              getTypeDetail={getTypeDetail}
            />
          </div>

          <div className="material-footer">
            <div className="n-item-pagination">
              <label htmlFor="pagi-item-material">Showing </label>
              <select name="pagi-item-material" id="pagi-item-material">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
              <label htmlFor="pagi-item-material"> entries</label>
            </div>
            <div className="pagi-material">
              <Pagination
                currentPage={currentPage}
                changePage={changePage}
                prePage={prePage}
                numbers={numbers}
                nextPage={nextPage}
              />
            </div>
          </div>
          <div>
            <div
              className="modal fade edit-user"
              id="userDetail"
              tabIndex={-1}
              aria-labelledby="editUserModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" style={{ maxWidth: "800px" }}>
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title" id="editUserModalLabel">
                      User detail
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                  <div className="modal-body text-xl">
                    <form className="  flex justify-between w-full center">
                      <div style={{ width: "40%" }}>
                        <label htmlFor="first-name" className="info-required">
                          First name
                        </label>
                        <div className="pb-3">
                          <input
                            id="first-name"
                            name="userFirstName"
                            type="text"
                            value={userDetail.userFirstName}
                            readOnly
                            className="block w-full placeholder-gray-300 `border` border-gray-300 px-7 py-2 text-gray-900 focus:z-10  focus:outline-none sm:text-sm rounded-md shadow-sm"
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
                            value={userDetail.userLastName}
                            readOnly
                            onChange={(e) => {
                              userInfo = {
                                ...userInfo,
                                userLastName: e.target.value,
                              };
                              // console.log(formSignup);
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
                            value={userDetail.userDob.replace(
                              "T00:00:00.000Z",
                              ""
                            )}
                            readOnly
                            pattern="\d{4}-\d{2}-\d{2}"
                            name="dayOfBirth"
                            onChange={(e) => {
                              userInfo = {
                                ...userInfo,
                                userDayOfBirth: e.target.value,
                              };
                            }}
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
                            value={userDetail.userEmail}
                            readOnly
                            onChange={(e) => {
                              setFormSignUp({
                                ...formSignup,
                                userEmail: e.target.value,
                              });
                            }}
                            type="email"
                            className=" block w-full border placeholder-gray-300 border-gray-300 px-7 py-2 text-gray-900  focus:z-10 focus:outline-none sm:text-sm rounded-md shadow-sm"
                            placeholder="Your email address"
                            style={{ borderRadius: 4 }}
                          />
                        </div>
                      </div>
                      <div style={{ width: "55%" }}>
                        <label
                          htmlFor="user-role"
                          className="info-required pr-5"
                        >
                          User Roles
                        </label>
                        <div className="pb-3">
                          <input
                            id="user-email"
                            name="userRole"
                            defaultValue={
                              roleDetail.length > 1
                                ? roleDetail.map((item: any) => {
                                    return item.map(
                                      (value: any) => value.roleName
                                    );
                                  })
                                : roleDetail.map((item: any) => {
                                    return item.roleName;
                                  })
                            }
                            readOnly
                            type="text"
                            className=" block w-full border placeholder-gray-300 border-gray-300 px-7 py-2 text-gray-900  focus:z-10 focus:outline-none sm:text-sm rounded-md shadow-sm"
                            placeholder="Your email address"
                            style={{ borderRadius: 4 }}
                          />
                        </div>
                        <label
                          htmlFor="roleDescription"
                          className="info-required pr-5"
                        >
                          Description
                        </label>
                        <div className="pb-3">
                          <input
                            id="roleDescription"
                            name="roleDescription"
                            defaultValue={
                              roleDetail.length > 1
                                ? roleDetail.map((item: any) => {
                                    return item.map(
                                      (value: any) => value.roleDescription
                                    );
                                  })
                                : roleDetail.map((item: any) => {
                                    return item.roleDescription;
                                  })
                            }
                            readOnly
                            type="text"
                            className=" block w-full border placeholder-gray-300 border-gray-300 px-7 py-2 text-gray-900  focus:z-10 focus:outline-none sm:text-sm rounded-md shadow-sm"
                            placeholder="Your type"
                            style={{ borderRadius: 4 }}
                          />
                        </div>

                        <label
                          htmlFor="user-role"
                          className="info-required pr-5"
                        >
                          User Types
                        </label>
                        <div className="pb-3">
                          <input
                            id="user-email"
                            name="userRole"
                            defaultValue={
                              typeDetail.length > 1
                                ? typeDetail.map((item: any) => {
                                    return item.map(
                                      (value: any) => value.typeName
                                    );
                                  })
                                : typeDetail.map((item: any) => {
                                    return item.typeName;
                                  })
                            }
                            readOnly
                            type="text"
                            className=" block w-full border placeholder-gray-300 border-gray-300 px-7 py-2 text-gray-900  focus:z-10 focus:outline-none sm:text-sm rounded-md shadow-sm"
                            placeholder="Your email address"
                            style={{ borderRadius: 4 }}
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="cancel-button"
                      data-bs-dismiss="modal"
                    >
                      close
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="modal fade edit-user"
              id="editUser"
              tabIndex={-1}
              aria-labelledby="editUserModal"
              aria-hidden="true"
            >
              <div className="modal-dialog" style={{ maxWidth: "800px" }}>
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title" id="editUserModalLabel">
                      Update User
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                  <div className="modal-body text-xl">
                    <form className="  flex justify-between w-full center">
                      <div style={{ width: "40%" }}>
                        <label htmlFor="first-name" className="info-required">
                          First name
                        </label>
                        <div className="pb-3">
                          <input
                            id="first-name"
                            name="userFirstName"
                            type="text"
                            value={formUpdate.userFirstName}
                            className="block w-full placeholder-gray-300 border border-gray-300 px-7 py-2 text-gray-900 focus:z-10  focus:outline-none sm:text-sm rounded-md shadow-sm"
                            placeholder="Your first name"
                            style={{ borderRadius: 4 }}
                            onChange={handleOnchange}
                          />
                        </div>
                        <label htmlFor="last-name" className="info-required">
                          Last name
                        </label>
                        <div className="pb-3">
                          <input
                            id="last-name"
                            name="userLastName"
                            value={formUpdate.userLastName}
                            onChange={handleOnchange}
                            type="text"
                            autoComplete="current-password"
                            required
                            className=" block w-full border placeholder-gray-300 border-gray-300 px-7 py-2 text-gray-900  focus:z-10 focus:outline-none sm:text-sm rounded-md shadow-sm"
                            placeholder="Your last name"
                            style={{ borderRadius: 4 }}
                          />
                        </div>
                        <label
                          htmlFor="userDob"
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
                            id="userDob"
                            value={formUpdate.userDob.replace(
                              "T00:00:00.000Z",
                              ""
                            )}
                            name="userDob"
                            onChange={handleOnchange}
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
                            value={formUpdate.userEmail}
                            disabled
                            type="email"
                            className=" block w-full border placeholder-gray-300 border-gray-300 px-7 py-2 text-gray-900  focus:z-10 focus:outline-none sm:text-sm rounded-md shadow-sm"
                            placeholder="Your email address"
                            style={{ borderRadius: 4 }}
                          />
                        </div>
                      </div>
                      <div style={{ width: "55%" }}>
                        <label
                          htmlFor="user-role"
                          className="info-required pr-5"
                        >
                          User Roles
                        </label>
                        <div className="pb-3">
                          <input
                            id="user-email"
                            name="userRole"
                            defaultValue={roles}
                            disabled
                            type="text"
                            className=" block w-full border placeholder-gray-300 border-gray-300 px-7 py-2 text-gray-900  focus:z-10 focus:outline-none sm:text-sm rounded-md shadow-sm"
                            placeholder="Roles"
                            style={{ borderRadius: 4 }}
                          />
                          <Select
                            options={roleOptionEdit}
                            isMulti
                            instanceId="userRoleCreate"
                            className="select-option"
                            components={animatedComponents}
                            onChange={(e) => {
                              let data = e.map((e: any) => e.value);
                              setformUpdate({
                                ...formUpdate,
                                userRole: data,
                              });
                              // console.log(formUpdate.userRole, "select role");
                            }}
                          />
                        </div>
                        <label
                          htmlFor="roleDescription"
                          className="info-required pr-5"
                        >
                          Description
                        </label>
                        <div className="pb-3">
                          <input
                            id="roleDescription"
                            name="roleDescription"
                            defaultValue={
                              roleDetail.length > 1
                                ? roleDetail.map((item: any) => {
                                    return item.map(
                                      (value: any) => value.roleDescription
                                    );
                                  })
                                : roleDetail.map((item: any) => {
                                    return item.roleDescription;
                                  })
                            }
                            type="text"
                            className=" block w-full border placeholder-gray-300 border-gray-300 px-7 py-2 text-gray-900  focus:z-10 focus:outline-none sm:text-sm rounded-md shadow-sm"
                            placeholder="Roles description"
                            style={{ borderRadius: 4 }}
                          />
                        </div>

                        <label
                          htmlFor="userType"
                          className="info-required pr-5"
                        >
                          User Types
                        </label>
                        <div className="pb-3">
                          <Select
                            options={typeOptionEdit}
                            isMulti
                            instanceId="userTypeCreate"
                            components={animatedComponents}
                            onChange={(e) => {
                              let data = e.map((e: any) => e.value);
                              setformUpdate({
                                ...formUpdate,
                                userType: data,
                              });
                              // console.log(formUpdate, "select type");
                            }}
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="cancel-button"
                      data-bs-dismiss="modal"
                    >
                      close
                    </button>
                    <button
                      className="btnEffect "
                      style={{
                        fontWeight: 700,
                        fontSize: "20px",
                        lineHeight: "22px",
                        color: "white",
                        padding: "7px 17px",
                      }}
                      onClick={() => {
                        editUser(formUpdate);
                      }}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  function changePage(n: number) {
    setCurrentPage(n);
  }
  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }
}

export default AdminTemplate;
