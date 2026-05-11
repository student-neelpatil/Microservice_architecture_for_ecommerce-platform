import User from "./auth.model.js";

import { hashPassword } from "../../utils/hash.js";



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