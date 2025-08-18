import gql from "graphql-tag";

import { defaultLocale } from "@aces/i18n";
import {
  cfClient,
  cfPreviewClient,
  HubSpotFormFragment,
  PardotFormFragment,
} from "@aces/contentful";

import { CfImageFragment } from "@aces/fragments";

export const FormQuery = gql`
  ${CfImageFragment}
  ${PardotFormFragment}
  ${HubSpotFormFragment}

  query ($id: String!, $preview: Boolean!, $locale: String) {
    form(id: $id, preview: $preview, locale: $locale) {
      internalTitle
      form {
        ...PardotForm
        ...HubSpotForm
      }
      headline
      subhead
      media {
        ...Image
      }
      sys {
        id
      }
    }
  }
`;

export const fetchFormData = async (
  id: string,
  preview = false,
  locale: string = defaultLocale,
) => {
  const client = preview ? cfPreviewClient : cfClient;
  try {
    const response = await client.query({
      query: FormQuery,
      variables: { id, preview, locale },
    });

    return response.data.form;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
