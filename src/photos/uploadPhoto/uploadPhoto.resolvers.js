import client from "../../client";
import { uploadToS3 } from "../../shared/shared.utils";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../photos.utils";

export default {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { loggedInUser }) => {
        let hashtagObjs = null;
        if (caption) {
          // parse String Captions with #hashtags
          // get #hashtags or create it
          hashtagObjs = processHashtags(caption);
        }

        // AWS file upload, get the file url
        const fileUrl = await uploadToS3(file, loggedInUser.id, "upload");

        return await client.photo.create({
          data: {
            ...(fileUrl && { file: fileUrl }),
            caption,
            user: { connect: { id: loggedInUser.id } },
            ...(hashtagObjs.length > 0 && {
              hashtags: { connectOrCreate: hashtagObjs },
            }),
          },
        });
      }
    ),
  },
};
