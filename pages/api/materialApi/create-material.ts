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
export default async function signup(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method == "POST") {
            // let { error } = validateCreateMaterial(req.body);
            // if (error) {

            //     return failCode(res, error, 'Something was wrong!!');
            // }
            // else {
            let { no,
                name,
                type_id,
                quantity,
                group,
                rawMaterial,
                price,
                subtotal,
                stat,
                status,
                note, } = req.body;
            const uniqueId = uuid()
            let data = {
                no,
                id: uniqueId,
                name,
                type_id,
                quantity,
                group,
                rawMaterial,
                price,
                subtotal,
                stat,
                status,
                note,
            };
            let newMaterial = await model.Materials.create(data)
            successCode(res, newMaterial, 'Create Role success')
            // }
        } else {
            failCode(res, req, "Error method");
        }
    } catch (error: any) {
        return errorCode(error, "Dang ky khong thanh cong");
    }
}
