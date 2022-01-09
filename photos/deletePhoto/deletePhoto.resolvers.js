import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deletePhoto: protectedResolver(async (_, { photoId }, { loggedInUser }) => {
      const targetPhoto = await client.photo.findUnique({
        where: { id: photoId },
        select: { userId: true },
      });
      // check if the photo exist
      if (!targetPhoto) {
        return { ok: false, error: "Photo not found." };
      } else if (targetPhoto.userId !== loggedInUser.id) {
        // check if the current user is authorized
        return { ok: false, error: "Unauthorized." };
      }

      // deletion
      await client.photo.delete({ where: { id: photoId } });

      return { ok: true };
    }),
  },
};
