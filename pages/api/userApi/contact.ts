require("dotenv").config();
import { NextApiRequest, NextApiResponse } from "next";
import sgMail from "@sendgrid/mail";
import init_models from "../../../models/init-models";
import sequelize from "../../../models/config";
import { errorCode, failCode, successCode } from "../../../utils/response";
const model = init_models(sequelize);

sgMail.setApiKey(
  "SG.NDlZenRhTOaIC2I-TDT2yQ.dWJGCnI1pXS1yyd4dClsWp_Noy2zylbqvDD1wabxyPs"
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "PUT") {
      let { userEmail } = req.body;

      let checkUser = await model.Users.findOne({
        where: {
          userEmail,
        },
      });
      if (checkUser) {
        const msg = {
          to: `${userEmail}`,
          from: "quangquyendad@gmail.com",
          subject: "SCM Reset password",
          html: `<p><strong>Name:</strong></p>
                <p><strong>From Email:</strong>${userEmail}</p>
                <p><strong>Desc:</strong></p>
                <p><strong>Url:</strong>Localhost:3000/api/forgot-password</p>`,
        };
        await sgMail
          .send(msg)
          .then((result) => {

          })
          .catch((err) => {

          });
        return res.json(successCode(res, userEmail, "Send Email thành công"));
      } else {
        return failCode(res, "", "Email khong ton tai");
      }
    }
    return failCode(res, "", "sai method");
  } catch (error: any) {
    return errorCode(error, "lỗi 500");
  }
}
