import React, { Fragment, useEffect, useState } from "react";

function CreateCategory() {
  const [statQuantity, setStatQuantity] = useState([
    {
      name: "",
      description: "",
      stat: "",
      unit: "",
      isRequired: true,
    },
    {
      name: "",
      description: "",
      stat: "",
      unit: "",
      isRequired: true,
    },
  ]);

  const categoryTags = [
    { caName: "Jeans" },
    { caName: "Iron" },
    { caName: "Table" },
    { caName: "..." },
    { caName: "..." },
    { caName: "..." },
    { caName: "..." },
    { caName: "..." },
    { caName: "..." },
    { caName: "..." },
    { caName: "..." },
    { caName: "..." },
    { caName: "..." },
    { caName: "..." },
    { caName: "..." },
  ];
  const renderField = () => {
    return statQuantity.map((item: any, index: number) => {
      return (
        <div className="option-create " key={index}>
          <div className="row">
            <div className="col-lg-4 drop-category">
              <label className="sr-only" htmlFor={`caStat${index}`}>
                Stat
              </label>
              <div className="select-field">
                <select name={`caStat${index}`} id={`caStat${index}`}>
                  <option value="">Stat</option>
                  <option value="stat1">Stat-1</option>
                  <option value="stat2">Stat-2</option>
                  <option value="stat3">Stat-3</option>
                </select>
                <img
                  className="icon-category"
                  src="/stat-icon.svg"
                  alt="stat icon"
                />
                <img
                  src="/dropdown-icon.svg"
                  alt="dropdown icon"
                  className="icon-drop-category"
                />
              </div>
            </div>
            <div className="col-lg-4 drop-category">
              <label className="sr-only" htmlFor={`caUnit${index}`}>
                Unit
              </label>
              <div className="select-field">
                <select name={`caUnit${index}`} id={`caUnit${index}`}>
                  <option value="">Unit</option>
                  <option value="unit1">unit-1</option>
                  <option value="unit2">unit-2</option>
                  <option value="unit3">unit-3</option>
                </select>
                <img
                  className="icon-category"
                  src="/unit-icon.svg"
                  alt="stat icon"
                />
                <img
                  src="/dropdown-icon.svg"
                  alt="dropdown icon"
                  className="icon-drop-category"
                />
              </div>
            </div>
            <div className="col-lg-3 drop-category">
              <label htmlFor={`caRequired${index}`}>
                <input
                  type="checkbox"
                  id={`caRequired${index}`}
                  name={`caRequired${index}`}
                />
                <img
                  className="icon-category"
                  src="/required-icon.svg"
                  alt="stat icon"
                />
                Required
              </label>
            </div>
            <div className="col-lg-1 drop-category">
              <button
                className="create-row-category"
                onClick={() => {
                  setStatQuantity([
                    ...statQuantity,
                    {
                      name: "",
                      description: "",
                      stat: "",
                      unit: "",
                      isRequired: false,
                    },
                  ]);
                  console.log(statQuantity);
                }}
              >
                <img src="/plus-icon.svg" alt="plus icon" />
              </button>
              <button
                className="create-row-category"
                onClick={() => {
                    statQuantity.splice(index,1)
                console.log(statQuantity)
                // setStatQuantity(...statQuantity)
                setStatQuantity([...statQuantity])
                }}
              >
                {" "}
                <img src="/devine-icon.svg" alt="plus icon" />
              </button>
            </div>
          </div>
        </div>
      );
    });
  };
  useEffect(() => {
    renderField();
  }, [statQuantity]);
  return (
    <>
      <div className="category page-layout">
        <div className="category-header page-layout">
          <div className="row">
            <div className="col-lg-6 flex align-items-center">
              <h1 className="--title-page">Category / Create New Category</h1>
            </div>
          </div>
        </div>
        <div className="category-main layout-create ">
          <div className="form-create-category form-create ">
            <div className="form-detail form-relative mb-5">
              <div className="quantity-stat">
                <p>All ({statQuantity.length})</p>
              </div>
              <div className="row row-cols-2 flex-column gap-5 mb-5">
                <div className="col-lg-6">
                  <label htmlFor="caName">Name</label>
                  <div className="group-input search-bar">
                    <input
                      type="text"
                      placeholder="Fill in Category name "
                      id="caName"
                      name="caName"
                    />
                    <span className="error-message">Required</span>
                  </div>
                </div>
                <div className="col-lg-6">
                  <label htmlFor="caDescription">Description</label>
                  <div className="group-input search-bar">
                    <input
                      type="text"
                      placeholder="Fill in Category description "
                      id="caDescription"
                      name="caDescription"
                    />
                    <span className="error-message">Required</span>
                  </div>
                </div>
              </div>
              {renderField()}
              <div className="w-100 flex justify-end mt-5">
                <button
                  className="btnEffect create-button col-lg-3 position-static"
                  type="button"
                  onClick={() => {}}
                >
                  Save
                </button>
              </div>
            </div>
            <div className="category-tag my-2">
              <h2 className="title-category">Category</h2>
              <div className="tags-group">
                <div className="tag-detail">
                  {categoryTags.map((tag, index) => {
                    return (
                      <Fragment key={index}>
                        <div className="tag-item">
                          <label htmlFor={`tag${index}`}>{tag.caName}</label>
                          <input
                            type="checkbox"
                            id={`tag${index}`}
                            name={`tag${index}`}
                            value={tag.caName}
                          />
                        </div>
                      </Fragment>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="category-footer"></div>
      </div>
    </>
  );
}

export default CreateCategory;
