import Router from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Divider, Form, FormSelect, Input } from "semantic-ui-react";
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

const statusOption = [
  { key: "av", value: "available", text: "Active" },
  { key: "di", value: "disable", text: "Disable" },
  { key: "ina", value: "inactive", text: "InActive" },
];
// const isFullFill = (data) => {};

const CreateSupplier = React.memo(() => {
  const [supplierForm, setSupplierForm] = useState<object>({
    name: "",
    email: "",
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

  const handleOnChange = useCallback(
    (e: any) => {
      const { name, value } = e.target;
      console.log(value);
      setSupplierForm({ ...supplierForm, [name]: value });
    },
    [setSupplierForm]
  );

  useEffect(() => {}, []);

  return (
    <div className="material page-layout">
      <div className="material-header page-header">
        <div className="row">
          <div className="col-lg-6 flex align-items-center">
            <h1 className="--title-page">Material / Create New Supplier</h1>
          </div>
        </div>
      </div>
      <div className="material-main layout-create">
        <div className="form-create">
          <Form className="row form-relative">
            <Form.Field
              width={8}
              label="Name"
              control={Input}
              onChange={handleOnChange}
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
              type="email"
              required
              placeholder="Fill in email "
              id="email"
              name="email"
              control={Input}
              inline
              label="Email"
            />

            <Form.Field
              onChange={handleOnChange}
              width={8}
              control={Input}
              type="number"
              placeholder="Fill in phone number "
              id="phoneNumber"
              name="phoneNumber"
              inline
              required
              label="PhoneNumber"
            />
            <Form.Field
              onChange={handleOnChange}
              width={8}
              type="text"
              placeholder="Fill in address "
              id="address"
              name="address"
              control={Input}
              inline
              required
              label="Address"
            />

            <Form.Field
              onChange={handleOnChange}
              width={8}
              type="text"
              placeholder="Fill in tax number "
              id="taxNumber"
              name="taxNumber"
              control={Input}
              inline
              required
              label="Tax Number"
            />
            <FormSelect
              onChange={(e: any) => {
                setSupplierForm({
                  ...supplierForm,
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
              required
              options={statusOption}
            />
          </Form>
          <Divider />
        </div>

        <Button
          className="btnEffect create-button float-none"
          type="button"
          onClick={() => {}}
        >
          Next
        </Button>
      </div>
    </div>
  );
});

export default CreateSupplier;
