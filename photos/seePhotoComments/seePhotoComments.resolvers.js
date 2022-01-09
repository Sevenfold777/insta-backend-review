import client from "../../client";

export default {
  Query: {
    seePhotoComments: (_, { photoId }) =>
      client.photo.findUnique({ where: { id: photoId } }).comments(),
  },
};
