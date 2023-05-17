import { NextApiRequest, NextApiResponse } from "next";
import { failCode, successCode, errorCode } from "../../../utils/response";
import initModels from "../../../models/init-models";
import sequelize from "../../../models/config";

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
    if (req.method == "POST") {
      let {
        roleName,
        roleDescription,
        rolePermission,
        roleScopes,
        userId,
        typeId,
        id,
      } = req.body;
      let data = {
        id,
        roleName,
        roleDescription,
        rolePermission,
        roleScopes,
        userId,
        typeId,
      };
     let newRole = await model.Roles.create(data)
     successCode(res,newRole,'Create Role success')
    } else {
      failCode(res, req, "Error method");
    }
  } catch (error: any) {
    return errorCode(error, "Dang ky khong thanh cong");
  }
}
