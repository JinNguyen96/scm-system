import { NextApiRequest, NextApiResponse } from "next";
import init_models from "../../../models/init-models";
import sequelize from "../../../models/config";
import { errorCode, failCode, successCode } from "../../../utils/response";

const model = init_models(sequelize);

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      let data = await model.Users.findAll();
      const pageAsNumber = Number(req.query.page);
      const sizeAsNumber = Number(req.query.page);
      let page = 0;
      if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
        page = pageAsNumber;
      }

      let size = 5;
      if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {
        size = sizeAsNumber;
      }

      // const users = await model.Users.findAndCountAll({
      //   limit:Number(size),
      //   offset:Number(page) * Number(size)
      // })
      const users = await model.Users.findAndCountAll({
      })
      successCode(res, { usersPerPage: users.rows, totalPages: users.count }, "Lay danh sach thanh cong");
    } else if (req.method === "POST") {
      //Get User Detail
      let { id } = req.body;

      let dataUsers = await model.Users.findByPk(id);

      let roleId = dataUsers?.userRole;
      let arrRole = String(roleId)?.split(',');

      let data = []
      if (arrRole.length > 1) {
        for (let i = 0; i < arrRole.length; i++) {
          data.push(await model.Roles.findAll({
            where: {
              id: arrRole[i]
            }
          }))
        }
      } else {
        data = await model.Roles.findAll({
          where: {
            id: roleId
          }
        })
      }
      successCode(
        res,
        { data, dataUsers },
        "Lay thong tin user thanh cong"
      );
    } else {
      failCode(res, "", "sai method");
    }
  } catch (error: any) {
    return errorCode(error, "lỗi 500");
  }
}
