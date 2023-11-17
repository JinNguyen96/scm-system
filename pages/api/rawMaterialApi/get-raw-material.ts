import { NextApiRequest, NextApiResponse } from "next";
import { failCode, successCode, errorCode } from "../../../utils/response";
import initModels from "../../../models/init-models";
import sequelize from "../../../models/config";

const model = initModels(sequelize);

interface T {
  res: NextApiResponse;
  req: NextApiRequest;
}
export default async function getAllRawMaterial(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      let data = await model.RawMaterials.findAll();
      successCode(res, data, " Get list of raw material success");
    } else {
      failCode(res, req, "Error method");
    }
  } catch (error: any) {
    return errorCode(error,error, "Da co loi, khong thanh cong");
  }
}
