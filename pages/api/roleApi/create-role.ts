import { NextApiRequest, NextApiResponse } from "next";
import { failCode, successCode, errorCode } from "../../../utils/response";
import initModels from "../../../models/init-models";
import sequelize from "../../../models/config";
import { validateCreateRole } from "../validator";
import { uuid } from 'uuidv4';
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
      let { error } = validateCreateRole(req.body);
      if (error) {

        return failCode(res, error, 'Something was wrong!!');
      }
      else {
        let {
          roleName,
          roleDescription,
          rolePermission,
          roleScopes
        } = req.body;
        const uniqueId = uuid()
        let data = {
          id: uniqueId,
          roleName,
          roleDescription,
          rolePermission,
          roleScopes
        };
        let newRole = await model.Roles.create(data)
        successCode(res, newRole, 'Create Role success')
      }
    } else {
      failCode(res, req, "Error method");
    }
  } catch (error: any) {
    return errorCode(error, "Dang ky khong thanh cong");
  }
}
