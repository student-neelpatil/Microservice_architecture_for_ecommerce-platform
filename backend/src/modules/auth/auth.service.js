import User from "./auth.model.js";

import { hashPassword } from "../../utils/hash.js";
import { comparePassword } from "../../utils/hash.js";
import { generateAccessToken } from "../../utils/generateTokens.js";
import { generateRefreshToken } from "../../utils/generateTokens.js";



export const registerService =
async (data) => {

  /*
  ============================
  CHECK EXISTING USER
  ============================
  */

  const existingUser =
    await User.findOne({

      where: {
        email: data.email,
      },

    });

  if (existingUser) {

    throw new Error(
      "User already exists"
    );

  }
   
  const hashedPassword =
    await hashPassword(
      data.password
    );

  const user =
    await User.create({

      name: data.name,

      email: data.email,

      password: hashedPassword,

    });

  return user;
};



export const loginService = async (data) => {

   const extingUser = await User.findOne({
    
    where: {
      email: data.email,
    },
  });

  if (!extingUser) {
    throw new Error("Invalid credentials");
  }

  const newHashedPassword = await hashPassword(data.password);

  //compare password

  const isPasswordMatched = await comparePassword(data.password, newHashedPassword);

  if (!isPasswordMatched) {
    throw new Error("Invalid credentials");
 }
  
 //generate tokens

    const accessToken = generateAccessToken(extingUser);

    const refreshToken = generateRefreshToken(extingUser);

  return {
    extingUser,accessToken,refreshToken,
 }; 


}