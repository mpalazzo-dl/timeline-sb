import gql from "graphql-tag";

import { defaultLocale } from "@aces/i18n";
import { CfImageFragment } from "@aces/fragments";
import { TeamMemberFragment } from "@aces/cf";
import {
  CategoriesFragment,
  cfClient,
  cfPreviewClient,
} from "@aces/contentful";
import { MetadataFragment } from "@aces/features";

export const ArticlePageQuery = gql`
  ${CfImageFragment}
  ${TeamMemberFragment}
  ${CategoriesFragment}

  query ($slug: String!, $preview: Boolean!, $locale: String!) {
      ${MetadataFragment}
    
    articleCollection(
      where: { slug: $slug }
      limit: 1
      preview: $preview
      locale: $locale
    ) {
      items {
        title
        slug
        publishDate
        featuredImage {
          sys {
            id
          }
        }
        author {
          ...TeamMember
        }
        categoriesCollection {
          items {
            ...Categories
          }
        }
        bodyCopy {
          json
        }
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

export const fetchArticlePageData = async (
  slug: string,
  preview = false,
  locale: string = defaultLocale,
) => {
  const client = preview ? cfPreviewClient : cfClient;
  try {
    const pageResponse = await client.query({
      query: ArticlePageQuery,
      variables: { slug, preview, locale },
    });

    return pageResponse.data.articleCollection.items[0];
  } catch (error) {
    console.error("Error fetching page data:", error);
    throw error;
  }
};
