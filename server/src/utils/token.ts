import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
interface UserType {
  email: string
  password: string
}
export const generateAuthToken = (userData: UserType) => {
  return jwt.sign(userData, process.env.PRIVATE_KEY as string, { expiresIn: '1h' })
}

export const decriptToken =  (userToken: any) => {
  return jwt.verify(userToken, process.env.PRIVATE_KEY as string);
}
