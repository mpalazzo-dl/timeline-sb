import gql from "graphql-tag";

import { defaultLocale } from "@aces/i18n";
import { cfClient, cfPreviewClient } from "@aces/contentful";

export const buildHeaderQuery = (timestamp?: string) => {
  const now = new Date();
  const includeTimeline =
    timestamp && new Date(timestamp) > now
      ? `@timeline(where: { timestamp_lte: "${timestamp}" })`
      : "";

  return gql`
    query ($id: String!, $preview: Boolean!, $locale: String) 
    ${includeTimeline} {
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
};

export const fetchHeaderData = async (
  id: string,
  preview = false,
  locale: string = defaultLocale,
  date?: string,
) => {
  const client = preview ? cfPreviewClient : cfClient;
  const timestamp = date || new Date().toISOString();

  const HeaderQuery = buildHeaderQuery(timestamp);
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
