import { NextApiRequest, NextApiResponse } from "next";
import { failCode, successCode, errorCode } from "../../../utils/response";
import initModels from "../../../models/init-models";
import sequelize from "../../../models/config";

const model = initModels(sequelize);

interface T {
  res: NextApiResponse;
  req: NextApiRequest;
}
export default async function getStatById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method == "POST") {
      const { id } = req.body;
      console.log(id);

      const tmurCheck: any = await model.TMURs.findOne({
        where: {
          categoryId: id,
        },
      });
      if (tmurCheck) {
        const tmurInfo: any = await model.MURs.findOne({
          where: {
            id: tmurCheck.MURId,
          },
          raw: true,
        });
        console.log(tmurInfo);

        if (tmurInfo) {
          const data: any = await model.Stats.findOne({
            where: {
              id: tmurInfo.statId,
            },
            raw: true,
          });
          successCode(res, data, " Get stat success");
        }
      }
    } else {
      failCode(res, req, "Error method");
    }
  } catch (error: any) {
    return errorCode(error, "Da co loi, khong thanh cong");
  }
}
