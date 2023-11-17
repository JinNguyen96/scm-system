import { NextApiRequest, NextApiResponse } from "next";
import { failCode, successCode, errorCode } from "../../../utils/response";
import initModels from "../../../models/init-models";
import sequelize from "../../../models/config";
import { validateCreateMaterial, validateCreateRole, validateCreateSupplier } from "../validator";
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
    if (req.method === "POST") {
      let { error } = validateCreateSupplier(req.body);
      if (error) {
        return failCode(res, error, "Something was wrong!!");
      } else {
        let {
          name,
          email,
          phoneNumber,
          address,
          status,
          taxNumber,
          profileMaterial,
        } = req.body;

        const uniqueId = uuid();

        let data = {
          id: uniqueId,
          name,
          email,
          phoneNumber,
          address,
          status,
          taxNumber,
          profileMaterial,
        };
        console.log(data);
        let newMaterial = await model.Suppliers.create(data);
        successCode(res, newMaterial, "Create supplier success");
      }
    } else {
      failCode(res, req, "Error method");
    }
  } catch (error: any) {
    return errorCode(error, error, "Error code 500");
  }
}
