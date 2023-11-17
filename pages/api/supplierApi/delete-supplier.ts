import { NextApiRequest, NextApiResponse } from "next";
import { failCode, successCode, errorCode } from "../../../utils/response";
import initModels from "../../../models/init-models";
import sequelize from "../../../models/config";

const model = initModels(sequelize);

interface T {
  res: NextApiResponse;
  req: NextApiRequest;
}
export default async function deleteSupplier(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      let { id } = req.body;
      let findMaterById = await model.Suppliers.findByPk(id);
      
      if (findMaterById) {
        await model.Suppliers.destroy({
          where: {
            id,
          },
        });
      } else {
        failCode(res, "", "Can not find supplier");
      }
      successCode(res, "", "Delete supplier success");
      // }
    } else {
      failCode(res, "", "wrong method !!!");
    }
  } catch (error: any) {
    return errorCode(error, error, "something was wrong!!!");
  }
}
