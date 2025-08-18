import gql from "graphql-tag";

import { defaultLocale } from "@aces/i18n";
import { cfClient, cfPreviewClient } from "@aces/contentful";
import { CfButtonFragment, CfImageFragment } from "@aces/fragments";

export const CalloutQuery = gql`
  ${CfButtonFragment}
  ${CfImageFragment}

  query ($id: String!, $preview: Boolean!, $locale: String) {
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

export const fetchCalloutData = async (
  id: string,
  preview = false,
  locale: string = defaultLocale,
) => {
  const client = preview ? cfPreviewClient : cfClient;
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
