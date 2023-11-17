import { NextApiRequest, NextApiResponse } from "next";
import { failCode, successCode, errorCode } from "../../../utils/response";
import * as bcrypt from "bcrypt-ts";
import initModels from "../../../models/init-models";
import sequelize from "../../../models/config";

const model = initModels(sequelize);

interface T {
  res: NextApiResponse;
  req: NextApiRequest;
}
export default async function getAllRole(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method == "GET") {
         let data = await model.Roles.findAll()
        successCode(res,data," Get list of role success")
    } else {
      failCode(res, req, "Error method");
    }
  } catch (error: any) {
    return errorCode(error,error, "Dang ky khong thanh cong");
  }
}
