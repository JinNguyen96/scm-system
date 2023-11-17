import Router from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Divider, Form, Grid, Input, Tab } from "semantic-ui-react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { materialService } from "../../recoil/services/materialService";
import useWarehouse from "../../recoil/hook/useWarehouse";
import useHistory from "../../recoil/hook/useHistory";
import { useRecoilValue } from "recoil";
import { setHistoryDataList } from "../../recoil/history/historyRecoil";
import Link from "next/link";
import moment from "moment";
import useMaterial from "../../recoil/hook/useMaterial";

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

const CreateWarehouse = React.memo(() => {
  const { handleCreateWarehouse } = useWarehouse();
  const { handleGetListHistory } = useHistory();
  const { handleGetDataMaterialById } = useMaterial();
  const historyData = useRecoilValue(setHistoryDataList);
  console.log(historyData.data);
  const [warehouseForm, setWarehouseForm] = useState<object>({
    name: "",
    personInCharge: "",
    address: "",
    material: [],
    code: [],
    quantity: [],
  });
  const [err, setErr] = useState(false);

  const [rawMaterial, setRawMaterial] = useState([]);
  const handleOnChange = (e: any) => {
    const { name, value } = e.target;

    if (name === "material" || name === "quantity" || name === "code") {
    }
    setWarehouseForm({ ...warehouseForm, [name]: value });
  };

  const [materialQuantity, setMaterialQuantity] = useState([
    {
      material: "",
      quantity: 0,
      code: "",
    },
  ]);

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
  const getMaterialData = useCallback(async (id: string) => {}, []);
  const rowRender = () => {
    return materialQuantity.map((item, index) => {
      return (
        <>
          <Grid key={index} celled="internally">
            <Grid.Column width={4} className="py-0">
              <Select
                name="material"
                className="block w-full placeholder-gray-300 border-gray-300  text-gray-900  focus:z-10 focus:outline-none sm:text-sm   border border-gray-300 rounded-md shadow-sm"
                placeholder="Fill to find Material"
                closeMenuOnSelect={false}
                components={animatedComponents}
                options={rawMaterial}
                onChange={(e: any) => {
                  console.log(e);
                  let arr = [...materialQuantity];
                  let objUpdate = { ...materialQuantity[index] };
                  objUpdate = { ...objUpdate, material: e.value };
                  arr[index] = objUpdate;
                  console.log(objUpdate);
                  setMaterialQuantity(arr);
                }}
              />
            </Grid.Column>
            <Grid.Column width={5} className="py-0">
              <Form>
                <Input
                  className="w-100"
                  type="number"
                  name="quantity"
                  onChange={(e) => {
                    const { name, value } = e.target;
                    let arr = [...materialQuantity];
                    let objUpdate = { ...materialQuantity[index] };
                    objUpdate = { ...objUpdate, [name]: value };
                    arr[index] = objUpdate;
                    console.log(objUpdate);
                    setMaterialQuantity(arr);
                  }}
                />
              </Form>
            </Grid.Column>
            <Grid.Column width={5} className="py-0">
              <Form>
                <Input
                  className="w-100"
                  name="code"
                  type="text"
                  onChange={(e, a) => {
                    const { name, value } = e.target;
                    let arr = [...materialQuantity];
                    let objUpdate = { ...materialQuantity[index] };
                    objUpdate = { ...objUpdate, [name]: value };
                    arr[index] = objUpdate;
                    console.log(objUpdate);
                    setMaterialQuantity(arr);
                  }}
                />
              </Form>
            </Grid.Column>
            <Grid.Column
              width={2}
              className="d-flex justify-content-evenly py-0 align-items-center"
            >
              <button
                className="create-row-category create-row-warehouse ml-0"
                onClick={() => {
                  setMaterialQuantity([
                    ...materialQuantity,
                    {
                      material: "",
                      quantity: 0,
                      code: "",
                    },
                  ]);
                }}
              >
                <img src="/plus-icon.svg" alt="plus icon" />
              </button>
              <button
                className={
                  materialQuantity.length > 1
                    ? "create-row-category create-row-warehouse"
                    : "d-none"
                }
                disabled={materialQuantity.length > 1 ? false : true}
                onClick={() => {
                  console.log(materialQuantity.length);
                  if (materialQuantity.length > 1) {
                    materialQuantity.splice(index, 1);
                    console.log(materialQuantity);
                    setMaterialQuantity([...materialQuantity]);
                  }
                }}
              >
                {" "}
                <img src="/devine-icon.svg" alt="plus icon" />
              </button>
            </Grid.Column>
          </Grid>
        </>
      );
    });
  };
  const historyRender = () => {
    return historyData.data?.map((history: any, index) => {
      console.log(history);

      return (
        <>
          <Grid>
            <Grid.Column width={3} className="p-0 pb-2 ">
              <Link
                href={"/material/view-material"}
                className="p-1 mx-2 font-bold d-inline-block history-table"
                onClick={() => {
                  handleGetDataMaterialById(history.material);
                }}
              >
                {history.name}
              </Link>
            </Grid.Column>
            <Grid.Column width={3} className="p-0 pb-2 ">
              <p className="p-1 mx-2 history-table">{history.code}</p>
            </Grid.Column>
            <Grid.Column width={3} className="p-0 pb-2 ">
              <p className="p-1 mx-2 history-table">{history.quantity}</p>
            </Grid.Column>
            <Grid.Column width={4} className="p-0 pb-2 ">
              <p className="p-1 mx-2 history-table">{history.personInCharge}</p>
            </Grid.Column>
            <Grid.Column width={3} className="p-0 pb-2 ">
              <p className="p-1 mx-2 history-table">
                {moment(history.updatedAt)
                  .utc()
                  .format("DD-MM-YYYY, h:mm:ss a")}
              </p>
            </Grid.Column>
          </Grid>
        </>
      );
    });
  };
  const panes = [
    {
      menuItem: "Material",
      render: () => {
        return (
          <Tab.Pane>
            <Grid celled="internally">
              <Grid.Column className="text-center font-bold pt-0" width={4}>
                Material
              </Grid.Column>
              <Grid.Column className="text-center font-bold pt-0" width={5}>
                Quantity
              </Grid.Column>
              <Grid.Column className="text-center font-bold pt-0" width={5}>
                Code
              </Grid.Column>
              <Grid.Column className="text-center font-bold pt-0" width={2} />
            </Grid>
            {rowRender()}
          </Tab.Pane>
        );
      },
    },
    {
      menuItem: "History",
      render: () => {
        return (
          <Tab.Pane>
            <Grid>
              <Grid.Column className="text-center font-bold" width={3}>
                Material
              </Grid.Column>
              <Grid.Column className="text-center font-bold" width={3}>
                Code
              </Grid.Column>
              <Grid.Column className="text-center font-bold" width={3}>
                Quantity
              </Grid.Column>
              <Grid.Column className="text-center font-bold" width={4}>
                Person In Charge
              </Grid.Column>
              <Grid.Column className="text-center font-bold" width={3}>
                Updated Date
              </Grid.Column>
            </Grid>
            {historyRender()}
          </Tab.Pane>
        );
      },
    },
  ];
  console.log(rawMaterial);
  useEffect(() => {
    getRawMaterial();
    handleGetListHistory();
  }, []);

  return (
    <div className="material page-layout">
      <div className="material-header page-header">
        <div className="row">
          <div className="col-lg-6 flex align-items-center">
            <h1 className="--title-page">WareHouse / Create New WareHouse</h1>
          </div>
        </div>
      </div>
      <div className="material-main layout-create">
        <div className="form-create warehouse-create-form">
          <Form className="row form-relative">
            <Form.Field
              width={5}
              label="Name"
              control={Input}
              onChange={handleOnChange}
              // inline
              type="text"
              placeholder="Fill in name "
              id="name"
              name="name"
              required
            />
            <Form.Field
              onChange={handleOnChange}
              width={5}
              type="text"
              required
              placeholder="Fill in address "
              id="address"
              name="address"
              control={Input}
              // inline
              label="Address"
            />

            <Form.Field
              onChange={handleOnChange}
              width={5}
              control={Input}
              type="text"
              placeholder="Fill in name of person in charge "
              id="personInCharge"
              name="personInCharge"
              // inline
              required
              label="Manager"
            />
          </Form>
          <Divider />
        </div>
        <div className="warehouse-create-button form-create h-auto d-block">
          <Tab panes={panes} />
        </div>

        <Button
          className="btnEffect create-button float-none"
          type="button"
          onClick={() => {
            if (err) {
              return;
            }
            handleCreateWarehouse(warehouseForm);
          }}
        >
          Create
        </Button>
      </div>
    </div>
  );
});

export default CreateWarehouse;
