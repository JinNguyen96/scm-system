import Link from "next/link";
import React, { useEffect, useState } from "react";
import Pagination from "../../panigation";

function Category() {
  const categoryMaterialData = [
    {
      caName: "Block fabric",
      caDescription: "Height 2 cm,... ",
      caDateUpdate: "2023-01-25",
    },
    {
      caName: "Jeans ",
      caDescription: "Height 2 cm,... ",
      caDateUpdate: "2023-01-25",
    },
    {
      caName: "Dye ",
      caDescription: "Height 2 cm,... ",
      caDateUpdate: "2023-01-25",
    },
    {
      caName: "Iron ",
      caDescription: "Height 2 cm,... ",
      caDateUpdate: "2023-01-25",
    },
    {
      caName: "Block fabric",
      caDescription: "Height 2 cm,... ",
      caDateUpdate: "2023-01-25",
    },
    {
      caName: "Yarn ",
      caDescription: "Height 2 cm,... ",
      caDateUpdate: "2023-01-25",
    },
    {
      caName: "Table ",
      caDescription: "Height 2 cm,... ",
      caDateUpdate: "2023-01-25",
    },
    {
      caName: "... ",
      caDescription: "... ",
      caDateUpdate: "2023-01-25",
    },
    {
      caName: "... ",
      caDescription: "... ",
      caDateUpdate: "2023-01-25",
    },
    {
      caName: "... ",
      caDescription: "... ",
      caDateUpdate: "2023-01-25",
    },
    {
      caName: "... ",
      caDescription: "... ",
      caDateUpdate: "2023-01-25",
    },
    {
      caName: "... ",
      caDescription: "... ",
      caDateUpdate: "2023-01-25",
    },
  ];

  const npage = Math.ceil(categoryMaterialData.length / 2);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  const [count, setCount] = useState(0);
  const handleChangeInput = (index: any): any => {
    if (typeof window !== "undefined") {
      let inputIndex = document?.getElementById(
        `input${index}`
      ) as HTMLInputElement | null;
      let tdIndex = document.getElementById(
        `td${index + 1}`
      ) as HTMLInputElement | null;
      let optiionIndex = document.getElementById(
        `option${index}`
      ) as HTMLInputElement | null;
      let deleteIndex = document.getElementById(
        `delete${index}`
      ) as HTMLInputElement | null;
      inputIndex?.checked
        ? tdIndex?.classList.add("input-checked-table")
        : tdIndex?.classList.remove("input-checked-table");
      inputIndex?.checked ? setCount(count + 1) : setCount(count - 1);
      if (count === 1) {
        deleteIndex?.classList.remove("hidden");
      } else if (count > 1) {
        deleteIndex?.classList.add("hidden");
        optiionIndex?.classList.remove("hidden");
      } else {
        deleteIndex?.classList.add("hidden");
        optiionIndex?.classList.add("hidden");
      }
    }
  };

  useEffect(() => {}, [count]);
  return (
    <>
      <div className="material category">
        <div className="material-header page-header category-header">
          <div className="row">
            <div className="col-lg-6 flex align-items-center">
              <h1 className="--title-page">CATEGORY MATERIAL </h1>
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
                  // setSearch(e.target.value);
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
          <div className="top-main row ">
            <div className="side-top-main col-lg-6 relative d-flex gap-1 align-items-center">
              <span>All (20) </span>
              <Link href="create-category" className="--button-create">
                Create new Category
              </Link>

              <a href="#" className="inline-block">
                <img src="/download-user.svg" alt="download icon" />
              </a>
            </div>
          </div>
          <div className="middle-main">
            <table className="w-full">
              <thead>
                <tr className="text-center ">
                  <th className="header-select"></th>
                  <th>Name</th>
                  <th className="header-description">Description</th>
                  <th className="header-update">Day Update</th>
                  <th className="header-option"></th>
                </tr>
              </thead>
              <tbody>
                {categoryMaterialData.map((item: any, index: number) => {
                  return (
                    <>
                      <tr
                        key={index}
                        className="item-material"
                        onChange={() => {
                          console.log(index);
                          handleChangeInput(index);
                          console.log(count, "inputIndex");
                        }}
                        id={`td${index + 1}`}
                      >
                        <td className="checkbox-material">
                          <input
                            type="checkbox"
                            id={`input${index}`}
                            onChange={() => {
                              console.log(index);
                              handleChangeInput(index);
                            }}
                          />
                        </td>
                        <td className="name-material">
                          <span>{item.caName}</span>
                        </td>
                        <td className="category-material">
                          <span>{item.caDescription} </span>
                        </td>

                        <td className="date-material">
                          <span>{item.caDateUpdate}</span>
                        </td>
                        <td className="option-material">
                          <div
                            className="delete-material hidden"
                            id={`delete${index}`}
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8.57143 7V4.8C8.57143 4.32261 8.75204 3.86477 9.07353 3.52721C9.39502 3.18964 9.83106 3 10.2857 3H13.7143C14.1689 3 14.605 3.18964 14.9265 3.52721C15.248 3.86477 15.4286 4.32261 15.4286 4.8V7M19 7L18 19.2C18 19.6774 17.8194 20.1352 17.4979 20.4728C17.1764 20.8104 16.7404 21 16.2857 21H7.71429C7.25963 21 6.82359 20.8104 6.5021 20.4728C6.18061 20.1352 6 19.6774 6 19.2L5 7H19Z"
                                stroke="#14181F"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M4 7H5.77778H20"
                                stroke="#14181F"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M10 11V16"
                                stroke="#14181F"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M14 11V16"
                                stroke="#14181F"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <div
                            className="more-option-material hidden"
                            id={`option${index}`}
                          >
                            <svg
                              className="dropdown-toggle"
                              href="#"
                              role="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                              width="28"
                              height="9"
                              viewBox="0 0 28 9"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M3.88889 1.55241C5.06098 1.55241 6.27778 2.66371 6.27778 4.38155C6.27778 6.0994 5.06098 7.21069 3.88889 7.21069C2.7168 7.21069 1.5 6.0994 1.5 4.38155C1.5 2.66371 2.7168 1.55241 3.88889 1.55241ZM14 1.55241C15.1721 1.55241 16.3889 2.66371 16.3889 4.38155C16.3889 6.0994 15.1721 7.21069 14 7.21069C12.8279 7.21069 11.6111 6.0994 11.6111 4.38155C11.6111 2.66371 12.8279 1.55241 14 1.55241ZM24.1111 1.55241C25.2832 1.55241 26.5 2.66371 26.5 4.38155C26.5 6.0994 25.2832 7.21069 24.1111 7.21069C22.939 7.21069 21.7222 6.0994 21.7222 4.38155C21.7222 2.66371 22.939 1.55241 24.1111 1.55241Z"
                                stroke="#191414"
                                strokeWidth="3"
                              />
                            </svg>
                            <div className="dropdown">
                              <ul className="dropdown-menu">
                                <li>
                                  <a className="dropdown-item" href="#">
                                    Delete
                                  </a>
                                </li>
                                <li>
                                  <Link
                                    href="create-category"
                                    className="dropdown-item"
                                  >
                                    Edit
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href="create-category"
                                    className="dropdown-item"
                                  >
                                    View Detail
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
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
              currentPage={1}
              changePage={changePage}
              prePage={prePage}
              numbers={numbers}
              nextPage={nextPage}
            />
          </div>
        </div>
      </div>
    </>
  );
  function prePage() {
    // if (currentPage !== 1) {
    //   setCurrentPage(currentPage - 1);
    // }
  }
  function changePage(n: number) {
    // setCurrentPage(n);
  }
  function nextPage() {
    // if (currentPage !== npage) {
    //   setCurrentPage(currentPage + 1);
    // }
  }
}

export default Category;
