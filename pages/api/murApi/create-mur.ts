import { NextApiRequest, NextApiResponse } from "next";
import { failCode, successCode, errorCode } from "../../../utils/response";
import initModels from "../../../models/init-models";
import sequelize from "../../../models/config";
import { validateCreateRole } from "../validator";
import { uuid } from "uuidv4";
const model = initModels(sequelize);

interface T {
  res: NextApiResponse;
  req: NextApiRequest;
}
export default async function createMUR(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method == "POST") {
      const uniqueId = uuid();
      const { formData, fieldArray } = req.body;
      console.log(formData, fieldArray);
      const createStat = await model.Stats.create({
        id: uniqueId,
        name: fieldArray.stat,
        description: "",
      });
      const createUnit = await model.Units.create({
        id: uniqueId,
        name: fieldArray.unit,
        description: "",
      });
      let { statId, unitId } = req.body;
      let data = {
        id: uniqueId,
        statId: createStat.id,
        unitId: createUnit.id,
      };
      let newMur = await model.MURs.create(data);
      successCode(res, newMur, "Create mur success");
    } else {
      failCode(res, req, "Error method");
    }
  } catch (error: any) {
    return errorCode(error,error, "Dang ky khong thanh cong");
  }
}
