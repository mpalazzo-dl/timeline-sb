import gql from "graphql-tag";

import { defaultLocale } from "@aces/i18n";
import { cfClient, cfPreviewClient } from "@aces/contentful";
import { CfButtonFragment, CfImageFragment } from "@aces/fragments";

export const buildHeroBannerQuery = (timestamp?: string) => {
  const now = new Date();
  const includeTimeline =
    timestamp && new Date(timestamp) > now
      ? `@timeline(where: { timestamp_lte: "${timestamp}" })`
      : "";

  return gql`
    ${CfImageFragment}
    ${CfButtonFragment}

    query ($id: String!, $preview: Boolean!, $locale: String)
    ${includeTimeline} {
      heroBanner(id: $id, preview: $preview, locale: $locale) {
        internalTitle
        headline
        subhead
        buttonsCollection(limit: 2) {
          items {
            ...Button
          }
        }
        image {
          ...Image
        }
        fullOverlay
        slim
        sys {
          id
        }
      }
    }
  `;
};

export const fetchHeroBanner = async (
  id: string,
  preview = false,
  locale: string = defaultLocale,
  date?: string,
) => {
  const client = preview ? cfPreviewClient : cfClient;
  const timestamp = date || new Date().toISOString();

  const HeroBannerQuery = buildHeroBannerQuery(timestamp);

  try {
    const response = await client.query({
      query: HeroBannerQuery,
      variables: { id, preview, locale },
    });

    console.log(response.data.heroBanner);

    return response.data.heroBanner;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
