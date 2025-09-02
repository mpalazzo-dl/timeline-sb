import gql from "graphql-tag";

import { defaultLocale } from "@aces/i18n";
import { cfClient, cfPreviewClient } from "@aces/contentful";

import { CfButtonFragment } from "@aces/fragments";

export const ButtonListFragment = gql`
  ${CfButtonFragment}

  fragment ButtonList on ButtonList {
    internalTitle
    buttonStyle
    buttonsCollection {
      items {
        ...Button
      }
    }
    sys {
      id
    }
  }
`;

export const buildButtonListQuery = (timestamp?: string) => {
  const now = new Date();
  const includeTimeline =
    timestamp && new Date(timestamp) > now
      ? `@timeline(where: { timestamp_lte: "${timestamp}" })`
      : "";

  return gql`
     ${CfButtonFragment}

    query ($id: String!, $preview: Boolean!, $locale: String)
    ${includeTimeline} {
      buttonList(id: $id, preview: $preview, locale: $locale) {
        ...ButtonList
      }
    }
  `;
};

export const fetchButtonListData = async (
  id: string,
  preview = false,
  locale: string = defaultLocale,
  date?: string,
) => {
  const client = preview ? cfPreviewClient : cfClient;
  const timestamp = date || new Date().toISOString();

  const ButtonListQuery = buildButtonListQuery(timestamp);
  try {
    const response = await client.query({
      query: ButtonListQuery,
      variables: { id, preview, locale },
    });

    return response.data.buttonList;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
