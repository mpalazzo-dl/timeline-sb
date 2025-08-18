import gql from "graphql-tag";

export const PdfLinkFragment = gql`
  fragment PdfLink on PdfDocument {
    slug
  }
`;
