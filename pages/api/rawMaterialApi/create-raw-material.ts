import { NextApiRequest, NextApiResponse } from "next";
import { failCode, successCode, errorCode } from "../../../utils/response";
import initModels from "../../../models/init-models";
import sequelize from "../../../models/config";
import { validateCreateRawMaterial } from "../validator";
import { uuid } from "uuidv4";
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
      let { error } = validateCreateRawMaterial(req.body);
      if (error) {
        return failCode(res, error, "Something was wrong!!");
      } else {
        let { nameRawMater, descRawMater } = req.body;

        const uniqueId = uuid();

        let data = {
          id: uniqueId,
          nameRawMater,
          descRawMater,
        };

        let newMaterial = await model.RawMaterials.create(data);
        successCode(res, newMaterial, "Create raw material success");
      }
    } else {
      failCode(res, req, "Error method");
    }
  } catch (error: any) {
    return errorCode(error, "Dang ky khong thanh cong");
  }
}
