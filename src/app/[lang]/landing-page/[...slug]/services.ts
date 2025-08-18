import gql from "graphql-tag";

import { defaultLocale, Locale } from "@aces/i18n";

import { cfClient, cfPreviewClient } from "@aces/contentful";

import { MetadataFragment, LandingPageBodyQuery } from "@aces/features";

export const LandingPageQuery = gql`
  ${MetadataFragment}

  query ($slug: String!, $preview: Boolean!, $locale: String) {
    landingPageCollection(
      where: { slug: $slug }
      limit: 1
      preview: $preview
      locale: $locale
    ) {
      items {
        title
        slug
        seo {
          ...Metadata
        }
        sys {
          id
        }
      }
    }
  }
`;

export const fetchLandingPageSysData = async (
  slug: string,
  preview = false,
  locale: Locale = defaultLocale,
) => {
  const client = preview ? cfPreviewClient : cfClient;

  try {
    const landingPageResponse = await client.query({
      query: LandingPageQuery,
      variables: { slug, preview, locale },
    });

    return landingPageResponse;
  } catch (error) {
    console.error("Error fetching landing page data:", error);
    throw error;
  }
};

export const fetchLandingPageData = async (
  slug: string,
  preview = false,
  locale: Locale = defaultLocale,
) => {
  const client = preview ? cfPreviewClient : cfClient;

  try {
    const landingPageResponse = await client.query({
      query: LandingPageQuery,
      variables: { slug, preview, locale },
    });

    if (!landingPageResponse.data.landingPageCollection.items.length) {
      return {
        landingPageResponse: { data: { landingPageCollection: { items: [] } } },
        landingPageBodyResponse: {
          data: { landingPage: { pageBodyCollection: { items: [] } } },
        },
      };
    }

    const id = landingPageResponse.data.landingPageCollection.items[0].sys.id;

    const landingPageBodyResponse = await client.query({
      query: LandingPageBodyQuery,
      variables: { id, preview, locale },
    });

    return { landingPageResponse, landingPageBodyResponse };
  } catch (error) {
    console.error("Error fetching landing page data:", error);
    throw error;
  }
};
