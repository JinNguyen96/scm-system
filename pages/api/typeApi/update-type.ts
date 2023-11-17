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
    if (req.method == "PUT") {
      let { typeName, typeDescription, typeLevel, id } = req.body;
      let data = {
        typeName,
        typeDescription,
        typeLevel,
        id,
      };
          await model.Type.update(data,{where:{
            id
         }})
        successCode(res,data,"Update success")
    } else {
      failCode(res, req, "Error method");
    }
  } catch (error: any) {
    return errorCode(error,error, "Update unsuccess");
  }
}
