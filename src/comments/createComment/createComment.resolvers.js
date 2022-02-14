import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createComment: protectedResolver(
      async (_, { photoId, payload }, { loggedInUser }) => {
        // check if the photo exists
        const targetPhoto = await client.photo.findUnique({
          where: { id: photoId },
        });
        if (!targetPhoto) {
          return { ok: false, error: "Photo not found." };
        }

        // Comment Creation
        await client.comment.create({
          data: {
            payload,
            user: { connect: { id: loggedInUser.id } }, // connect user
            photo: { connect: { id: photoId } }, // connect photo
          },
        });

        // Return Result
        return { ok: true };
      }
    ),
  },
};
