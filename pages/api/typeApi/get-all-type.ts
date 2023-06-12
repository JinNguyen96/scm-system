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
      let data = await model.Type.findAll()
      successCode(res, data, " Get list of type success")
    } else if (req.method == "PUT") {
      let data = await model.Type.findAll()
      let { id } = req.body;
      let userInf = await model.Users.findByPk(id)
      let userLevel = await model.Type.findAll({
        where: {
          id: userInf?.dataValues.userType
        }
      })

      successCode(res, userLevel, " User Level Success")
    } else {
      failCode(res, req, "Error method");
    }

  } catch (error: any) {
    return errorCode(error, "Dang ky khong thanh cong");
  }
}
