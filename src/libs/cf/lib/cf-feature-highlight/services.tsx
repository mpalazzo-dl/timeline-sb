import gql from "graphql-tag";

import { defaultLocale } from "@aces/i18n";
import { cfClient, cfPreviewClient } from "@aces/contentful";

import { CfImageFragment } from "@aces/fragments";

export const buildFeatureHighlightQuery = (timestamp?: string) => {
  const now = new Date();
  const includeTimeline =
    timestamp && new Date(timestamp) > now
      ? `@timeline(where: { timestamp_lte: "${timestamp}" })`
      : "";

  return gql`
    ${CfImageFragment}

    query ($id: String!, $preview: Boolean!, $locale: String) 
    ${includeTimeline} {
      featureHighlight(id: $id, preview: $preview, locale: $locale) {
        internalTitle
        headline
        bodyCopy {
          json
        }
        media {
          ...Image
        }
        sys {
          id
        }
      }
    }
  `;
};

export const fetchFeatureHighlightData = async (
  id: string,
  preview = false,
  locale: string = defaultLocale,
  date?: string,
) => {
  const client = preview ? cfPreviewClient : cfClient;
  const timestamp = date || new Date().toISOString();

  const FeatureHighlightQuery = buildFeatureHighlightQuery(timestamp);

  try {
    const response = await client.query({
      query: FeatureHighlightQuery,
      variables: { id, preview, locale },
    });

    return response.data.featureHighlight;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
