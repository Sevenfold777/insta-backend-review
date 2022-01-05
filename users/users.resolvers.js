import client from "../client";

/* computed fields - not in DB but is schema */
export default {
  User: {
    totalFollowers: ({ id }) =>
      client.user.count({ where: { following: { some: { id } } } }),

    totalFollowing: ({ id }) =>
      client.user.count({ where: { followers: { some: { id } } } }),

    isFollowing: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }

      const existence = await client.user.count({
        where: { id: loggedInUser.id, following: { some: { id } } },
      });

      return Boolean(existence);
    },

    isMe: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }

      return id === loggedInUser.id;
    },
  },
};
