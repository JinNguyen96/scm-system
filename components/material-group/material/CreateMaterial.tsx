import Router from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Form, Input } from "semantic-ui-react";
import { materialService } from "../../../recoil/services/materialService";

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
  MATERIAL_TYPE_ID: "type_id",
  MATERIAL_RAW_MATERIAL: "rawMaterial",
  MATERIAL_QUANTITY: "quantity",
  MATERIAL_GROUP: "group",
  MATERIAL_PRICE: "price",
  MATERIAL_SUBTOTAL: "subtotal",
  MATERIAL_STAT: "stat",
  MATERIAL_STATUS: "status",
  MATERIAL_NOTE: "note",
};

// const isFullFill = (data) => {};

const CreateMaterial = React.memo(() => {
  const [buttonSwitch, setButtonSwitch] = useState(true);
  const [error, setError] = useState({
    type: "",
    content: [],
  });

  const [materialForm, setMaterialForm] = useState<any>({
    name: "",
    no: 0,
    type_id: 0,
    rawMaterial: 0,
    quantity: "",
    group: "",
    price: 0,
    subtotal: "",
    stat: {
      statHeight: 0,
      statWeight: 0,
      statLength: 0,
      statColor: "",
      statThickness: 0,
      statVolume: 0,
    },
    status: "",
    note: "",
  });
  console.log(materialForm);
  const handleCreateMaterial = useCallback(async (data: object) => {
    const result = await materialService.createMaterial(data);
    console.log(result);
    if (result) Router.push("/material/material");
  }, []);

  const handleOnChange = useCallback(
    (e: any) => {
      const { name, value } = e.target;
      console.log(name);
      if (name.includes("stat") && name !== "status") {
        setMaterialForm({
          ...materialForm,
          stat: {
            ...materialForm.stat,
            [name]: value,
          },
        });
        return;
      }
      setMaterialForm({ ...materialForm, [name]: value });
    },
    [setMaterialForm, materialForm, materialForm.stat]
  );

  useEffect(() => {}, []);
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
                placeholder="Fill in Material name "
                id="name"
                name="name"
                required
              />
              <Form.Field
                onChange={handleOnChange}
                width={8}
                type="text"
                placeholder="Fill in Material name "
                id="quantity"
                name="quantity"
                control={Input}
                inline
                label="Safe Quantity"
              />
            </Form.Group>

            <Form.Group>
              <Form.Field
                onChange={handleOnChange}
                width={8}
                type="text"
                placeholder="Fill in Material name "
                id="status"
                name="status"
                control={Input}
                inline
                label="Status"
              />
              <Form.Field
                onChange={handleOnChange}
                width={8}
                type="text"
                placeholder="Fill in Material name "
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
                type="text"
                placeholder="Fill in Material price "
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
                type="text"
                placeholder="Fill in Material name "
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
                placeholder="Fill in Material name "
                id="group"
                name="group"
                inline
              />
              <Form.Field
                onChange={handleOnChange}
                width={8}
                label="Note"
                type="text"
                placeholder="Fill in Material name "
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
                inline
                required
                label="Category"
                type="text"
                placeholder="Fill in Material name "
                id="category"
                name="category"
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
              />
              <Form.Field
                onChange={handleOnChange}
                width={8}
                type="text"
                placeholder="Fill in Material raw  "
                id="rawMaterial"
                name="rawMaterial"
                label="Raw Material"
                inline
                control={Input}
              />
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
            <Form.Group>
              <Form.Field
                onChange={handleOnChange}
                width={8}
                control={Input}
                inline
                label="Height"
                type="text"
                placeholder="Fill in Material name "
                id="statHeight"
                name="statHeight"
              />
              <Form.Field
                onChange={handleOnChange}
                width={8}
                type="text"
                placeholder="Fill in Material raw  "
                id="statWeight"
                name="statWeight"
                label="Weight"
                inline
                control={Input}
              />
            </Form.Group>
            <Form.Group>
              <Form.Field
                onChange={handleOnChange}
                width={8}
                control={Input}
                inline
                label="Volume"
                type="text"
                placeholder="Fill in Material name "
                id="statVolume"
                name="statVolume"
              />
              <Form.Field
                onChange={handleOnChange}
                width={8}
                type="text"
                placeholder="Fill in Material raw  "
                id="statLength"
                name="statLength"
                label="Length"
                inline
                control={Input}
              />
            </Form.Group>
            <Form.Group>
              <Form.Field
                onChange={handleOnChange}
                width={8}
                control={Input}
                inline
                label="Color"
                type="text"
                placeholder="Fill in Material name "
                id="statColor"
                name="statColor"
              />
              <Form.Field
                onChange={handleOnChange}
                width={8}
                type="text"
                placeholder="Fill in Material raw  "
                id="statThickness"
                name="statThickness"
                label="Thickness"
                inline
                control={Input}
              />
            </Form.Group>
            {/* <div className="col-lg-6">
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
              </div> */}
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
