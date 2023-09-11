import { NextApiRequest, NextApiResponse } from "next";
import init_models from "../../../models/init-models";
import sequelize from "../../../models/config";
import { errorCode, failCode, successCode } from "../../../utils/response";
import * as bcrypt from "bcrypt-ts";

const model = init_models(sequelize);

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "PUT") {
      let {
        id,
        userFirstName,
        userEmail,
        userPassword,
        userRole,
        userType,
        userPhoneNumber,
        userLastName,
        userDob,
        userAdress,
        userCategory,
        relatedType,
        relatedUser,
      } = req.body;
      let checkUser = await model.Users.findByPk(id);
      console.log(req.body)
      if (checkUser) {
        let userUpdate = {
          userFirstName,
          userEmail,
          userPassword,
          userRole,
          userType,
          userPhoneNumber,
          userLastName,
          userDob,
          userAdress,
          userCategory,
          relatedType,
          relatedUser,
        };
        await model.Users.update(userUpdate, {
          where: {
            id: id,
          },
        });
        return successCode(res, userUpdate, "cap Nhat thanh cong");
      } else {
        return failCode(res, "", "user id khong ton tai");
      }
    }
  } catch (error: any) {
    return errorCode(error, "Lỗi 500");
  }
}
