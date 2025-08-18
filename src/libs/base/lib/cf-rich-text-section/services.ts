import gql from "graphql-tag";

import { cfClient, cfPreviewClient } from "@aces/contentful";
import { defaultLocale } from "@aces/i18n";
import { RichTextSectionFragment } from "@aces/fragments";

export const RichTextSectionQuery = gql`
  ${RichTextSectionFragment}

  query ($id: String!, $preview: Boolean!, $locale: String) {
    richTextSection(id: $id, preview: $preview, locale: $locale) {
      ...RichTextSection
    }
  }
`;

export const fetchRichTextSectionData = async (
  id: string,
  preview = false,
  locale: string = defaultLocale,
) => {
  const client = preview ? cfPreviewClient : cfClient;
  try {
    const response = await client.query({
      query: RichTextSectionQuery,
      variables: { id, preview, locale },
    });

    return response.data.richTextSection;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
