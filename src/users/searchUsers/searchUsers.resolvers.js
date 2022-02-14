import client from "../../client";

/* pagination has to be done */
export default {
  Query: {
    searchUsers: (_, { keyword }) =>
      client.user.findMany({
        where: { userName: { startsWith: keyword.toLowerCase() } },
      }),
  },
};
