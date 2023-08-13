import { object } from "yup";
import { NextApiRequest, NextApiResponse } from "next";
import { failCode, successCode, errorCode } from "../../../utils/response";
import * as bcrypt from "bcrypt-ts";
import initModels from "../../../models/init-models";
import sequelize from "../../../models/config";

const model = initModels(sequelize);

interface T {
    res: NextApiResponse;
    req: NextApiRequest;
}
export default async function editCategory(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method === "PUT") {
            let { id, name, description } = req.body;
            let updateInfo = {
                id,
                name,
                description,
            };

            let isAvalable = await model.Categories.findByPk(id);
            if (isAvalable) {
                let updateCategory = await model.Categories.update(
                    updateInfo, {
                    where: {
                        id

                    }
                })
                successCode(res, updateCategory, "Update success");

            } else {
                failCode(res, name, "Category is no exist!!!");
            }
        }
    } catch (error: any) {
        return errorCode(error, "Update unsuccess");
    }
}
