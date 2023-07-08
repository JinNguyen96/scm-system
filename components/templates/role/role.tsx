import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import swal from "sweetalert";
import { decode } from "../../../middleware/auth";
import { Label } from "flowbite-react";
import Pagination from "../../panigation";
import ExportRoleToCsv from "./ExportRoleToCsv";

const animatedComponents = makeAnimated();
const RolePermOption = [
  { value: "perUser_view", label: "USER_VIEW" },
  { value: "perUser_add", label: "USER_ADD" },
  { value: "perUser_edit", label: "USER_EDIT" },
  { value: "perUser_delete", label: "USER_DELETE" },
  { value: "perRole_view", label: "ROLE_VIEW" },
  { value: "perRole_add", label: "ROLE_ADD" },
  { value: "perRole_edit", label: "ROLE_EDIT" },
  { value: "perRole_delete", label: "ROLE_DELETE" },
  { value: "perMaterial_view", label: "MATERIAL_VIEW" },
  { value: "perMaterial_add", label: "MATERIAL_ADD" },
  { value: "perMaterial_edit", label: "MATERIAL_EDIT" },
  { value: "perMaterial_delete", label: "MATERIAL_DELETE" },
];

const roleScopesOption = [
  { value: "own", label: "OWN" },
  { value: "point", label: "POINT" },
  { value: "type", label: "TYPE" },
  { value: "all", label: "ALL" },
];
function Role() {
  const [roleDetail, setRoleDetail] = useState({
    roleName: "",
    roleDescription: "",
    rolePermission: "",
    roleScopes: "",
  });
  const [idUser, setId] = useState({
    roleName: "",
    roleDescription: "",
    rolePermission: "",
    roleScopes: "",
    id: "",
  });
  const [roleCreate, setRoleCreate] = useState({
    roleName: "",
    roleDescription: "",
    rolePermission: "",
    roleScopes: "",
  });
  const [search, setSearch] = React.useState("");
  const [useScope, setUserScope] = useState([]);
  const delRole = async (id: object) => {
    await axios
      .post("/api/roleApi/delete-role", id)
      .then((result) => {
        swal({
          title: "Delete Role success!!",
          text: `${result}`,
          icon: "success",
        });
        getRole();
      })
      .catch((err: any) => {
        swal({
          title: "Opps!",
          text: `${err.response.data.message}`,
          icon: "error",
        });
      });
  };

  const editRole = async (data: object) => {
    await axios
      .put("api/roleApi/update-role", data)
      .then((result) => {
        swal({
          title: "Update Success!",
          text: `${result.data.message}`,
          icon: "success",
        });
      })
      .catch((err) => {});
  };

  const formCreateRoleFecth = async (data: object) => {
    try {
      await axios
        .post("/api/roleApi/create-role", data)
        .then((result) => {
          swal({
            title: "Create Role success!!",
            text: `${result}`,
            icon: "success",
          });
          getRole();
        })
        .catch((err) => {});
    } catch (err) {}
  };
  const [role, setRole] = useState([]);

  const getRole = async () => {
    await axios
      .get("/api/roleApi/get-all-role")
      .then((result) => {
        setRole(result.data.content);
      })
      .catch((err) => {});
  };
  const handleOnchange = (e: any) => {
    let { name } = e.target;
    setId({ ...idUser, [name]: e.target.value });
  };
  const getUserByRole = async (data: any) => {
    await axios
      .put("/api/roleApi/role-detail", data)
      .then((result) => {
        setRoleDetail(result.data.content[0]);

        setId(result.data.content[0]);

        setUserScope(result.data.content);
      })
      .catch((err) => {});
  };

  const scope = useScope?.map((scope: any) => {
    if (scope[0]?.roleScopes?.split(",").includes("all")) {
      return roleScopesOption;
    } else {
      return {
        value: scope[0]?.roleScopes,
        label: scope[0]?.roleScopes?.toUpperCase(),
      };
    }
  });
  let scopeByUser = scope;

  const [currentPage, setCurrentPage] = React.useState(1);
  const rolePerPage = 5;
  const lastIndex = currentPage * rolePerPage;
  const firstIndex = lastIndex - rolePerPage;
  const rolePagi = role.slice(firstIndex, lastIndex);
  const npage = Math.ceil(role.length / rolePerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  useEffect(() => {
    getRole();
  }, []);
  const [sort, setSort] = useState("ASC");
  const sorting = (col: any) => {
    if (sort === "ASC") {
      const sorted = [...role].sort((a: string, b: string) =>
        a[col]?.toLowerCase() > b[col]?.toLowerCase() ? 1 : -1
      );
      setRole(sorted);
      setSort("DSC");
    }
    if (sort === "DSC") {
      const sorted = [...role].sort((a: string, b: string) =>
        a[col]?.toLowerCase() < b[col]?.toLowerCase() ? 1 : -1
      );
      setRole(sorted);
      setSort("ASC");
    }
  };
  return (
    <>
      <div className="admin">
        <div className="container-full">
          <div className="material-header page-header category-header">
            <div className="row">
              <div className="col-lg-6 flex align-items-center">
                <h1 className="--title-page">USER / ROLE </h1>
              </div>
              <div className="col-lg-6 search-bar">
                <label htmlFor="search-bar" className="sr-only">
                  Search
                </label>
                <input
                  type="text"
                  id="search-bar"
                  placeholder="Search..."
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
          <div className="material-main ">
            <div>
              <div className="btn-create relative d-inline-block">
                <span>All ({role.length}) </span>
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#createRoleModal"
                  type="button"
                  className="--button-create"
                  onClick={() => {
                    if (localStorage.getItem("userName")) {
                      let userScopeLogin: any = decode(
                        JSON.parse(`${localStorage.getItem("userToken")}`)
                      );
                      getUserByRole({ id: userScopeLogin?.data.userRole });
                    }
                  }}
                >
                  Create new role
                </button>
                <span
                  style={{
                    position: "absolute",
                    right: "-14%",
                    bottom: "48%",
                    transform: "translateY(50%)",
                  }}
                >
                  <ExportRoleToCsv roles={role} />
                </span>
                <div
                  className="w-full modal fade"
                  id="createRoleModal"
                  tabIndex={-1}
                  aria-labelledby="createRoleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog" style={{ maxWidth: "800px" }}>
                    <div className="modal-content">
                      <div className="modal-header bg-white">
                        <h2
                          className="text-left "
                          style={{
                            fontWeight: 700,
                            fontSize: "20px",
                            lineHeight: "30px",
                            color: " #006C84",
                            width: "800px",
                          }}
                        >
                          CREATE NEW ROLE
                        </h2>
                      </div>

                      <div className=" flex justify-between w-full center modal-body">
                        <div style={{ width: "55%" }}>
                          <label htmlFor="first-name" className="info-required">
                            Role Name
                          </label>
                          <div className="pb-3">
                            <input
                              id="first-name"
                              name="roleName"
                              type="text"
                              onChange={(e) => {
                                setRoleCreate({
                                  ...roleCreate,
                                  roleName: e.target.value,
                                });
                              }}
                              className="block w-full placeholder-gray-300 border border-gray-300 px-7 py-2 text-gray-900 focus:z-10  focus:outline-none sm:text-sm rounded-md shadow-sm"
                              placeholder="Name of role"
                              style={{ borderRadius: 4 }}
                            />
                          </div>
                          <label htmlFor="first-name" className="info-required">
                            Role Description
                          </label>
                          <div className="pb-3">
                            <input
                              id="first-name"
                              name="roleDescription"
                              type="text"
                              required
                              onChange={(e) => {
                                setRoleCreate({
                                  ...roleCreate,
                                  roleDescription: e.target.value,
                                });
                              }}
                              className="block w-full placeholder-gray-300 border border-gray-300 px-7 py-2 text-gray-900 focus:z-10  focus:outline-none sm:text-sm rounded-md shadow-sm"
                              placeholder="Detailed description"
                              style={{ borderRadius: 4 }}
                            />
                          </div>
                        </div>
                        <div style={{ width: "40%" }}>
                          <div className=" flex flex-column  spac">
                            <label
                              htmlFor="user-role"
                              className="info-required pr-5"
                            >
                              Scopes
                            </label>

                            <div className="pb-3">
                              <Select
                                name="userRole"
                                onChange={(e) => {
                                  let arrayRole: string | any = e.map(
                                    (item: any) => item.value
                                  );
                                  setRoleCreate({
                                    ...roleCreate,
                                    roleScopes: arrayRole.toString(),
                                  });
                                }}
                                className="block w-full placeholder-gray-300 border-gray-300  text-gray-900  focus:z-10 focus:outline-none sm:text-sm   border border-gray-300 rounded-md shadow-sm"
                                placeholder="Select Scopes"
                                closeMenuOnSelect={false}
                                components={animatedComponents}
                                isMulti
                                options={roleScopesOption}
                              />
                            </div>
                          </div>

                          <label
                            htmlFor="user-role"
                            className="info-required pr-5"
                          >
                            Permission
                          </label>
                          <div className="pb-3">
                            <Select
                              name="userRole"
                              onChange={(e) => {
                                let arrayPerm: string | any = e.map(
                                  (item: any) => item.value
                                );
                                setRoleCreate({
                                  ...roleCreate,
                                  rolePermission: arrayPerm.toString(),
                                });
                              }}
                              className="block w-full placeholder-gray-300 border-gray-300  text-gray-900  focus:z-10  sm:text-sm border border-gray-300 rounded-md shadow-sm "
                              placeholder="Select Role"
                              closeMenuOnSelect={false}
                              components={animatedComponents}
                              isMulti
                              options={RolePermOption}
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          data-bs-dismiss="modal"
                          style={{
                            fontWeight: 700,
                            fontSize: "20px",
                            lineHeight: "22px",
                            color: "white",
                            padding: "7px 17px",
                            position: "absolute",
                            backgroundColor: "#9c4141",
                            right: 130,
                            bottom: "-30px",
                          }}
                        >
                          Close
                        </button>
                        <button
                          className="btnEffect "
                          style={{
                            fontWeight: 700,
                            fontSize: "20px",
                            lineHeight: "22px",
                            color: "white",
                            padding: "7px 17px",
                            position: "absolute",
                            right: 30,
                            bottom: "-30px",
                          }}
                          onClick={() => {
                            formCreateRoleFecth(roleCreate);
                          }}
                        >
                          Create
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <table className="table-fixed  middle-main">
              <thead>
                <tr>
                  <th style={{ width: "4%" }}>STT</th>
                  <th
                    onClick={() => sorting("roleName")}
                    style={{ width: "15%" }}
                  >
                    {sort !== "ASC" ? (
                      <div className="d-flex align-items-center gap-2">
                        <p className="m-0">Name of Role</p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-caret-up-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                        </svg>
                      </div>
                    ) : (
                      <div className="d-flex align-items-center gap-2">
                        <p className="m-0">Name of Role</p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-caret-down-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                        </svg>{" "}
                      </div>
                    )}{" "}
                  </th>
                  <th>Description</th>
                  <th>Role Permission</th>
                  <th style={{ width: "15%", textAlign: "left" }}>
                    Role Scopes
                  </th>
                  <th style={{ width: "6%" }}>More</th>
                </tr>
              </thead>
              <tbody>
                {rolePagi
                  ?.filter((item: any) => {
                    return search.toLowerCase() === ""
                      ? item
                      : item.roleName.toLowerCase().includes(search);
                  })
                  .map((role: any, index) => {
                    return (
                      <tr key={role.id} className="item-material">
                        <td className="text-start">{index++}</td>
                        <td>{role.roleName}</td>
                        <td style={{ textAlign: "start" }}>
                          {role.roleDescription}
                        </td>
                        <td style={{ whiteSpace: "nowrap" }}>
                          {role.rolePermission}
                        </td>
                        <td style={{ textAlign: "left" }}>{role.roleScopes}</td>
                        <td className="d-flex">
                          <div>
                            <button
                              className="del-btn"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                              type="button"
                              onClick={() => {
                                setId(role.id);
                              }}
                            >
                              <img src="trash-icon.svg" alt="delete user" />
                            </button>

                            <div
                              className="modal fade"
                              id="exampleModal"
                              tabIndex={-1}
                              aria-labelledby="exampleModalLabel"
                              aria-hidden="true"
                            >
                              <div className="modal-dialog">
                                <div
                                  className="modal-content"
                                  style={{ width: "800px" }}
                                >
                                  <div className="modal-header">
                                    <h1
                                      className="modal-title fs-5"
                                      id="exampleModalLabel"
                                    >
                                      <img
                                        src="warning-icon.svg"
                                        alt="warning icon"
                                      />{" "}
                                      Delete this Role?
                                    </h1>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      data-bs-dismiss="modal"
                                      aria-label="Close"
                                    />
                                  </div>
                                  <div className="modal-body text-xl">
                                    Warning! This cannot be undone.
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="cancel-button"
                                      data-bs-dismiss="modal"
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      type="button"
                                      data-bs-dismiss="modal"
                                      className="del-user-button"
                                      onClick={() => {
                                        delRole({ id: idUser });
                                      }}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <button
                              className="edit-btn"
                              data-bs-toggle="modal"
                              data-bs-target="#editUser"
                              type="button"
                              onClick={() => {
                                getUserByRole({ id: role.id });
                              }}
                            >
                              <img src="edit-icon.svg" alt="edit user" />
                            </button>
                          </div>
                          <div>
                            <button
                              className="view-btn"
                              data-bs-toggle="modal"
                              data-bs-target="#roleDetail"
                              type="button"
                              onClick={() => {
                                // setUserDetail(user);
                                // getUserDetail({ id: user.id });

                                getUserByRole({ id: role.id });
                              }}
                            >
                              <img src="view-icon.svg" alt="view user" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
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
              className="modal fade edit-user w-full"
              id="roleDetail"
              tabIndex={-1}
              aria-labelledby="editUserModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content" style={{ width: "800px" }}>
                  <div className="modal-header">
                    <h1 className="modal-title" id="editUserModalLabel">
                      Role detail
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                  <div className=" flex justify-between w-full center modal-body">
                    <div style={{ width: "40%" }}>
                      <label htmlFor="first-name" className="info-required">
                        Role Name
                      </label>
                      <div className="pb-3">
                        <input
                          id="first-name"
                          name="roleName"
                          type="text"
                          value={roleDetail.roleName}
                          readOnly
                          className="block w-full placeholder-gray-300 border border-gray-300 px-7 py-2 text-gray-900 focus:z-10  focus:outline-none sm:text-sm rounded-md shadow-sm"
                          placeholder="Name of role"
                          style={{ borderRadius: 4 }}
                        />
                      </div>
                      <label htmlFor="first-name" className="info-required">
                        Role Description
                      </label>
                      <div className="pb-3">
                        <input
                          id="first-name"
                          name="roleDescription"
                          type="text"
                          value={roleDetail.roleDescription}
                          readOnly
                          className="block w-full placeholder-gray-300 border border-gray-300 px-7 py-2 text-gray-900 focus:z-10  focus:outline-none sm:text-sm rounded-md shadow-sm"
                          placeholder="Detailed description"
                          style={{ borderRadius: 4 }}
                        />
                      </div>
                    </div>
                    <div style={{ width: "55%" }}>
                      <label
                        htmlFor="roleScopes"
                        className="info-required pr-5"
                      >
                        Scopes
                      </label>
                      <div className="pb-3 flex items-left flex-column">
                        <input
                          id="first-name"
                          name="roleScopes"
                          type="text"
                          value={roleDetail.rolePermission}
                          readOnly
                          className="block w-full placeholder-gray-300 border border-gray-300 px-7 py-2 text-gray-900 focus:z-10  focus:outline-none sm:text-sm rounded-md shadow-sm"
                          placeholder="Detailed description"
                          style={{ borderRadius: 4 }}
                        />
                      </div>
                      <label
                        htmlFor="rolePermission"
                        className="info-required pr-5"
                      >
                        Permission
                      </label>
                      <div className=" flex items-left flex-column">
                        <input
                          id="first-name"
                          name="rolePermission"
                          type="text"
                          value={roleDetail.roleScopes}
                          readOnly
                          className="block w-full placeholder-gray-300 border border-gray-300 px-7 py-2 text-gray-900 focus:z-10  focus:outline-none sm:text-sm rounded-md shadow-sm"
                          placeholder="Detailed description"
                          style={{ borderRadius: 4 }}
                        />
                      </div>
                    </div>
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
              <div className="modal-dialog">
                <div className="modal-content" style={{ width: "800px" }}>
                  <div className="modal-header">
                    <h1 className="modal-title" id="editUserModalLabel">
                      Update Role
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                  <div className=" flex justify-between w-full center modal-body">
                    <div style={{ width: "40%" }}>
                      <label htmlFor="first-name" className="info-required">
                        Role Name
                      </label>
                      <div className="pb-3">
                        <input
                          id="first-name"
                          name="roleName"
                          type="text"
                          readOnly
                          disabled
                          value={idUser.roleName}
                          onChange={handleOnchange}
                          className="block w-full placeholder-gray-300 border border-gray-300 px-7 py-2 text-gray-900 focus:z-10  focus:outline-none sm:text-sm rounded-md shadow-sm"
                          placeholder="Name of role"
                          style={{ borderRadius: 4 }}
                        />
                      </div>
                      <label htmlFor="first-name" className="info-required">
                        Role Description
                      </label>
                      <div className="pb-3">
                        <input
                          id="first-name"
                          name="roleDescription"
                          type="text"
                          value={idUser.roleDescription}
                          onChange={(e) => {
                            setId({
                              ...idUser,
                              roleDescription: e.target.value,
                            });
                          }}
                          className="block w-full placeholder-gray-300 border border-gray-300 px-7 py-2 text-gray-900 focus:z-10  focus:outline-none sm:text-sm rounded-md shadow-sm"
                          style={{ borderRadius: 4 }}
                        />
                      </div>
                    </div>
                    <div style={{ width: "55%" }}>
                      <label
                        htmlFor="roleScopes"
                        className="info-required pr-5"
                      >
                        Scopes
                      </label>
                      <div className="pb-3 flex items-left flex-column">
                        <input
                          id="first-name"
                          name="roleScopes"
                          type="text"
                          value={idUser.roleScopes}
                          onChange={handleOnchange}
                          className="block w-full placeholder-gray-300 border border-gray-300 px-7 py-2 text-gray-900 focus:z-10  focus:outline-none sm:text-sm rounded-md shadow-sm"
                          placeholder="Detailed description"
                          style={{ borderRadius: 4 }}
                        />
                        <Select
                          options={roleScopesOption}
                          isMulti
                          components={animatedComponents}
                          onChange={(e) => {
                            let data = e.map((e: any) => e.value);
                            setId({
                              ...idUser,
                              roleScopes: data.toString(),
                            });
                          }}
                        />
                      </div>
                      <label
                        htmlFor="rolePermission"
                        className="info-required pr-5"
                      >
                        Permission
                      </label>
                      <div className=" flex items-left flex-column">
                        <input
                          id="first-name"
                          name="rolePermission"
                          type="text"
                          value={idUser.rolePermission}
                          onChange={handleOnchange}
                          className="block w-full placeholder-gray-300 border border-gray-300 px-7 py-2 text-gray-900 focus:z-10  focus:outline-none sm:text-sm rounded-md shadow-sm"
                          placeholder="Detailed description"
                          style={{ borderRadius: 4 }}
                        />
                        <Select
                          options={RolePermOption}
                          isMulti
                          components={animatedComponents}
                          onChange={(e) => {
                            let data = e.map((e: any) => e.value);
                            setId({
                              ...idUser,
                              rolePermission: data.toString(),
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer d-flex align-center ">
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
                        editRole(idUser);
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

export default Role;
