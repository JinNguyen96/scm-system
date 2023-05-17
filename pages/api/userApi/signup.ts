import { NextApiRequest, NextApiResponse } from "next";
import { failCode, successCode, errorCode } from "../../../utils/response";
import * as bcrypt from "bcrypt-ts";
import initModels from "../../../models/init-models";
import sequelize from "../../../models/config";
import { UserAttributes } from "../../../models/users";
import { validateSignup } from "../validator";
import { fail } from "assert";

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
    if (req.method === "POST") {
      let { error } = validateSignup(req.body);

      if (error) {
        console.log(error);
        return failCode(res, error, "email da ton tai");
      } else {
        let {
          userFirstName,
          userEmail,
          userPassword,
          userRole,
          userType,
          userPhoneNumber,
          userLastName,
          userDob,
          userAdress,
          userCategory,
          relatedType,
          relatedUser,
        } = req.body;
        let getIdByRole = await model.Roles.findAll({
          where: {
            id: userRole,
          },
        });
        let result1 = [];
        result1 = getIdByRole.map((perm) => perm.rolePermission);

        let data = {
          id: 0,
          userType : userType.toString(),
          userEmail,
          userPassword: bcrypt.hashSync(userPassword, 10),
          userRole : userRole.toString(),
          userPhoneNumber,
          userFirstName,
          userLastName,
          userDob,
          userAdress,
          userCategory,
          relatedType: relatedType.toString(),
          relatedUser: relatedUser.toString(),
        };

        let checkEmail = await model.Users.findOne({
          where: {
            userEmail: userEmail,
          },
        });
        if (checkEmail) {
          return failCode(res, result1, "Email đã tồn tại");
        } else {
          await model.Users.create(data);
          let userIdCreteNew = await model.Users.findOne({
            where: {
              userEmail,
            },
          });
          return successCode(res, data, "Tao tk thanh cong");
        }
      }
    } else if (req.method === "PUT") {
      let { userType,id } = req.body;
      let dataType:any = []
      for (let i = 0; i < userType.length; i++) {
        console.log(userType[i],'userType[i]')
         await model.Users.findAll({
          where: {
            userType: userType[i],
          },
        })
          .then((result) => {
          console.log(dataType,'on for')

          return  dataType.push(result.map(e => e.dataValues))
          })
          .catch((err: any) => {
            console.log(err);
          });
          
        }
        console.log(dataType,'on for')
       let UserInf = await model.Users.findByPk(id)
       
       let typeOfUser= await model.Type.findByPk(
        Number(UserInf?.dataValues.userType),{
          include:[{
            model:model.Users,
           as:'user_type'
          }]
        }
        )
        let record:any = [{}]
       console.log(typeOfUser?.dataValues,'typeOfUser')



       let newRecord = dataType.map((obj:any) => {
        console.log(obj,'obj')
        return obj.map(async (item:any) => { 
           await model.Type.findByPk(Number(item.userType)).then((result) => { 
            console.log(result?.dataValues,'result?.dataValues')
            return record.push(result?.dataValues)
            
            
            }).catch((err:any)=> console.log(err))
            
          })
          
          
        })
        console.log(record,'rec')
       console.log(newRecord,'newRecord')
      successCode(res, dataType, "tim thanh cong");
   
      
    } else {
      return failCode(res, "", "sai method");
    }
  } catch (error: any) {
    return errorCode(error, "Dang ky khong thanh cong");
  }
}
