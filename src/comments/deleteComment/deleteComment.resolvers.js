import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteComment: protectedResolver(
      async (_, { commentId }, { loggedInUser }) => {
        // check if the comment exists
        const targetComment = await client.comment.findUnique({
          where: { id: commentId },
          select: { userId: true },
        });

        // check if a comment with the id exists
        if (!targetComment) {
          return { ok: false, error: "Comment Not found." };
        } else if (targetComment.userId !== loggedInUser.id) {
          // if comment is not written by current loggedInUser
          return { ok: false, error: "Unauthorized." };
        }

        // If user Authorized, delete the comment
        await client.comment.delete({ where: { id: commentId } });

        // return result
        return { ok: true };
      }
    ),
  },
};
