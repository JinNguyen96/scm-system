import { NextApiRequest, NextApiResponse } from "next";
import { failCode, successCode, errorCode } from "../../../utils/response";
import initModels from "../../../models/init-models";
import sequelize from "../../../models/config";

const model = initModels(sequelize);

interface T {
  res: NextApiResponse;
  req: NextApiRequest;
}
export default async function getStatById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method == "POST") {
      const { id } = req.body;
      let data: any = await model.TMURs.findAll({
        where: {
          categoryId: id,
        },
      });
      console.log(data.MURId, "ss");
      if (data) {
        let murObj: any = await model.MURs.findByPk(data.MURId);
        if (murObj) {
          successCode(res, murObj, " Get unit success");
        } else failCode(res, "", "fail");
      }
    } else {
      failCode(res, req, "Error method");
    }
  } catch (error: any) {
    return errorCode(error,error, "Da co loi, khong thanh cong");
  }
}
