import client from "../../client";

export default {
  Query: {
    seePhotoLikes: async (_, { photoId }) => {
      const likes = await client.like.findMany({
        where: { photoId },
        select: { user: true },
      });
      // cannot use "select" and "include" at the same time!!!
      // "select" : not getting createdAt, updatedAt ...etc

      /* array.map((a) => { }): array의 원소들을 어떤 처리하여 새로운 arrary return */
      return likes.map((like) => like.user);
    },
  },
};
