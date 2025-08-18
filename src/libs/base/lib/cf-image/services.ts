import gql from "graphql-tag";

import { defaultLocale } from "@aces/i18n";
import { cfClient, cfPreviewClient } from "@aces/contentful";
import { CfImageFragment } from "@aces/fragments";

export const ImageQuery = gql`
  ${CfImageFragment}

  query ($id: String!, $preview: Boolean!, $locale: String) {
    image(id: $id, preview: $preview, locale: $locale) {
      ...Image
    }
  }
`;

export const fetchImageData = async (
  id: string,
  preview = false,
  locale: string = defaultLocale,
) => {
  const client = preview ? cfPreviewClient : cfClient;
  try {
    const response = await client.query({
      query: ImageQuery,
      variables: { id, preview, locale },
    });

    return response.data.image;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
