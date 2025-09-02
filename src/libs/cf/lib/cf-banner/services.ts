import gql from "graphql-tag";

import { defaultLocale } from "@aces/i18n";
import { cfClient, cfPreviewClient } from "@aces/contentful";
import { CfButtonFragment, CfImageFragment } from "@aces/fragments";

export const buildBannerQuery = (timestamp?: string) => {
  const now = new Date();
  const includeTimeline =
    timestamp && new Date(timestamp) > now
      ? `@timeline(where: { timestamp_lte: "${timestamp}" })`
      : "";

  return gql`
    ${CfButtonFragment}
    ${CfImageFragment}

    query ($id: String!, $preview: Boolean!, $locale: String) 
    ${includeTimeline} {
      banner(id: $id, preview: $preview, locale: $locale) {
        internalTitle
        headline
        bodyCopy {
          json
        }
        buttonsCollection(limit: 3) {
          items {
            ...Button
          }
        }
        media {
          ...Image
        }
        mediaAlignment
        theme
        sys {
          id
        }
      }
    }
  `;
};

export const fetchBannerData = async (
  id: string,
  preview = false,
  locale: string = defaultLocale,
  date?: string,
) => {
  const client = preview ? cfPreviewClient : cfClient;
  const timestamp = date || new Date().toISOString();

  const BannerQuery = buildBannerQuery(timestamp);

  try {
    const response = await client.query({
      query: BannerQuery,
      variables: { id, preview, locale },
    });

    return response.data.banner;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
