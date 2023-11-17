import axios from "axios";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { ModalType } from "../../../constain/ModalType";
import { setEditMaterialState } from "../../../recoil/material/materialRecoil";
import { setCurrentModalState } from "../../../recoil/Modal/modalState";
import Pagination from "../../panigation";
import SupplierTable from "./SupplierTable";
import useSupplier from "../../../recoil/hook/useSupplier";
import {
  getDataSupplierTableState,

} from "../../../recoil/material/supplierRecoil";

const Supplier = React.memo(() => {
  const { handleGetListSupplier } = useSupplier();
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");

  const supplierList = useRecoilValue(getDataSupplierTableState);

  const handleSelect = useCallback(
    (
      deleteOption: HTMLInputElement | null,
      moreOption: HTMLInputElement | null
    ) => {
      if (count === 1) {
        deleteOption?.classList.add("hidden");
        moreOption?.classList.remove("hidden");
      } else if (count > 1) {
        deleteOption?.classList.remove("hidden");
        moreOption?.classList.add("hidden");
      } else {
        deleteOption?.classList.add("hidden");
        moreOption?.classList.add("hidden");
      }
      setCount(count + 1);
    },
    [count]
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [supplierPerPage, setMaterialPerPag] = useState(5);
  const lastIndex = currentPage * supplierPerPage;
  const firstIndex = lastIndex - supplierPerPage;
  const supplierPagi = supplierList.data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(supplierList.data.length / supplierPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  useEffect(() => {
    handleGetListSupplier();
  }, []);

  return (
    <>
      <div className="material">
        <div className="material-header page-header">
          <div className="row">
            <div className="col-lg-6 flex align-items-center">
              <h1 className="--title-page">SUPPLIER</h1>
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
        <div className="material-main">
          <div className="top-main row">
            <div className="side-top-main col-lg-6 relative d-flex gap-1 align-items-center">
              <span>All ({supplierList.data.length}) </span>
              <Link href="create-supplier" className="--button-create">
                Create new supplier
              </Link>

              <a href="#" className="inline-block">
                <img src="/download-user.svg" alt="download icon" />
              </a>
            </div>
          </div>
          <div className="middle-main mt-2">
            <SupplierTable
              search={search}
              supplierPagi={supplierPagi}
              delSupplier={undefined}
              setformUpdate={undefined}
              getUserDetail={undefined}
              getTypeDetail={undefined}
            />
          </div>
        </div>
        <div className="material-footer">
          <div className="n-item-pagination">
            <label htmlFor="pagi-item-material">Showing </label>
            <select
              name="pagi-item-material"
              id="pagi-item-material"
              onChange={(e) => {
                setMaterialPerPag(Number(e.target.value));
                setCurrentPage(1);
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
});

export default Supplier;