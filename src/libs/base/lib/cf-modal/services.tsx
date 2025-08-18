import gql from "graphql-tag";

import { defaultLocale } from "@aces/i18n";
import {
  cfClient,
  cfPreviewClient,
  PardotFormFragment,
} from "@aces/contentful";
import { RichTextSectionFragment } from "@aces/fragments";

export const ModalQuery = gql`
  ${PardotFormFragment}
  ${RichTextSectionFragment}

  query ($id: String!, $preview: Boolean!, $locale: String) {
    modal(id: $id, preview: $preview, locale: $locale) {
      internalTitle
      modalHeader
      modalBodyCollection {
        items {
          ...PardotForm
          ...RichTextSection
        }
      }
      sys {
        id
      }
    }
  }
`;

export const fetchModalData = async (
  id: string,
  preview = false,
  locale: string = defaultLocale,
) => {
  const client = preview ? cfPreviewClient : cfClient;
  try {
    const response = await client.query({
      query: ModalQuery,
      variables: { id, preview, locale },
    });
    console.log("Response from Contentful:", response);
    return response.data.modal;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
