import gql from "graphql-tag";

export const ArticleLinkFragment = gql`
  fragment ArticleLink on Article {
    slug
  }
`;
