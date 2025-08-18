import gql from "graphql-tag";

import { defaultLocale, Locale } from "@aces/i18n";
import { cfClient, cfPreviewClient } from "@aces/contentful";

import { OrderTypes, ArticleListingConfig } from "../config";
import { ArticleCardFragment } from "../article-card/services";

const ArticlesQuery = gql`
  ${ArticleCardFragment}

  query (
    $categories: [String!]
    $limit: Int!
    $offset: Int!
    $order: [ArticleOrder]!
    $excludeSlug: [String!] = []
    $preview: Boolean!
    $locale: String!
  ) {
    articleCollection(
      where: {
        AND: [
          { categories: { slug_in: $categories } }
          { slug_not_in: $excludeSlug }
        ]
      }
      limit: $limit
      skip: $offset
      order: $order
      preview: $preview
      locale: $locale
    ) {
      items {
        ...ArticleCard
      }
      total
    }
  }
`;

export async function fetchArticles(
  categories: string[] | null,
  limit: number,
  offset: number,
  order: OrderTypes = ArticleListingConfig.DefaultOrder,
  excludeSlug: string[] = [],
  preview = false,
  locale: Locale = defaultLocale,
) {
  const client = preview ? cfPreviewClient : cfClient;

  if (Array.isArray(categories) && categories.length === 0) {
    categories = null;
  }

  if (!Object.values(OrderTypes).includes(order)) {
    order = ArticleListingConfig.DefaultOrder;
  }

  try {
    const response = await client.query({
      query: ArticlesQuery,
      variables: {
        categories,
        limit,
        offset,
        order,
        excludeSlug,
        preview,
        locale,
      },
    });

    const { items, total } = response.data.articleCollection;

    return { items, total };
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
}

export async function fetchAllArticlesTotal(
  excludedSlugs = [],
  preview = false,
  locale: Locale = defaultLocale,
) {
  const client = preview ? cfPreviewClient : cfClient;

  try {
    const response = await client.query({
      query: gql`
        query (
          $excludedSlugs: [String]!
          $preview: Boolean!
          $locale: String!
        ) {
          articleCollection(
            where: { slug_not_in: $excludedSlugs }
            preview: $preview
            locale: $locale
          ) {
            total
          }
        }
      `,
      variables: {
        excludedSlugs,
        preview,
        locale,
      },
    });

    const data = response.data.articleCollection.total;

    return data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
}
