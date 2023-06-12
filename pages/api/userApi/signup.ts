import { NextApiRequest, NextApiResponse } from "next";
import { failCode, successCode, errorCode } from "../../../utils/response";
import * as bcrypt from "bcrypt-ts";
import initModels from "../../../models/init-models";
import sequelize from "../../../models/config";
import { UserAttributes } from "../../../models/users";
import { validateSignup } from "../validator";
import { fail } from "assert";

const model = initModels(sequelize);

interface T {
  res: NextApiResponse;
  req: NextApiRequest;
}
export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      let { error } = validateSignup(req.body);

      if (error) {

        return failCode(res, error, "Something was wrong!!");
      } else {

        let {
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
        let getIdByRole = await model.Roles.findAll({
          where: {
            id: userRole,
          },
        });
        let result1 = [];
        result1 = getIdByRole.map((perm) => perm.rolePermission);

        let data = {
          id: 0,
          userType,
          userEmail,
          userPassword: bcrypt.hashSync(userPassword, 10),
          userRole,
          userPhoneNumber,
          userFirstName,
          userLastName,
          userDob,
          userAdress,
          userCategory,
          relatedType: relatedType.toString(),
          relatedUser: relatedUser.toString(),
        };

        let checkEmail = await model.Users.findOne({
          where: {
            userEmail: userEmail,
          },
        });
        if (checkEmail) {
          return failCode(res, result1, "Email đã tồn tại");
        } else {
          await model.Users.create(data);
          let userIdCreteNew = await model.Users.findOne({
            where: {
              userEmail,
            },
          });
          return successCode(res, data, "Tao tk thanh cong");
        }
      }
    } else if (req.method === "PUT") {
      let { userType } = req.body;
      let findUserByType = await model.Users.findAll({
        where: {
          userType,
        },
      });

      if (findUserByType.length > 0) {

        successCode(res, findUserByType, "tim thanh cong");
      }
      else {
        successCode(res, '', 'No data record')
      }

    } else {
      return failCode(res, "", "sai method");
    }
  } catch (error: any) {
    return errorCode(error, "Dang ky khong thanh cong");
  }
}
