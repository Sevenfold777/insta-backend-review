import client from "../../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
  Mutation: {
    login: async (_, { userName, password }) => {
      // find corresponding user
      const logginUser = await client.user.findFirst({ where: { userName } });
      // if not exist, return false with error msg (no token)
      if (!logginUser) {
        return { ok: false, error: "User not found." };
      }

      // check password
      const validLoggin = await bcrypt.compare(password, logginUser.password);
      // if wrong password
      if (!validLoggin) {
        return { ok: false, error: "Incorrect Password" };
      }

      // Valid Loggin --> issue a token and send it to the user
      // token에는 secret(private) info를 저장하면 안됨 (e.g. password)
      const token = await jwt.sign(
        { id: logginUser.id },
        process.env.SECRET_KEY
      );

      return { ok: true, token };
    },
  },
};
