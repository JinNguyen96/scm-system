import { NextApiRequest, NextApiResponse } from "next";
import { failCode, successCode, errorCode } from "../../../utils/response";
import initModels from "../../../models/init-models";
import sequelize from "../../../models/config";
import { validateCreateRole } from "../validator";
import { uuid } from 'uuidv4';
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
            const uniqueId = uuid()

            let {
                statId,
                unitId
            } = req.body;
            let data = {
                id: uniqueId,
                statId,
                unitId
            };
            let newMur = await model.MURs.create(data)
            successCode(res, newMur, 'Create mur success')

        } else {
            failCode(res, req, "Error method");
        }
    } catch (error: any) {
        return errorCode(error, "Dang ky khong thanh cong");
    }
}
