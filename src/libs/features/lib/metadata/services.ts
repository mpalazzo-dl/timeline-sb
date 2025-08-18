import gql from "graphql-tag";

export const MetadataFragment = gql`
  fragment Metadata on Metadata {
    title
    description
    socialTitle
    socialDescription
    socialImage {
      url
    }
    searchEngineVisibility
    searchIndex
    keywords
    schema
  }
`;
