import client from "../../client";

export default {
  Mutation: {
    toggleLike: async (_, { photoId }, { loggedInUser }) => {
      // find the Target Photo to Like/Dislike
      const targetPhoto = await client.photo.findUnique({
        where: { id: photoId },
      });
      if (!targetPhoto) {
        return { ok: false, error: "Photo not found." };
      }

      // toggle like
      const like = await client.like.findUnique({
        where: { photoId_userId: { photoId, userId: loggedInUser.id } },
      });

      // if Like exists --> delete like
      if (like) {
        // like deletion
        await client.like.delete({
          where: { photoId_userId: { photoId, userId: loggedInUser.id } },
        });
      } else {
        // Yet liked --> create like
        // create할 때는 @relation이 있는 field 사용
        await client.like.create({
          data: {
            photo: { connect: { id: photoId } },
            user: { connect: { id: loggedInUser.id } },
          },
        });
      }

      // final return result
      return { ok: true };
    },
  },
};
