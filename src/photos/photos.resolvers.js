import client from "../client";

export default {
  // computed fields for photos
  Photo: {
    user: ({ userId }) => client.user.findUnique({ where: { id: userId } }),
    hashtags: ({ id }) =>
      client.hashtag.findMany({ where: { photos: { some: { id } } } }),
    isMine: ({ userId }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return userId === loggedInUser.id;
    },

    comments: ({ id }) => client.photo.findUnique({ where: { id } }).comments(),
    commentNum: ({ id }) => client.comment.count({ where: { photoId: id } }),

    likeNum: ({ id }) => client.like.count({ where: { photoId: id } }),
    isLiked: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      const ok = await client.like.findUnique({
        where: {
          photoId_userId: {
            photoId: id,
            userId: loggedInUser.id,
          },
        },
        select: {
          id: true,
        },
      });
      if (ok) {
        return true;
      }
      return false;
    },
  },

  // computed fields for hashtags
  Hashtag: {
    // need pagination
    photos: ({ id }) => client.hashtag.findUnique({ where: { id } }).photos(),
    totalPhotos: ({ id }) =>
      client.photo.count({ where: { hashtags: { some: { id } } } }),
  },
};
