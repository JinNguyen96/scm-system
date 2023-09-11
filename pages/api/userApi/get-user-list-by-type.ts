
import { NextApiRequest, NextApiResponse } from "next";
import init_models from "../../../models/init-models";
import sequelize from "../../../models/config";
import { errorCode, failCode, successCode } from "../../../utils/response";
import * as bcrypt from "bcrypt-ts";

const model = init_models(sequelize);

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      let data = await model.Type.findAll({
        include: [{
          model: model.Users,


        }]
      });
      successCode(res, data, "Lay danh sach thanh cong");
    } else if (req.method === "POST") {
      //Get User Detail
      let { id } = req.body;

      let dataUsers = await model.Users.findByPk(id);

      let roleData = await model.Roles.findAll({
        where: {
          id: dataUsers?.dataValues.userRole,
        },

      });

      successCode(
        res,
        { roleData, dataUsers },
        "Lay thong tin user thanh cong"
      );
    } else {
      failCode(res, "", "sai method");
    }
  } catch (error: any) {
    return errorCode(error, "lỗi 500");
  }
}
