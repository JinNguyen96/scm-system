import { NextApiRequest, NextApiResponse } from "next";
import { failCode, successCode, errorCode } from "../../../utils/response";
import initModels from "../../../models/init-models";
import sequelize from "../../../models/config";

const model = initModels(sequelize);

interface T {
  res: NextApiResponse;
  req: NextApiRequest;
}
export default async function getAllMaterial(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      let data = await model.Materials.findAll();
      console.log(data);
      successCode(res, data, " Get list of material success");
    } else if (req.method === "POST") {
      let { id } = req.body;
      let materialDetail: any = await model.Materials.findByPk(id);
      successCode(res, materialDetail, " Get list of material success");
    } else {
      failCode(res, req, "Error method");
    }
  } catch (error: any) {
    return errorCode(error, error, "Da co loi, khong thanh cong");
  }
}
