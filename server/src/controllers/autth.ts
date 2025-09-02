import bcrypt from 'bcrypt';
import { generateAuthToken, decriptToken } from '../utils/token';

import User from '../models/users';
import { Request, Response } from 'express';


export const postSignIn = async (req: Request, res: Response) => {
  const { _id, email, password } = req.body;
  const user: any = await User.findById(_id);

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
export const postSignUp = async (req: Request, res: Response) => {
  const { _id, firstname, email, password } = req.body;
  let user = await User.findOne({ email: email });
  if (user) return res.status(400).json({ error: 'User already exists!' })

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt)
  console.log('user uid: ', _id)

  try {
    const newUser = new User({
      _id,
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
export const postMe = async (req: Request, res: Response) => {
  const decodedToken = decriptToken(req.body.token);
  console.log('decripted token: ', decodedToken);
  res.status(200).json(decodedToken)
}
export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findById(id)
  return res.status(200).json(user);
}
