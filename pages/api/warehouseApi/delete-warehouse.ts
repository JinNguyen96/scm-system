import { NextApiRequest, NextApiResponse } from "next";
import { failCode, successCode, errorCode } from "../../../utils/response";
import initModels from "../../../models/init-models";
import sequelize from "../../../models/config";

const model = initModels(sequelize);

interface T {
  res: NextApiResponse;
  req: NextApiRequest;
}
export default async function deleteWarehouse(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      let { id } = req.body;
      let findMaterById = await model.Warehouse.findByPk(id);
      if (findMaterById) {
        await model.Warehouse.destroy({
          where: {
            id,
          },
        });
      } else {
        failCode(res, id, "Can not find warehouse");
      }
      successCode(res, "", "Delete warehouse success");
      // }
    } else {
      failCode(res, "", "wrong method !!!");
    }
  } catch (error: any) {
    return errorCode(error, error, "something was wrong!!!");
  }
}
