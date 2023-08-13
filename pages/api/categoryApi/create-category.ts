import { NextApiRequest, NextApiResponse } from "next";
import { failCode, successCode, errorCode } from "../../../utils/response";
import initModels from "../../../models/init-models";
import sequelize from "../../../models/config";
import { validateCreateMaterial, validateCreateRole } from "../validator";
import { uuid } from 'uuidv4';
const model = initModels(sequelize);

interface T {
    res: NextApiResponse;
    req: NextApiRequest;
}
export default async function createCategory(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method == "POST") {
            const uniqueId = uuid()
            const { unitId, statId } = req.body
            const findUnitId: any = await model.Units.findAll({ where: { id: unitId } })
            // const findStatId: any = await model.Stats.findAll({ where: { id: statId } })

            // const createStat = await model.Stats.create({ id: uniqueId, name, description })
            // console.log(name, description)
            // const createUnit = await model.Units.create({ id: uniqueId, name, description })
            // const createMUR = await model.MURs.create({ statId, unitId })
            successCode(res, findUnitId, 'Create material success')
            // }
        }
        else {
            failCode(res, req, "Error method");

        }
    } catch (error: any) {
        return errorCode(error, "Dang ky khong thanh cong");
    }
}
