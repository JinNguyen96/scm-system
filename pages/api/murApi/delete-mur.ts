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
export default async function deleteMUR(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        let { id } = req.body;
        await model.MURs.destroy({
            where: {
                id,
            },
        });
        successCode(res, id, "Delete mur success");
    } catch (error: any) {
        return errorCode(error, "Delete unsuccess");
    }
}
