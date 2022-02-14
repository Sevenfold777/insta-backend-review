import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    toggleLike(photoId: Int!): MutationResponse!
  }
`;
