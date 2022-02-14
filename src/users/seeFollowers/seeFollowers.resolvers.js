import client from "../../client";

export default {
  Query: {
    seeFollowers: async (_, { userName, page }) => {
      const ok = await client.user.findUnique({
        where: { userName },
        select: { id: true }, // tiny optimization; scan users only with id
      });

      if (!ok) {
        return { ok: false, error: "User not found." };
      }

      // find followers with pagination; currently paginated by 5
      const followers = await client.user
        .findUnique({ where: { userName } })
        .followers({
          take: 5,
          skip: (page - 1) * 5,
        });

      // count total followers with .count method
      const totalFollowers = await client.user.count({
        where: { following: { some: { userName } } },
      });

      return {
        ok: true,
        followers,
        totalPages: Math.ceil(totalFollowers / 5),
      };
    },
  },
};
