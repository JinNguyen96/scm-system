import Router from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Form, FormSelect, Input } from "semantic-ui-react";
import { materialService } from "../../../recoil/services/materialService";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { categoryService } from "../../../recoil/services/categoryService";
import async from "../../../pages/api/categoryApi/create-category";
import axios from "axios";
const animatedComponents = makeAnimated();

const errorCreateMaterialHandle = (errArr: any, type: string) => {
  // if (type === "confirmPassword") {
  //   return "Password not match";
  // }
  return errArr?.map((item: any) => {
    if (item.context.key === type) return item.message.split(`user`);
  });
};

const ErrorLog = {
  MATERIAL_NAME: "Name",
  MATERIAL_NO: "No",
  MATERIAL_TYPE_ID: "category_id",
  MATERIAL_RAW_MATERIAL: "rawMaterial",
  MATERIAL_QUANTITY: "quantity",
  MATERIAL_GROUP: "group",
  MATERIAL_PRICE: "price",
  MATERIAL_SUBTOTAL: "subtotal",
  MATERIAL_STAT: "stat",
  MATERIAL_STATUS: "status",
  MATERIAL_NOTE: "note",
};
const statusOption = [
  { key: "av", value: "available", text: "Available" },
  { key: "di", value: "disable", text: "Disable" },
];
// const isFullFill = (data) => {};

const CreateMaterial = React.memo(() => {
  const [buttonSwitch, setButtonSwitch] = useState(true);
  const [error, setError] = useState({
    type: "",
    content: [],
  });
  const [statById, setStatById] = useState({
    name: "",
    description: "",
  });
  const [materialForm, setMaterialForm] = useState<any>({
    name: "",
    no: 0,
    category_id: [""],
    rawMaterial: [""],
    quantity: "",
    group: "",
    price: 0,
    subtotal: "",
    status: "",
    metadata: "",
    note: "",
    safe_quantity: 0,
  });
  const [rawMaterial, setRawMaterial] = useState([]);
  const [categoryOption, setCategoryOption] = useState([]);

  const handleCreateMaterial = useCallback(async (data: object) => {
    const result = await materialService.createMaterial(data);
    console.log(result);

    if (result) Router.push("/material/material");
  }, []);

  const handleGetStat = useCallback(
    async (id: any) => {
      let stat = await categoryService.getStatById(id);
      setStatById(stat);
    },
    [setStatById]
  );

  const handleOnChange = useCallback(
    (e: any) => {
      const { name, value } = e.target;
      console.log(name);
      setMaterialForm({ ...materialForm, [name]: value });
    },
    [setMaterialForm, materialForm, materialForm.stat]
  );
  const getCategory = useCallback(async () => {
    const category = await categoryService.getAllCategory();
    if (category) {
      setCategoryOption(
        category.map((item: any) => {
          return { value: item.id, label: item.name };
        })
      );
    }
  }, [setCategoryOption]);

  const getRawMaterial = useCallback(async () => {
    const result = await materialService.getRawMaterial();
    if (result) {
      setRawMaterial(
        result.map((item: any) => {
          return { value: item.id, label: item.nameRawMater };
        })
      );
    }
  }, [setRawMaterial]);
  console.log(materialForm);
  useEffect(() => {
    getCategory();
    getRawMaterial();
  }, []);
  return (
    <div className="material page-layout">
      <div className="material-header page-header">
        <div className="row">
          <div className="col-lg-6 flex align-items-center">
            <h1 className="--title-page">Material / Create New Material</h1>
          </div>
        </div>
      </div>
      <div className="material-main layout-create">
        <div className="form-create">
          <Form
            unstackable
            className={
              buttonSwitch === true
                ? "row form-detail form-relative"
                : "row form-detail  d-none"
            }
          >
            {/* <label htmlFor="name">Name</label> */}
            <Form.Group>
              <Form.Field
                width={8}
                label="Name"
                control={Input}
                onChange={handleOnChange}
                // error={
                //   error.type === "ERROR"
                //     ? {
                //         content: errorCreateMaterialHandle(
                //           error.content,
                //           err.NAME
                //         ),
                //         pointing: "below",
                //       }
                //     : error.type === "VALID"
                //     ? { content: "Email already exists" }
                //     : null
                // }
                inline
                type="text"
                placeholder="Fill in name "
                id="name"
                name="name"
                required
              />
              <Form.Field
                onChange={handleOnChange}
                width={8}
                type="text"
                placeholder="Fill in quantity "
                id="quantity"
                name="quantity"
                control={Input}
                inline
                label="Quantity"
              />
            </Form.Group>

            <Form.Group>
              <FormSelect
                onChange={(e: any) => {
                  setMaterialForm({
                    ...materialForm,
                    status: e.target.innerText,
                  });
                }}
                width={8}
                // type="text"
                placeholder="Drop status "
                id="status"
                name="status"
                control={Form.Select}
                inline
                label="Status"
                options={statusOption}
              />
              <Form.Field
                onChange={handleOnChange}
                width={8}
                type="text"
                placeholder="Fill in subtotal "
                id="subtotal"
                name="subtotal"
                control={Input}
                inline
                label="Subtotal"
              />
            </Form.Group>

            <Form.Group>
              <Form.Field
                onChange={handleOnChange}
                width={8}
                control={Input}
                type="number"
                placeholder="Fill in price "
                id="price"
                name="price"
                inline
                label="Price"
              />
              <Form.Field
                onChange={handleOnChange}
                width={8}
                control={Input}
                inline
                label="No"
                type="number"
                placeholder="Fill in no "
                id="no"
                name="no"
              />
            </Form.Group>

            <Form.Group>
              <Form.Field
                onChange={handleOnChange}
                control={Input}
                width={8}
                label="Group"
                type="text"
                placeholder="Fill in group "
                id="group"
                name="group"
                inline
              />
              <Form.Field
                onChange={handleOnChange}
                width={8}
                label="Note"
                type="text"
                placeholder="Fill in note "
                id="note"
                name="note"
                inline
                control={Input}
              />
            </Form.Group>

            <Form.Group>
              <Form.Field
                onChange={handleOnChange}
                width={8}
                control={Input}
                type="number"
                placeholder="Fill in safe quantity "
                id="safe_quantity"
                name="safe_quantity"
                inline
                label="Safe Quantity"
              />
            </Form.Group>
            <Form.Group>
              <Form.Field width={8}>
                <label>Category</label>
                <Select
                  name="category"
                  className="block w-full placeholder-gray-300 border-gray-300  text-gray-900  focus:z-10 focus:outline-none sm:text-sm   border border-gray-300 rounded-md shadow-sm"
                  placeholder="Select Category"
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  options={categoryOption}
                  onChange={(e) => {
                    let arrayRole: string | any = e.map((item: any) => {
                      handleGetStat({ id: item.value });

                      return item.value;
                    });
                    setMaterialForm({
                      ...materialForm,
                      category_id: arrayRole,
                    });
                    console.log(arrayRole);
                  }}
                />
              </Form.Field>

              <Form.Field width={8}>
                <label>Raw Material</label>
                <Select
                  name="rawMaterial"
                  className="block w-full placeholder-gray-300 border-gray-300  text-gray-900  focus:z-10 focus:outline-none sm:text-sm   border border-gray-300 rounded-md shadow-sm"
                  placeholder="Select Raw Material"
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  options={rawMaterial}
                  onChange={(e) => {
                    let arrayRole: string | any = e.map((item: any) => {
                      return item.value;
                    });
                    setMaterialForm({
                      ...materialForm,
                      rawMaterial: arrayRole.toString(),
                    });
                    console.log(arrayRole);
                  }}
                />
              </Form.Field>
            </Form.Group>
            <Button
              className="btnEffect create-button "
              type="button"
              onClick={() => {
                setButtonSwitch(!buttonSwitch);
                console.log(buttonSwitch);
              }}
            >
              Next
            </Button>
          </Form>
          <Form
            className={
              buttonSwitch === false
                ? "row form-detail  form-relative"
                : "row form-detail  d-none"
            }
          >
            <div className="form-header col-lg-12">
              <h2>Stat</h2>
            </div>
            {materialForm.category_id &&
              materialForm.category_id?.map((category: any, index: number) => {
                // handleGetStat({ id: category });
                console.log(statById);
                return (
                  <div key={index}>
                    <Form.Field
                      // onChange={}
                      width={8}
                      control={Input}
                      inline
                      label={statById.name}
                      type="text"
                      placeholder={`Fill in Material ${statById.name}`}
                      id={statById.name}
                      name={statById.name}
                      onChange={(e: any) => {
                        setMaterialForm({
                          ...materialForm,
                          metadata: e.target.value,
                        });
                      }}
                    />
                  </div>
                );
              })}

            <Button
              className="btnEffect create-button"
              type="button"
              onClick={() => {
                // console.log(materialForm.name !== "");
                // const isFill = materialForm.Object(keys)
                if (materialForm.name === "" && materialForm.category === "") {
                  setButtonSwitch(false);
                  return;
                }
                handleCreateMaterial(materialForm);
              }}
            >
              Create
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
});

export default CreateMaterial;
