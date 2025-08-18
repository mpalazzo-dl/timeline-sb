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

export const ButtonListQuery = gql`
  ${CfButtonFragment}

  query ($id: String!, $preview: Boolean!, $locale: String) {
    buttonList(id: $id, preview: $preview, locale: $locale) {
      ...ButtonList
    }
  }
`;

export const fetchButtonListData = async (
  id: string,
  preview = false,
  locale: string = defaultLocale,
) => {
  const client = preview ? cfPreviewClient : cfClient;
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
