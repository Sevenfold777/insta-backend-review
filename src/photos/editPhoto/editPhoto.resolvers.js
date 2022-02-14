import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../photos.utils";

export default {
  Mutation: {
    editPhoto: protectedResolver(
      async (_, { id, caption }, { loggedInUser }) => {
        // find photo with arg {id}
        // findUnique로 찾고 이후에 if (oldPhoto.userId === loggedInUser.id) 가능
        // 여기에서는 한 번에 검색하기 위하여 findUnique 대신 findFirst 사용(userId가 unique field가 아니기 때문)
        const oldPhoto = await client.photo.findFirst({
          where: { id, userId: loggedInUser.id },
          include: { hashtags: { select: { hashtag } } }, // select only hashtag for efficiency
        });
        if (!oldPhoto) {
          return { ok: false, error: "Photo not found." };
        }

        // update photo: disconnect oldPhoto's hashtags, connectOrCreate new Caption's hashtags
        await client.photo.update({
          where: { id: loggedInUser.id },
          data: {
            caption,
            hashtags: {
              disconnect: oldPhoto.hashtags,
              connectOrCreate: processHashtags(caption),
            },
          },
        });

        return { ok: true };
      }
    ),
  },
};
