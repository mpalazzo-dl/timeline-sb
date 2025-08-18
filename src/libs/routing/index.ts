import gql from "graphql-tag";

import { ArticleLinkFragment } from "./lib/article-routing";
import { PageLinkFragment } from "./lib/page-routing";
import { PdfLinkFragment } from "./lib/pdf-routing";

export const LinkFragment = gql`
  ${PageLinkFragment}
  ${ArticleLinkFragment}
  ${PdfLinkFragment}

  fragment Link on Link {
    internalTitle
    linkType
    pageLink {
      ...PageLink
      ...ArticleLink
      ...PdfLink
    }
    customLink
    target
  }
`;
