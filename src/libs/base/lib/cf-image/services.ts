import gql from "graphql-tag";

import { defaultLocale } from "@aces/i18n";
import { cfClient, cfPreviewClient } from "@aces/contentful";
import { CfImageFragment } from "@aces/fragments";

export const buildImageQuery = (timestamp?: string) => {
  const now = new Date();
  const includeTimeline =
    timestamp && new Date(timestamp) > now
      ? `@timeline(where: { timestamp_lte: "${timestamp}" })`
      : "";

  return gql`
  ${CfImageFragment}

  query ($id: String!, $preview: Boolean!, $locale: String) 
  ${includeTimeline} {
    image(id: $id, preview: $preview, locale: $locale) {
      ...Image
    }
  }
  `;
};

export const fetchImageData = async (
  id: string,
  preview = false,
  locale: string = defaultLocale,
  date?: string,
) => {
  const client = preview ? cfPreviewClient : cfClient;
  const timestamp = date || new Date().toISOString();

  const ImageQuery = buildImageQuery(timestamp);
  try {
    const response = await client.query({
      query: ImageQuery,
      variables: { id, preview, locale },
    });

    return response.data.image;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
