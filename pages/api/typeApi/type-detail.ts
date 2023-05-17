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
export default async function getTypeDetail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method == "PUT") {
      let {id}= req.body;
      let arrId = id.split(',')
      let data: any= []
     console.log(arrId.length)
     if(  arrId.length > 1){
      for(let i = 0; i < arrId.length ; i++){
        data.push( await model.Type.findAll({where:{
          id:arrId[i]
        }}))
    }
    }
    else{
      data = await model.Type.findAll({where:{
        id
      }})
     }
      console.log(data,'data')
      successCode(res, data, "Type detail");
    } else {
      failCode(res, req, "Error method");
    }
  } catch (error: any) {
    return errorCode(error, "Error 500");
  }
}
