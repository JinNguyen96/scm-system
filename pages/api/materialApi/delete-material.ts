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
export default async function deleteMaterial(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method === "POST") {
            let { id } = req.body;
            let findMaterById = await model.Materials.findByPk(id)
            console.log(findMaterById)
            if (findMaterById) {

                await model.Materials.destroy({
                    where: {
                        id
                    }
                })
                await model.Stats.destroy({
                    where: {
                        id: findMaterById.dataValues.stat
                    }
                })
            } else {
                failCode(res, '', "Can not find material")
            }
            successCode(res, '', "Delete material success");
            // }

        } else {
            failCode(res, '', 'wrong method !!!')
        }

    } catch (error: any) {
        return errorCode(error, error, error, error);
    }
}
