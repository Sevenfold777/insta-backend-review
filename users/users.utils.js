import jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async (token) => {
  //if no token exists - e.g. createAccount
  if (!token) {
    return null;
  }

  const { id } = jwt.verify(token, process.env.SECRET_KEY);
  const user = await client.user.findUnique({ where: { id } });

  try {
    // if valid user found with the TOKEN
    if (user) {
      return user;
    }
  } catch {
    // invalid token
    return null;
  }
};

export const protectedResolver =
  (ourResolver) => (root, args, context, info) => {
    if (!context.loggedInUser) {
      return { ok: false, error: "Please Login to perform this action." };
    }
    return ourResolver(root, args, context, info);
  };
