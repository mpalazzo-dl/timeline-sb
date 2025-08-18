import gql from "graphql-tag";

export const AppQuery = gql`
  query ($appId: String!, $preview: Boolean!) {
    appsCollection(where: { appId: $appId }, limit: 1, preview: $preview) {
      items {
        appName
        appId
        copyrightText
        sys {
          id
        }
      }
    }
  }
`;
