import { NextApiRequest, NextApiResponse } from "next";
import { failCode, successCode, errorCode } from "../../../utils/response";
import initModels from "../../../models/init-models";
import sequelize from "../../../models/config";

const model = initModels(sequelize);

interface T {
  res: NextApiResponse;
  req: NextApiRequest;
}
export default async function deleteType(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {

    let { id } = req.body;

    let isTypeUnLink = await model.Users.count({
      where: {
        userType: id,
      },
    });
    if (isTypeUnLink) {
      let userInType = await model.Users.findAll({
        where: { userType: id },
      });

      failCode(
        res,
        userInType,
        "Can not delete this type because someone is on the type, remove user from this type and try again"
      );
    } else {
      let result = await model.Type.destroy({
        where: {
          id,
        },
      });
      successCode(res, "", "Delete type success");
    }

  } catch (error: any) {
    return errorCode(error, "Delete unsuccess");
  }
}
