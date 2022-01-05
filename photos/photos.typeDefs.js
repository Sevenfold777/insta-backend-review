import { gql } from "apollo-server-core";

export default gql`
  type Photo {
    id: Int!
    user: User!
    file: String!
    caption: String
    hashtags: [Hashtag]
    createdAt: String!
    updatedAt: String!
    likeNum: Int!
    # comments: [Comment]
    # commenNum: Int!
    isMine: Boolean!
    isLiked: Boolean!
    # userId    Int --> written in schema, not needed in gql
    # likes:     [Like]
  }

  type Hashtag {
    id: Int!
    hashtag: String!
    photos: [Photo] # need pagination
    totalPhotos: Int!
    createdAt: String!
    updatedAt: String!
  }

  type Like {
    id: Int!
    photo: Photo!
    createdAt: String!
    updatedAt: String!
    # user: User! --> don't need to be same with prisma.schema
  }
`;
