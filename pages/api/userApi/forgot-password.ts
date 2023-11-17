import { NextApiRequest, NextApiResponse } from "next";
import init_models from "../../../models/init-models";
import sequelize from "../../../models/config";
import { errorCode, successCode } from "../../../utils/response";
import * as bcrypt from "bcrypt-ts";
const model = init_models(sequelize);

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    let { userPassword, confirmPassword, userEmail } = req.body;
    let newPassword = {
      userPassword: bcrypt.hashSync(userPassword),
    };
    await model.Users.update(newPassword, {
      where: {
        userEmail,
      },
    });
    return successCode(res, userPassword, "update password thành công");
  } catch (error: any) {
    return errorCode(error,error, "lỗi 500");
  }
}
