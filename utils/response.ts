
import { NextApiResponse } from 'next';
type Data = {
  message: string;
}
export interface ResponseAttributes {
  message: string,
  data: object,
  res: object
}

const successCode = (res: NextApiResponse, data: object | string, message: string): any => {
  res.status(200).json({
    message,
    content: data
  })
}

const failCode = (res: NextApiResponse, data: object | string, message: string): any => {
  res.status(400).json({
    message,
    content: data
  })
}

const errorCode = (res: NextApiResponse, message: string): any => {

  res.status(500).json(message)
}
export { successCode, failCode, errorCode }