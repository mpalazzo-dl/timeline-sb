import gql from "graphql-tag";

import { cfClient, cfPreviewClient } from "@aces/contentful";
import { defaultLocale } from "@aces/i18n";
import { RichTextSectionFragment } from "@aces/fragments";

export const buildRichTextSectionQuery = (timestamp?: string) => {
  const now = new Date();
  const includeTimeline =
    timestamp && new Date(timestamp) > now
      ? `@timeline(where: { timestamp_lte: "${timestamp}" })`
      : "";

  return gql`
    ${RichTextSectionFragment}

    query ($id: String!, $preview: Boolean!, $locale: String) 
    ${includeTimeline} {
      richTextSection(id: $id, preview: $preview, locale: $locale) {
        ...RichTextSection
      }
    }
  `;
};

export const fetchRichTextSectionData = async (
  id: string,
  preview = false,
  locale: string = defaultLocale,
  date?: string,
) => {
  const client = preview ? cfPreviewClient : cfClient;
  const timestamp = date || new Date().toISOString();

  const RichTextSectionQuery = buildRichTextSectionQuery(timestamp);

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
