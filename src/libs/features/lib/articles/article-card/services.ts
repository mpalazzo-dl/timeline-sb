import gql from "graphql-tag";

import { CfImageFragment } from "@aces/fragments";

export const ArticleCardFragment = gql`
  ${CfImageFragment}

  fragment ArticleCard on Article {
    title
    slug
    publishDate
    excerpt
    bodyCopy {
      json
    }
    featuredImage {
      ...Image
    }
    sys {
      id
    }
  }
`;
