import bcrypt from 'bcrypt';
import { generateAuthToken } from '../utils/token';
import User from '../models/users';


export const postSignIn = async (req: any, res: any) => {
  const { email, password } = req.body;
  console.log('email: ', email, '\npassword: ', password);
  res.status(200).json(req.body)
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
    const token = generateAuthToken({email: user.email });
    res.status(200).json(token);
  } catch (error) {
    console.error('Error message: ', error)
  }
}
