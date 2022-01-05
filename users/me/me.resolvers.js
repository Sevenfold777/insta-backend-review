import client from "../../client";

export default {
  Query: {
    me: (_, _, { loggedInUser }) =>
      client.user.findUnique({ where: { id: loggedInUser.id } }),
  },
};
