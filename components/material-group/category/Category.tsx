import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { categoryService } from "../../../recoil/services/categoryService";
import Pagination from "../../panigation";
import { useSetRecoilState } from "recoil";
import { setCurrentModalState } from "../../../recoil/Modal/modalState";
import { ModalType } from "../../../constain/ModalType";
import { setEditcategoryState } from "../../../recoil/material/categoryRecoil";
import moment from "moment";
function Category() {
  const [listData, setListData] = useState([
    {
      name: "",
      description: "",
      updatedAt: "",
    },
  ]);
  const setTypeModal = useSetRecoilState(setCurrentModalState);
  const setCategoryState = useSetRecoilState(setEditcategoryState);
  const getListCategory = useCallback(async () => {
    const result = await categoryService.getAllCategory();
    setListData(result);
  }, []);
  const [tmurList, setTmurList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryPerPage, setCategoryPerPage] = useState(5);
  const lastIndex = currentPage * categoryPerPage;
  const firstIndex = lastIndex - categoryPerPage;
  const catePagi = listData.slice(firstIndex, lastIndex);
  const npage = Math.ceil(listData.length / categoryPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const handleChangeInput = (index: any): any => {
    if (typeof window !== "undefined") {
      let inputIndex = document?.getElementById(
        `input${index}`
      ) as HTMLInputElement | null;
      let tdIndex = document.getElementById(
        `td${index + 1}`
      ) as HTMLInputElement | null;
      let deleteIndex = document.getElementById(
        `delete${index}`
      ) as HTMLInputElement | null;
      inputIndex?.checked
        ? tdIndex?.classList.add("input-checked-table")
        : tdIndex?.classList.remove("input-checked-table");
      inputIndex?.checked
        ? deleteIndex?.classList.remove("hidden")
        : deleteIndex?.classList.add("hidden");
    }
  };

  const getListTMUR = useCallback(async () => {
    const result = await categoryService.getTMURs();
    setTmurList(result);
  }, []);
  console.log(tmurList);
  useEffect(() => {
    getListCategory();
    getListTMUR();
  }, []);
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
              <span>All ({catePagi.length}) </span>
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
                {catePagi?.map((item: any, index: number) => {
                  return (
                    <>
                      <tr
                        key={index}
                        className="item-material"
                        onChange={() => {
                          handleChangeInput(index);
                        }}
                        id={`td${index + 1}`}
                      >
                        <td className="checkbox-material">
                          <input
                            type="checkbox"
                            id={`input${index}`}
                            onChange={() => {
                              handleChangeInput(index);
                            }}
                          />
                        </td>
                        <td className="name-material">
                          <span>{item.name}</span>
                        </td>
                        <td className="category-material">
                          <span>{/* {tmurList.map(item=> item)} */}</span>
                        </td>

                        <td className="date-material">
                          <span>{item.updatedAt.slice(0, 10)}</span>
                        </td>
                        <td className="option-material">
                          <div
                            className="delete-material hidden cursor-pointer"
                            id={`delete${index}`}
                            onClick={() => {
                              console.log(item.id);
                              setCategoryState({
                                type: ModalType.VIEW_CATEGORY,
                                data: item,
                              });
                              setTypeModal({
                                typeModal: ModalType.DELETE_CATEGORY,
                              });
                              // handleDeleteCategory(item.id);
                            }}
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
            <select
              name="pagi-item-material"
              id="pagi-item-material"
              onChange={(e) => {
                setCurrentPage(1);
                setCategoryPerPage(Number(e.target.value));
              }}
            >
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

export default Category;
