import gql from "graphql-tag";

import { defaultLocale } from "@aces/i18n";
import { cfClient, cfPreviewClient } from "@aces/contentful";
import { CfButtonFragment, CfImageFragment } from "@aces/fragments";

export const buildCalloutQuery = (timestamp?: string) => {
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
      callout(id: $id, preview: $preview, locale: $locale) {
        internalTitle
        headline
        bodyCopy {
          json
        }
        tags
        buttonsCollection {
          items {
            ...Button
          }
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

export const fetchCalloutData = async (
  id: string,
  preview = false,
  locale: string = defaultLocale,
  date?: string,
) => {
  const client = preview ? cfPreviewClient : cfClient;
  const timestamp = date || new Date().toISOString();

  const CalloutQuery = buildCalloutQuery(timestamp);
  try {
    const response = await client.query({
      query: CalloutQuery,
      variables: { id, preview, locale },
    });

    return response.data.callout;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
