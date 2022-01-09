import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeFeed: protectedResolver((_, __, { loggedInUser }) =>
      client.photo.findMany({
        where: {
          // OR Filter 사용 시 대괄호 [] 사용
          OR: [
            // 1. loggedInUser가 photo의 주인의 follower에 포함되면
            { user: { followers: { some: { id: loggedInUser.id } } } },
            // 2. loggedInUser의 photo
            { userId: loggedInUser.id },
          ],
        },
        // update된 순서로 정렬
        orderBy: { updatedAt: "desc" },
      })
    ),
  },
};
