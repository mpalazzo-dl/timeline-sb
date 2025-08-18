import gql from "graphql-tag";

import { defaultLocale } from "@aces/i18n";
import { cfClient, cfPreviewClient } from "@aces/contentful";

export const HeaderQuery = gql`
  query ($id: String!, $preview: Boolean!, $locale: String) {
    header(id: $id, preview: $preview, locale: $locale) {
      internalTitle
      headline
      headerType
      alignment
      containerWidth
      sys {
        id
      }
    }
  }
`;

export const fetchHeaderData = async (
  id: string,
  preview = false,
  locale: string = defaultLocale,
) => {
  const client = preview ? cfPreviewClient : cfClient;
  try {
    const response = await client.query({
      query: HeaderQuery,
      variables: { id, preview, locale },
    });

    return response.data.header;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
