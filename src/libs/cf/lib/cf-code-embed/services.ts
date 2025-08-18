import gql from "graphql-tag";

import { defaultLocale } from "@aces/i18n";
import { cfClient, cfPreviewClient } from "@aces/contentful";

export const CodeEmbedQuery = gql`
  query ($id: String!, $preview: Boolean!) {
    codeEmbed(id: $id, preview: $preview) {
      internalTitle
      embedCode
      sys {
        id
      }
    }
  }
`;

export const fetchCodeEmbedData = async (
  id: string,
  preview = false,
  locale: string = defaultLocale,
) => {
  const client = preview ? cfPreviewClient : cfClient;
  try {
    const response = await client.query({
      query: CodeEmbedQuery,
      variables: { id, preview, locale },
    });

    return response.data.codeEmbed;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
