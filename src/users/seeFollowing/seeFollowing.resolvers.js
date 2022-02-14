import client from "../../client";

export default {
  Query: {
    seeFollowing: async (_, { userName, page }) => {
      // check if the user exists
      const ok = client.user.findUnique({
        where: { userName },
        select: { id: true },
      });
      if (!ok) {
        return { ok: false, error: "User not found." };
      }

      // find following list; if use findMany.length --> inefficienty
      const following = client.user
        .findUnique({ where: { userName } })
        .following({
          take: 5,
          skip: (page - 1) * 5,
        });

      const totalFollowing = client.user.count({
        where: { following: { some: { userName } } },
      });

      return {
        ok: true,
        following,
        totalPages: Math.ceil(totalFollowing / 5),
      };
    },
  },
};
