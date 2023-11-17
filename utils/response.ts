
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

const errorCode = (res: NextApiResponse, data: object | string, message: string): any => {
  res.status(444).json({
    message,
    content: data
  })
}
export { successCode, failCode, errorCode }