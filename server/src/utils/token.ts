import jwt from "jsonwebtoken";
interface UserType {
  email: string
}
export const generateAuthToken = (userData: UserType) => {
  return jwt.sign(userData, process.env.PRIVATE_KEY as string, { expiresIn: '1h' })
}
