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
                MURId,
                categoryId,
                isRequired
            } = req.body;
            let data = {
                id: uniqueId,
                MURId,
                categoryId,
                isRequired
            };
            let newMur = await model.TMURs.create(data)
            successCode(res, newMur, 'Create tmur success')

        } else {
            failCode(res, req, "Error method");
        }
    } catch (error: any) {
        return errorCode(error, "Dang ky khong thanh cong");
    }
}
