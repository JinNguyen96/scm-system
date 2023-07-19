import Router from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Button, Form, Input } from "semantic-ui-react";
import { setEditMaterialState } from "../../../recoil/material/materialRecoil";
import { materialService } from "../../../recoil/services/materialService";

export default function EditMaterial() {
  const [buttonSwitch, setButtonSwitch] = useState(false);
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
  const materialData = useRecoilValue(setEditMaterialState);
  const { data } = materialData;

  const getStatDetail = async (id: any) => {
    const result = await materialService.getMaterialStatDetail(id);
    setMaterialForm({
      materialForm,
      stat: {
        ...materialForm,
        stat: {
          ...result.data.content,
          statId: id,
        },
      },
    });
  };

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

  const handleEditMaterial = useCallback(
    async (data: object) => {
      const updateStat = await materialService.editMaterial(materialForm);
      console.log(updateStat)
    },
    [materialForm]
  );
  useEffect(() => {
    if (data.name === "") {
      Router.push("/material/material");
    }
    setMaterialForm(data);
    getStatDetail(data?.stat);
  }, []);
  return (
    <>
      <div className="material page-layout">
        <div className="material-header page-header">
          <div className="row">
            <div className="col-lg-6 flex align-items-center">
              <h1 className="--title-page">Material / Edit Material</h1>
            </div>
          </div>
        </div>
        <div className="material-main layout-create">
          <div className="form-create">
            <Form
              unstackable
              className={
                buttonSwitch === false
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
                  value={materialForm.name}
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
                  value={materialForm.quantity}
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
                  value={materialForm.status}
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
                  value={materialForm.subtotal}
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
                  value={materialForm.price}
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
                  value={materialForm.no}
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
                  value={materialForm.group}
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
                  value={materialForm.note}
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
                  value={materialForm.rawMaterial}
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
                buttonSwitch === true
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
              <Form.Group className="d-flex justify-content-end gap-4">
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
                    // console.log(materialForm.name !== "");
                    // const isFill = materialForm.Object(keys)
                    if (
                      materialForm.name === "" &&
                      materialForm.category === ""
                    ) {
                      setButtonSwitch(false);
                      return;
                    }
                    handleEditMaterial(materialForm);
                  }}
                >
                  Update
                </button>
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
