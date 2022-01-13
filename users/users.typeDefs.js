import { gql } from "apollo-server";

export default gql`
  type User {
    id: Int!
    firstName: String!
    lastName: String
    userName: String!
    email: String!
    password: String!
    bio: String
    avatar: String
    photos: [Photo]
    following: [User]
    followers: [User]
    createdAt: String!
    updatedAt: String!
    totalFollowers: Int!
    totalFollowing: Int!
    isFollowing: Boolean!
    isMe: Boolean!
  }
`;
