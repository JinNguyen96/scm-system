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
            // let { error } = validateCreateMaterial(req.body);
            // if (error) {

            //     return failCode(res, error, 'Something was wrong!!');
            // }
            // else {
            let {
                name,
                description } = req.body;

            const uniqueId = uuid()

            let categoryCreate = await model.Categories.create({ id: uniqueId, name, description })




            successCode(res, categoryCreate, 'Create material success')
            // }
        }
        else {
            failCode(res, req, "Error method");

        }
    } catch (error: any) {
        return errorCode(error, "Dang ky khong thanh cong");
    }
}
