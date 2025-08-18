import gql from "graphql-tag";

import { defaultLocale, Locale } from "@aces/i18n";

import { cfClient, cfPreviewClient } from "@aces/contentful";

import { MetadataFragment, PageBodyQuery } from "@aces/features";

export const PageQuery = gql`
  ${MetadataFragment}

  query ($slug: String!, $preview: Boolean!, $locale: String) {
    pageCollection(
      where: { slug: $slug }
      limit: 1
      preview: $preview
      locale: $locale
    ) {
      items {
        title
        slug
        specialtyPage
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

export const fetchPageSysData = async (
  slug: string,
  preview = false,
  locale: Locale = defaultLocale,
) => {
  const client = preview ? cfPreviewClient : cfClient;

  try {
    const pageResponse = await client.query({
      query: PageQuery,
      variables: { slug, preview, locale },
    });

    return pageResponse;
  } catch (error) {
    console.error("Error fetching page data:", error);
    throw error;
  }
};

export const fetchPageData = async (
  slug: string,
  preview = false,
  locale: Locale = defaultLocale,
) => {
  const client = preview ? cfPreviewClient : cfClient;

  try {
    const pageResponse = await client.query({
      query: PageQuery,
      variables: { slug, preview, locale },
    });

    if (!pageResponse.data.pageCollection.items.length) {
      return {
        pageResponse: { data: { pageCollection: { items: [] } } },
        pageHeroResponse: { data: null },
        pageBodyResponse: {
          data: { page: { pageBodyCollection: { items: [] } } },
        },
      };
    }

    const id = pageResponse.data.pageCollection.items[0].sys.id;

    const pageBodyResponse = await client.query({
      query: PageBodyQuery,
      variables: { id, preview, locale },
    });

    return { pageResponse, pageBodyResponse };
  } catch (error) {
    console.error("Error fetching page data:", error);
    throw error;
  }
};

export const SpecialtyPageQuery = gql`
  ${MetadataFragment}

  query ($specialtyPage: String!, $preview: Boolean!, $locale: String) {
    pageCollection(
      where: { specialtyPage: $specialtyPage }
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

export const fetchSpecialtyPageData = async (
  specialtyPage: string,
  preview = false,
  locale: Locale = defaultLocale,
) => {
  const client = preview ? cfPreviewClient : cfClient;
  try {
    const pageResponse = await client.query({
      query: SpecialtyPageQuery,
      variables: { specialtyPage, preview, locale },
    });

    if (!pageResponse.data.pageCollection.items.length) {
      return {
        pageResponse: { data: { pageCollection: { items: [] } } },
        pageHeroResponse: { data: null },
        pageBodyResponse: {
          data: { page: { pageBodyCollection: { items: [] } } },
        },
      };
    }

    const id = pageResponse.data.pageCollection.items[0].sys.id;

    const pageBodyResponse = await client.query({
      query: PageBodyQuery,
      variables: { id, preview, locale },
    });

    return { pageResponse, pageBodyResponse };
  } catch (error) {
    console.error("Error fetching page data:", error);
    throw error;
  }
};
