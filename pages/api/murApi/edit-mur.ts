import { NextApiRequest, NextApiResponse } from "next";
import { failCode, successCode, errorCode } from "../../../utils/response";
import initModels from "../../../models/init-models";
import sequelize from "../../../models/config";

const model = initModels(sequelize);

interface T {
    res: NextApiResponse;
    req: NextApiRequest;
}
export default async function editMUR(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method == "PUT") {
            let { id, unitId, statId } = req.body;
            let findMURById = await model.MURs.findByPk(id)
            if (findMURById) {
                let updateInfo = { id, unitId, statId }
                await model.Roles.update(updateInfo, {
                    where: {
                        id
                    }
                })
                successCode(res, updateInfo, "Update success")
            } else {
                failCode(res, req, "Cant find MUR ");
            }
        } else {
            failCode(res, req, "Error method");
        }
    } catch (error: any) {
        return errorCode(error, "Update unsuccess");
    }
}
