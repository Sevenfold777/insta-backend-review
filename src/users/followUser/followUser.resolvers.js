import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    followUser: protectedResolver(async (_, { userName }, { loggedInUser }) => {
      // find user
      const ok = await client.user.findUnique({ where: { userName } });
      // if no user exists
      if (!ok) {
        return { ok: false, error: "That user does not exist." };
      }

      await client.user.update({
        where: { id: loggedInUser.id },
        data: { following: { connect: { userName } } }, // connect is only for @unique
      });

      return { ok: true };
    }),
  },
};
