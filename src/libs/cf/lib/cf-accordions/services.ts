import gql from "graphql-tag";

import { defaultLocale } from "@aces/i18n";
import { cfClient, cfPreviewClient } from "@aces/contentful";
import { CfImageFragment } from "@aces/fragments";

export const AccordionsQuery = gql`
  ${CfImageFragment}

  query ($id: String!, $preview: Boolean!, $locale: String) {
    accordions(id: $id, preview: $preview, locale: $locale) {
      internalTitle
      hideOnDesktop
      defaultOpen
      accordionsCollection {
        items {
          internalTitle
          icon {
            ...Image
          }
          headline
          bodyCopy {
            json
          }
          sys {
            id
          }
        }
      }
      sys {
        id
      }
    }
  }
`;

export const buildAccordionsQuery = (timestamp?: string) => {
  const now = new Date();
  const includeTimeline =
    timestamp && new Date(timestamp) > now
      ? `@timeline(where: { timestamp_lte: "${timestamp}" })`
      : "";

  return gql`
  ${CfImageFragment}

  query ($id: String!, $preview: Boolean!, $locale: String) ${includeTimeline} {
    accordions(id: $id, preview: $preview, locale: $locale) {
      internalTitle
      hideOnDesktop
      defaultOpen
      accordionsCollection {
        items {
          internalTitle
          icon {
            ...Image
          }
          headline
          bodyCopy {
            json
          }
          sys {
            id
          }
        }
      }
      sys {
        id
      }
    }
  }
  `;
};

export const fetchAccordionsData = async (
  id: string,
  preview = false,
  locale: string = defaultLocale,
  date?: string,
) => {
  const client = preview ? cfPreviewClient : cfClient;
  const timestamp = date || new Date().toISOString();

  const AccordionsQuery = buildAccordionsQuery(timestamp);

  try {
    const response = await client.query({
      query: AccordionsQuery,
      variables: { id, preview, locale },
    });

    return response.data.accordions;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
