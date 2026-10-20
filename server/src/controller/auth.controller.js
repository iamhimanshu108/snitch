import userModel from "../models/user.model.js";
import bcryptjs from "bcryptjs"
import { createAccessToken, createRefreshToken } from "../utils/auth.utils.js";


/**
 * @description Register an User and save the Data from req.body
 * @param req Express.request
 * @param req.body   Object
 * @param req.body.email   String
 * @param req.body.name  String
 * @param req.body.password  String
 */

export async function register(req, res) {
  const { email, name, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({
    email,
  });

  if (isUserAlreadyExists) {
    return res.status(400).json({
      message: "User Alredy Exists with this Email Address",
      errors: [
        {
          field: "email",
          message: "User already exists with this email addres",
        },
      ],
    });
  }

  const user = await userModel.create({
    email,
    name,
    passwordHash:await bcrypt.hash(password, 12)
  })


  const accessToken = createAccessToken({
    userId:user._id,
    role: user.role
  })

  const refreshToken = createRefreshToken({
    userId: user._id,
    role: user.role
  })
}
