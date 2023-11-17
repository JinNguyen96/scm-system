import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Button, Form, Input } from "semantic-ui-react";
import { setEditMaterialState } from "../../recoil/material/materialRecoil";

export default function ViewWarehouse() {
  const materialData = useRecoilValue(setEditMaterialState);
  const { data } = materialData;

  const [buttonSwitch, setButtonSwitch] = useState(true);
  useEffect(() => {}, []);
  return (
    <>
      <div className="material page-layout">
        <div className="material-header page-header">
          <div className="row">
            <div className="col-lg-6 flex align-items-center">
              <h1 className="--title-page">Warehouse / View Warehouse</h1>
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
                buttonSwitch !== true
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
                buttonSwitch === true
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
                  value={data.name}
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
                  width={8}
                  type="text"
                  placeholder="Fill in Material name "
                  id="quantity"
                  name="quantity"
                  control={Input}
                  inline
                  label="Safe Quantity"
                  value={data.quantity}
                />
              </Form.Group>

              <Form.Group>
                <Form.Field
                  width={8}
                  type="text"
                  placeholder="Fill in Material name "
                  id="status"
                  name="status"
                  control={Input}
                  inline
                  label="Status"
                  value={data.status}
                />
                <Form.Field
                  width={8}
                  type="text"
                  placeholder="Fill in Material name "
                  id="subtotal"
                  name="subtotal"
                  control={Input}
                  inline
                  label="Subtotal"
                  value={data.subtotal}
                />
              </Form.Group>

              <Form.Group>
                <Form.Field
                  width={8}
                  control={Input}
                  type="text"
                  placeholder="Fill in Material price "
                  id="price"
                  name="price"
                  inline
                  label="Price"
                  value={data.price}
                />
                <Form.Field
                  width={8}
                  control={Input}
                  inline
                  label="No"
                  type="text"
                  placeholder="Fill in Material name "
                  id="no"
                  name="no"
                  value={data.no}
                />
              </Form.Group>

              <Form.Group>
                <Form.Field
                  control={Input}
                  width={8}
                  label="Group"
                  type="text"
                  placeholder="Fill in Material name "
                  id="group"
                  name="group"
                  inline
                  value={data.group}
                />
                <Form.Field
                  width={8}
                  label="Note"
                  type="text"
                  placeholder="Fill in Material name "
                  id="note"
                  name="note"
                  inline
                  control={Input}
                  value={data.note}
                />
              </Form.Group>

              <Form.Group>
                <Form.Field
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
                  width={8}
                  type="text"
                  placeholder="Fill in Material raw  "
                  id="rawMaterial"
                  name="rawMaterial"
                  label="Raw Material"
                  inline
                  control={Input}
                  value={data.rawMaterial}
                />
              </Form.Group>
            </Form>
            <Form
              className={
                buttonSwitch === false
                  ? "row form-detail  form-relative"
                  : "row form-detail  d-none"
              }
            >
              <Form.Group>
                <Form.Field
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
              {/* <Form.Group className="d-flex justify-content-end gap-4">
                <button
                  onClick={() => {
                    setButtonSwitch(false);
                  }}
                  className="btnEffect create-button"
                  type="button"
                >
                  Back
                </button>
                <button
                  className="btnEffect create-button"
                  type="button"
                  onClick={() => {
                    // console.log(data.name !== "");
                    // const isFill = data.Object(keys)
                    if (
                      data.name === "" &&
                      data.category === ""
                    ) {
                      setButtonSwitch(false);
                      return;
                    }
                    handleEditMaterial(data);
                  }}
                >
                  Update
                </button>
              </Form.Group> */}
            </Form>
          </div>
        </div>
        <div className="material-footer material-create-footer"></div>
      </div>
    </>
  );
}
