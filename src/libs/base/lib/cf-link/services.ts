import gql from "graphql-tag";

import { defaultLocale } from "@aces/i18n";
import { cfClient } from "@aces/contentful";
import { CfLinkFragment } from "@aces/fragments";

export const LinkQuery = gql`
  ${CfLinkFragment}

  query ($id: String!, $preview: Boolean!, $locale: String) {
    link(id: $id, preview: $preview, locale: $locale) {
      ...CfLink
    }
  }
`;

export const fetchLinkData = async (
  id: string,
  preview = false,
  locale: string = defaultLocale,
) => {
  try {
    const response = await cfClient.query({
      query: LinkQuery,
      variables: { id, preview, locale },
    });

    return response.data.link;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
