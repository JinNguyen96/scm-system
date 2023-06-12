import React, { useEffect, useState } from "react";

export default function EditMaterial() {
  const [buttonSwitch, setButtonSwitch] = useState(true);
  useEffect(() => {}, []);
  return (
    <>
      <div className="material page-layout">
        <div className="material-header page-header">
          <div className="row">
            <div className="col-lg-6 flex align-items-center">
              <h1 className="--title-page">Material / View Material</h1>
            </div>
          </div>
        </div>
        <div className="material-main layout-create">
          <div className="button-switch-create ">
            <span
              onClick={() => {
                setButtonSwitch(true);
                console.log(buttonSwitch);
              }}
              className={
                buttonSwitch === true
                  ? "button-detail switch-content"
                  : "button-detail"
              }
            >
              Detail
            </span>
            <span
              onClick={() => {
                setButtonSwitch(false);
                console.log(buttonSwitch);
              }}
              className={
                buttonSwitch !== true
                  ? "button-detail switch-content"
                  : "button-detail"
              }
            >
              Stat
            </span>
            <span
              className={buttonSwitch === true ? "" : "switch-active"}
            ></span>
          </div>
          <div className="form-create">
            <form
              className={
                buttonSwitch === true
                  ? "row form-detail row-cols-4"
                  : "row form-detail row-cols-4 d-none"
              }
            >
              <div className="col-lg-6">
                <label htmlFor="maName">Name</label>
                <div className="group-input search-bar">
                  <input
                    type="text"
                    placeholder="Fill in Material name "
                    id="maName"
                    name="maName"
                  />
                  <span className="error-message">Required</span>
                </div>
              </div>
              <div className="col-lg-6">
                <label htmlFor="maQuality">Safe Quantity</label>
                <div className="group-input search-bar">
                  <input
                    type="text"
                    placeholder="Fill in Material name "
                    id="maQuality"
                    name="maQuality"
                  />
                  <span className="error-message">Required</span>
                </div>
              </div>
              <div className="col-lg-6">
                <label htmlFor="maCategory">Category </label>
                <div className="group-input search-bar ">
                  <div className="tag-name ">
                    Jean
                    <span>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16 16L8 8"
                          stroke="#B3B3B3"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16 8L8 16"
                          stroke="#B3B3B3"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="tag-name ">
                    Jean
                    <span>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16 16L8 8"
                          stroke="#B3B3B3"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16 8L8 16"
                          stroke="#B3B3B3"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="Fill in Material name "
                    id="maCategory"
                    name="maCategory"
                    className="col-lg-12"
                  />
                  <span className="error-message">Required</span>
                </div>
              </div>
              <div className="col-lg-6">
                <label htmlFor="maStatus">Status </label>
                <div className="group-input search-bar">
                  <input
                    type="text"
                    placeholder="Fill in Material name "
                    id="maStatus"
                    name="maStatus"
                  />
                  <span className="error-message">Required</span>
                </div>
              </div>
              <div className="col-lg-6">
                <label htmlFor="maGroup">Group</label>
                <div className="group-input search-bar">
                  <input
                    type="text"
                    placeholder="Fill in Material name "
                    id="maGroup"
                    name="maGroup"
                  />
                  <span className="error-message">Required</span>
                </div>
              </div>
              <div className="col-lg-6">
                <label htmlFor="maColor">Color</label>
                <div className="group-input search-bar">
                  <input
                    type="text"
                    placeholder="Fill in Material name "
                    id="maColor"
                    name="maColor"
                  />
                  <span className="error-message">Required</span>
                </div>
              </div>
              <div className="col-lg-6">
                <label htmlFor="maNote">Note</label>
                <div className="group-input search-bar">
                  <input
                    type="text"
                    placeholder="Fill in Material name "
                    id="maNote"
                    name="maNote"
                  />
                  <span className="error-message">Required</span>
                </div>
              </div>
            </form>
            <form
              className={
                buttonSwitch === false
                  ? "row form-detail row-cols-4"
                  : "row form-detail row-cols-4 d-none"
              }
            >
              <div className="col-lg-6">
                <label htmlFor="maHeight">Height</label>
                <div className="group-input search-bar">
                  <input
                    type="text"
                    placeholder="Fill in Material name "
                    id="maHeight"
                    name="maHeight"
                  />
                  <span className="error-message">Required</span>
                </div>
              </div>
              <div className="col-lg-6">
                <label htmlFor="maVolumn">Volume</label>
                <div className="group-input search-bar">
                  <input
                    type="text"
                    placeholder="Fill in Material name "
                    id="maVolumn"
                    name="maVolumn"
                  />
                  <span className="error-message">Required</span>
                </div>
              </div>
              <div className="col-lg-6">
                <label htmlFor="maWeight">Weight</label>
                <div className="group-input search-bar">
                  <input
                    type="text"
                    placeholder="Fill in Material name "
                    id="maWeight"
                    name="maWeight"
                  />
                  <span className="error-message">Required</span>
                </div>
              </div>
              <div className="col-lg-6">
                <label htmlFor="maStatus">Status </label>
                <div className="group-input search-bar">
                  <input
                    type="text"
                    placeholder="Fill in Material name "
                    id="maStatus"
                    name="maStatus"
                  />
                  <span className="error-message">Required</span>
                </div>
              </div>
              <div className="col-lg-6">
                <label htmlFor="maLenght">Lenght</label>
                <div className="group-input search-bar">
                  <input
                    type="text"
                    placeholder="Fill in Material name "
                    id="maLenght"
                    name="maLenght"
                  />
                  <span className="error-message">Required</span>
                </div>
              </div>
              <div className="col-lg-6">
                <label htmlFor="maColor">Color</label>
                <div className="group-input search-bar">
                  <input
                    type="text"
                    placeholder="Fill in Material name "
                    id="maColor"
                    name="maColor"
                  />
                  <span className="error-message">Required</span>
                </div>
              </div>
              <div className="col-lg-6">
                <label htmlFor="maThickness">Thickness</label>
                <div className="group-input search-bar">
                  <input
                    type="text"
                    placeholder="Fill in Material name "
                    id="maThickness"
                    name="maThickness"
                  />
                  <span className="error-message">Required</span>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="material-footer material-create-footer"></div>
      </div>
    </>
  );
}
