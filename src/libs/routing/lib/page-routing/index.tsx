import gql from "graphql-tag";

export const PageLinkFragment = gql`
  fragment PageLink on Page {
    slug
    specialtyPage
    parentPage {
      slug
      specialtyPage
    }
  }
`;
