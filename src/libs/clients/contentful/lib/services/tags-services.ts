import { defaultLocale } from "@aces/i18n";

import { cfClient, cfPreviewClient } from "../client";
import { AllCategoriesQuery } from "../queries/tags-queries";

export const fetchAllCategories = async (
  excludedSlugs = [],
  preview = false,
  locale = defaultLocale,
) => {
  const client = preview ? cfPreviewClient : cfClient;
  try {
    const response = await client.query({
      query: AllCategoriesQuery,
      variables: { preview, locale },
    });

    response.data.categoriesCollection.items.forEach((category: any) => {
      const articleCollection = category.linkedFrom.articleCollection;
      const articles = articleCollection.items;

      const matchingExcluded = articles.filter((article: { slug: never }) =>
        excludedSlugs.includes(article.slug),
      );

      articleCollection.total =
        articleCollection.total - matchingExcluded.length;
    });

    return response.data.categoriesCollection;
  } catch (error) {
    console.error("Error fetching page data:", error);
    throw error;
  }
};
