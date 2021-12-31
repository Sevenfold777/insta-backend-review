import client from "../../client";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, userName, email, password }
    ) => {
      try {
        // check if username or email are already on DB.
        const existingUser = await client.user.findFirst({
          where: {
            OR: [{ userName }, { email }],
          },
        });

        console.log(existingUser);

        // if found existing username/email, throw error msg
        if (existingUser) {
          throw new Error("This username/email is already taken");
        }

        // hash password using bcyrpt lib
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user & save
        await client.user.create({
          data: {
            userName,
            email,
            firstName,
            lastName,
            password: hashedPassword,
          },
        });

        return { ok: true };
      } catch (e) {
        return e;
      }
    },
  },
};
