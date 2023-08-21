import { NextApiRequest, NextApiResponse } from "next";
import { failCode, successCode, errorCode } from "../../../utils/response";
import initModels from "../../../models/init-models";
import sequelize from "../../../models/config";

const model = initModels(sequelize);

interface T {
    res: NextApiResponse;
    req: NextApiRequest;
}
export default async function getAllUnit(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method == "GET") {
            let data = await model.Units.findAll()
            successCode(res, data, " Get list of stat success")
        } else {
            failCode(res, req, "Error method");
        }
    } catch (error: any) {
        return errorCode(error, "Da co loi, khong thanh cong");
    }
}