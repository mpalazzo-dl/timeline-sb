import gql from "graphql-tag";

import { defaultLocale } from "@aces/i18n";
import { cfClient, cfPreviewClient } from "@aces/contentful";

export const VideoEmbedFragment = gql`
  fragment VideoEmbed on VideoEmbed {
    internalTitle
    embedCode
    sys {
      id
    }
  }
`;

export const buildVideoEmbedQuery = (timestamp?: string) => {
  const now = new Date();
  const includeTimeline =
    timestamp && new Date(timestamp) > now
      ? `@timeline(where: { timestamp_lte: "${timestamp}" })`
      : "";

  return gql`
    ${VideoEmbedFragment}

    query ($id: String!, $preview: Boolean!) 
    ${includeTimeline} {
      videoEmbed(id: $id, preview: $preview) {
        ...VideoEmbed
      }
    }
  `;
};

export const fetchVideoEmbedData = async (
  id: string,
  preview = false,
  locale: string = defaultLocale,
  date?: string,
) => {
  const client = preview ? cfPreviewClient : cfClient;
  const timestamp = date || new Date().toISOString();

  const VideoEmbedQuery = buildVideoEmbedQuery(timestamp);

  try {
    const response = await client.query({
      query: VideoEmbedQuery,
      variables: { id, preview, locale },
    });

    return response.data.videoEmbed;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
