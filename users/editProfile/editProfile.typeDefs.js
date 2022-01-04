import { gql } from "apollo-server";

export default gql`
  type Mutation {
    editProfile(
      firstName: String
      lastName: String
      userName: String
      email: String
      password: String
    ): MutationResponse!
  }
`;