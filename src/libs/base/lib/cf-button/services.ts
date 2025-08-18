import gql from "graphql-tag";

import { defaultLocale } from "@aces/i18n";
import { cfClient, cfPreviewClient } from "@aces/contentful";
import { CfButtonFragment } from "@aces/fragments";

export const ButtonQuery = gql`
  ${CfButtonFragment}

  query ($id: String!, $preview: Boolean!, $locale: String) {
    button(id: $id, preview: $preview, locale: $locale) {
      ...Button
    }
  }
`;

export const fetchButton = async (
  id: string,
  preview = false,
  locale: string = defaultLocale,
) => {
  const client = preview ? cfPreviewClient : cfClient;
  try {
    const response = await client.query({
      query: ButtonQuery,
      variables: { id, preview, locale },
    });

    return response.data.button;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
