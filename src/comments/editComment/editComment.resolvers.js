import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    editComment: protectedResolver(
      async (_, { commentId, payload }, { loggedInUser }) => {
        // check if a comment with commentId exists
        const oldComment = await client.comment.findFirst({
          where: { id: commentId, userId: loggedInUser.id },
        });
        if (!oldComment) {
          return { ok: false, error: "Comment not found." };
        }

        // update(edit) payload
        await client.comment.update({
          where: { id: commentId },
          data: { payload },
        });

        // return Result
        return { ok: true };
      }
    ),
  },
};
