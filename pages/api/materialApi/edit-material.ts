import { object } from 'yup';
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
            let { no,
                id,
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
            let updateInfo = {
                no,
                id,
                name,
                type_id,
                quantity,
                rawMaterial,
                group,
                price,
                subtotal,
                status,
                note,
            }
            const { statId, statLength, statWeight, statHeight, statColor, statThickness, statVolume
            } = stat;

            let data = await model.Materials.update(updateInfo, {
                where: {
                    id
                }
            })
            successCode(res, data, "Update success")

        } else {
            failCode(res, req, "Error method");
        }
    } catch (error: any) {
        return errorCode(error, "Update unsuccess");
    }
}
