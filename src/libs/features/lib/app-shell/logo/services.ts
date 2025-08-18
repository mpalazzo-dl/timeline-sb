import gql from "graphql-tag";

import { cfClient, cfPreviewClient } from "@aces/contentful";
import { CfImageFragment } from "@aces/fragments";

export const LogoFragment = gql`
  ${CfImageFragment}

  fragment Logo on Apps {
    fullColorLogo {
      ...Image
    }
    knockoutLogo {
      ...Image
    }
  }
`;

export const LogoQuery = gql`
  ${LogoFragment}

  query ($id: String!, $preview: Boolean!, $lang: String!) {
    appsCollection(
      where: { appId: $id }
      limit: 1
      preview: $preview
      locale: $lang
    ) {
      items {
        ...Logo
      }
    }
  }
`;

export const fetchLogoData = async (
  id: string,
  preview: boolean,
  lang: string,
) => {
  const client = preview ? cfPreviewClient : cfClient;

  try {
    const response = await client.query({
      query: LogoQuery,
      variables: { id, preview, lang },
    });

    return {
      fullColorLogo: response.data.appsCollection.items[0].fullColorLogo,
      knockoutLogo: response.data.appsCollection.items[0].knockoutLogo,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
