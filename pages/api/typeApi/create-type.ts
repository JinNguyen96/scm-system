
import { NextApiRequest, NextApiResponse } from "next";
import { failCode, successCode, errorCode } from "../../../utils/response";
import { uuid } from 'uuidv4';
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
      const uniqueId = uuid()
      let { typeName, typeDescription, typeLevel, id } = req.body;
      let data = {
        typeName,
        typeDescription,
        typeLevel,
        id: uniqueId,
      };

      let checkNameOfType = await model.Type.findOne({
        where: {
          typeName,
        },
      });

      if (checkNameOfType) {
        failCode(res, data.typeName, 'Type name is exist')
      } else {
        let newType = await model.Type.create(data);
        successCode(res, newType, "Create Type success");
      }
    } else {
      failCode(res, req, "Error method");
    }
  } catch (error: any) {
    return errorCode(error, "Dang ky khong thanh cong");
  }
}
