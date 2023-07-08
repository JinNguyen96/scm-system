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
export default async function getAllRole(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        // let { id } = req.body;
        // let isRoleUnLink = await model.Users.count({
        //   where: {
        //     userRole: id,
        //   },
        // });
        // if (isRoleUnLink) {
        //   let userInRole = await model.Users.findAll({
        //     where: { userRole: id },
        //   });

        //   failCode(
        //     res,
        //     userInRole,
        //     "Can not delete this role because someone is on the role, remove user from this role and try again"
        //   );
        // } else {
        //   let result = await model.Roles.destroy({
        //     where: {
        //       id,
        //     },
        //   });
        if (req.method === "DELETE") {
            let { id } = req.body;
            let findMaterById = await model.Materials.findByPk(id)
            if (findMaterById) {
                await model.Materials.destroy({
                    where: {
                        id
                    }
                })
            } else {
                failCode(res, '', "Can not find material")
            }
            successCode(res, "", "Delete material success");
            // }

        } else {
            failCode(res, `${req.method}`, 'Sai method')
        }
    } catch (error: any) {
        return errorCode(error, "Delete unsuccess");
    }
}
