import gql from "graphql-tag";

export const CategoriesFragment = gql`
  fragment Categories on Categories {
    title
    slug
  }
`;

export const AllCategoriesQuery = gql`
  ${CategoriesFragment}

  query ($preview: Boolean!, $locale: String!) {
    categoriesCollection(preview: $preview, locale: $locale) {
      items {
        ...Categories
        linkedFrom {
          articleCollection {
            items {
              slug
            }
            total
          }
        }
      }
    }
  }
`;
