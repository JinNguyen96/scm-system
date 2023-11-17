import { object } from "yup";
import { NextApiRequest, NextApiResponse } from "next";
import { failCode, successCode, errorCode } from "../../../utils/response";
import * as bcrypt from "bcrypt-ts";
import initModels from "../../../models/init-models";
import sequelize from "../../../models/config";
import { uuid } from "uuidv4";

const model = initModels(sequelize);

interface T {
  res: NextApiResponse;
  req: NextApiRequest;
}
export default async function editWarehouse(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "PUT") {
      const uniqueId = uuid();
      let { id, name, address, personInCharge, code, material, quantity } =
        req.body;
      let updateInfo = {
        name,
        address,
        personInCharge,
        code,
        material,
        quantity,
      };

      let data = await model.Warehouse.update(updateInfo, {
        where: {
          id,
        },
      });
      const editHistory = {
        id: uniqueId,
        material,
        code,
        quantity,
        personInCharge,
        name
      };
      const createHistory = await model.Histories.create(editHistory);
      successCode(res, createHistory, "Update success");
    } else {
      failCode(res, req, "Error method");
    }
  } catch (error: any) {
    return errorCode(error, error, "Update unsuccess");
  }
}
