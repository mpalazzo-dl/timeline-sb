import gql from "graphql-tag";

import { defaultLocale } from "@aces/i18n";
import { cfClient, cfPreviewClient } from "@aces/contentful";
import { CfButtonFragment, CfImageFragment } from "@aces/fragments";

export const BannerQuery = gql`
  ${CfButtonFragment}
  ${CfImageFragment}

  query ($id: String!, $preview: Boolean!, $locale: String) {
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

export const fetchBannerData = async (
  id: string,
  preview = false,
  locale: string = defaultLocale,
) => {
  const client = preview ? cfPreviewClient : cfClient;
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
