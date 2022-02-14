import client from "../../client";
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";
import { uploadToS3 } from "../../shared/shared.utils";

export default {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        {
          firstName,
          lastName,
          userName,
          email,
          password: newPassword,
          avatar,
          bio,
        },
        { loggedInUser }
      ) => {
        // if password input
        let uglypassword = null;
        if (newPassword) {
          // hash new password
          uglypassword = await bcrypt.hash(newPassword, 10);
        }

        // AWS Avatar upload
        let avatarUrl = null;
        if (avatar) {
          avatarUrl = await uploadToS3(avatar, loggedInUser.id, "avatar");
        }

        const updatedUser = await client.user.update({
          where: { id: loggedInUser.id },
          data: {
            firstName,
            lastName,
            userName,
            email,
            ...(uglypassword && { password: uglypassword }),
            ...(avatarUrl && { avatar: avatarUrl }),
            bio,
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
