import bcrypt from 'bcrypt';
import { generateAuthToken, decriptToken } from '../utils/token';

import User from '../models/users';


export const postSignIn = async (req: any, res: any) => {
  const { email, password } = req.body;
  const user: any = await User.findOne({ email });

  if (!user) return res.status(400).json({ error: "The user does not exist!" });
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(400).json({ error: "Invalid username or password" });

  const token = generateAuthToken({ email: user.email, password: user.password });
  console.log('token: ', token)
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict'
  })
  res.status(200).json(token)
}
export const postSignUp = async (req: any, res: any) => {
  const { firstname, email, password } = req.body;
  let user = await User.findOne({ email: email });
  if (user) return res.status(400).json({ error: 'User already exists!' })

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt)

  try {
    const newUser = new User({
      firstname,
      email,
      password: hashedPass,
    })
    user = await newUser.save();
    const token = generateAuthToken({ email: user.email, password: hashedPass });
    res.status(200).json(token);
  } catch (error) {
    console.error('Error message: ', error)
  }
}
export const postMe = async (req: any, res: any) => {
  const decodedToken = decriptToken(req.body.token);
  console.log('decripted token: ', decodedToken);
  res.status(200).json(decodedToken)
}
