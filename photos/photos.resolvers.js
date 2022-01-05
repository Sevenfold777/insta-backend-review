import client from "../client";

export default {
  // computed fields for photos
  Photo: {
    user: ({ userId }) => client.user.findUnique({ where: { id: userId } }),
    hashtags: ({ id }) =>
      client.hashtag.findMany({ where: { photos: { some: { id } } } }),
  },

  // computed fields for hashtags
  Hashtag: {
    // need pagination
    photos: ({ id }) => client.hashtag.findUnique({ where: { id } }).photos(),
    totalPhotos: ({ id }) =>
      client.photo.count({ where: { hashtags: { some: { id } } } }),
  },
};
