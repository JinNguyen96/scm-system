import { NextApiRequest, NextApiResponse } from "next";
import { failCode, successCode, errorCode } from "../../../utils/response";
import initModels from "../../../models/init-models";
import sequelize from "../../../models/config";
import { validateCreateWarehouse } from "../validator";
import { uuid } from "uuidv4";
const model = initModels(sequelize);

interface T {
  res: NextApiResponse;
  req: NextApiRequest;
}
export default async function createWarehouse(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      let { error } = validateCreateWarehouse(req.body);
      if (error) {
        return failCode(res, error, "Something was wrong!!");
      } else {
        let { name, address, personInCharge, code, material, quantity } =
          req.body;

        const uniqueId = uuid();

        let data = {
          id: uniqueId,
          name,
          address,
          personInCharge,
          code,
          material,
          quantity,
        };
        console.log(data);
        let newWarehouse = await model.Warehouse.create(data);
        successCode(res, newWarehouse, "Create warehouse success");
      }
    } else {
      failCode(res, req, "Error method");
    }
  } catch (error: any) {
    return errorCode(error, error, "Error code 500");
  }
}
