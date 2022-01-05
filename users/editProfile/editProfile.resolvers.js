import client from "../../client";
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        { firstName, lastName, userName, email, password: newPassword },
        { loggedInUser }
      ) => {
        // if password input
        let uglypassword = null;
        if (newPassword) {
          // hash new password
          uglypassword = await bcrypt.hash(newPassword, 10);
        }

        const updatedUser = await client.user.update({
          where: { id: loggedInUser.id },
          data: {
            firstName,
            lastName,
            userName,
            email,
            ...(uglypassword && { password: uglypassword }),
          },
        });

        if (updatedUser.id) {
          return { ok: true };
        } else {
          return { ok: false, error: "Cannot Update Profile." };
        }
      }
    ),
  },
};
