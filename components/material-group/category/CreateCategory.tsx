import React, {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Divider, Form, Input } from "semantic-ui-react";
import { categoryService } from "../../../recoil/services/categoryService";
import Router from "next/router";
import { notifiError } from "../../toastify-noti/notifi";

const CreateCategory = memo(() => {
  const [statQuantity, setStatQuantity] = useState([
    {
      name: "",
      description: "",
      stat: "",
      unit: "",
      isRequired: false,
    },
  ]);
  const [categoryTags, setCategoryTags] = useState([
    {
      name: "",
      id: "",
    },
  ]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [fieldArray, setFieldArray] = useState<any>({
    stat: "",
    unit: "",
    isRequired: false,
  });
  const [unitData, setUnitData] = useState<any>();
  const [statData, setStatData] = useState<any>();
  const checkedRef: any = useRef(null);
  console.log(fieldArray);
  const handleOnChangeCategory = useCallback(
    (e: any) => {
      const { value, name } = e.target;

      setFormData({
        ...formData,
        [name]: value,
      });
    },
    [setFormData, formData]
  );

  const handleCreateCategory = useCallback(async () => {
    if (
      formData.name !== "" &&
      fieldArray.unit !== "" &&
      fieldArray.stat !== ""
    ) {
      const createMeasurment = await categoryService.createCategory({
        formData,
        fieldArray,
      });
      Router.push("/material/category");
      return;
    }
    notifiError({ message: "fill up" });
  }, [formData, fieldArray]);
  console.log(formData, fieldArray);

  const getListCategory = useCallback(async () => {
    const result = await categoryService.getAllCategory();
    setCategoryTags(
      result.map((item: any) => {
        return { name: item.name, id: item.id };
      })
    );
    const unit = await categoryService.getAllUnits();
    setUnitData(unit);
    const stat = await categoryService.getAllStats();
    setStatData(stat);
  }, [setCategoryTags, setUnitData, setStatData]);

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
                <select
                  name="stat"
                  id={`caStat${index}`}
                  onChange={(e: any) => {
                    setFieldArray({
                      ...fieldArray,
                      [e.target.name]: e.target.value,
                    });
                  }}
                >
                  <option value="">Stat</option>
                  {statData?.map((stat: any, index: number) => {
                    return (
                      <option value={stat.id} key={index}>
                        {stat.name}
                      </option>
                    );
                  })}
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
              <label className="sr-only" htmlFor="unit">
                Unit
              </label>
              <div className="select-field">
                <select
                  name="unit"
                  id={`caUnit${index}`}
                  onChange={(e: any) => {
                    setFieldArray({
                      ...fieldArray,
                      [e.target.name]: e.target.value,
                    });
                  }}
                >
                  <option value="">Unit</option>
                  {unitData?.map((unit: any, index: number) => {
                    return (
                      <>
                        <option value={unit.id} key={index}>
                          {unit.name}
                        </option>
                      </>
                    );
                  })}
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
              <label htmlFor="isRequired">
                <input
                  type="checkbox"
                  id={`caRequired${index}`}
                  name="isRequired"
                  onChange={(e: any) => {
                    if (checkedRef.current.checked) {
                      setFieldArray({ ...fieldArray, isRequired: true });
                    } else {
                      setFieldArray({ ...fieldArray, isRequired: false });
                    }
                  }}
                  ref={checkedRef}
                  // checked={fieldArray.isRequired}x
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
                className={
                  statQuantity.length > 1 ? "create-row-category" : "d-none"
                }
                disabled={statQuantity.length > 1 ? false : true}
                onClick={() => {
                  console.log(statQuantity.length);
                  if (statQuantity.length > 1) {
                    statQuantity.splice(index, 1);
                    // setStatQuantity(...statQuantity)
                    setStatQuantity([...statQuantity]);
                  }
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
  // console.log(formData);
  useEffect(() => {
    renderField();
    getListCategory();
  }, []);
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
              <Form>
                <Form.Group>
                  <Form.Field
                    width={8}
                    control={Input}
                    required
                    placeholder="Fill in Category name "
                    id="name"
                    name="name"
                    label="Name"
                    onChange={handleOnChangeCategory}
                    error={formData.name !== "" ? false : true}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Field
                    control={Input}
                    width={8}
                    required
                    placeholder="Fill in Category description "
                    id="description"
                    name="description"
                    label="Description"
                    onChange={handleOnChangeCategory}
                    error={formData.description !== "" ? false : true}
                  />
                </Form.Group>
              </Form>
              <Divider />
              {renderField()}
              <div className="w-100 flex justify-end mt-5">
                <button
                  className="btnEffect create-button col-lg-3 position-static"
                  type="button"
                  onClick={() => {
                    handleCreateCategory();
                  }}
                >
                  Create
                </button>
              </div>
            </div>
            <div className="category-tag my-2">
              <h2 className="title-category">Category</h2>
              <div className="tags-group">
                <div className="tag-detail">
                  {categoryTags &&
                    categoryTags?.map((tag, index) => {
                      if (index > 19) {
                        return;
                      }
                      return (
                        <Fragment key={index}>
                          <div className="tag-item">
                            <label
                              htmlFor={`tag${index}`}
                              className="category-tag-name"
                            >
                              {tag.name}
                            </label>
                            <input
                              type="checkbox"
                              id={`tag${index}`}
                              name={`tag${index}`}
                              value={tag.id}
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
});

export default CreateCategory;
