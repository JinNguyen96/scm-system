import { NextApiRequest, NextApiResponse } from "next";
import { failCode, successCode, errorCode } from "../../../utils/response";
import initModels from "../../../models/init-models";
import sequelize from "../../../models/config";

const model = initModels(sequelize);

interface T {
    res: NextApiResponse;
    req: NextApiRequest;
}
export default async function deleteCategory(
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
            let { id } = req.body;
            console.log(id,'eeee')
            let isAvalable = await model.Categories.findByPk(id)

            if (isAvalable) {
                let deleteCategory: any = await model.Categories.destroy({ where: { id } })
                successCode(res, deleteCategory, 'Delete category success')

            } else {
                failCode(res, req, 'Category no exist!!!')
            }

        }
        else {
            failCode(res, req, "Error method");
        }
    } catch (error: any) {
        return errorCode(error,error, "Dang ky khong thanh cong");
    }
}
