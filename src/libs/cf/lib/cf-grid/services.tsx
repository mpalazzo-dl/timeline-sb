import gql from "graphql-tag";

import { defaultLocale } from "@aces/i18n";
import { cfClient, cfPreviewClient } from "@aces/contentful";

export const GridQuery = gql`
  query ($id: String!, $preview: Boolean!, $locale: String) {
    grid(id: $id, preview: $preview, locale: $locale) {
      internalTitle
      gridColumnCount
      gridItemsStyle
      verticalAlignment
      listItemsCollection {
        items {
          ... on Image {
            sys {
              id
            }
          }
          ... on RichTextSection {
            backgroundColor
            sys {
              id
            }
          }
        }
      }
      sys {
        id
      }
    }
  }
`;

export const fetchGridData = async (
  id: string,
  preview = false,
  locale: string = defaultLocale,
) => {
  const client = preview ? cfPreviewClient : cfClient;
  try {
    const response = await client.query({
      query: GridQuery,
      variables: { id, preview, locale },
    });

    return response.data.grid;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
