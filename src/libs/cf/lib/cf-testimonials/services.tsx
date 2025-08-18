import gql from "graphql-tag";

import { defaultLocale } from "@aces/i18n";
import { cfClient, cfPreviewClient } from "@aces/contentful";

import { CfImageFragment } from "@aces/fragments";

export const TestimonialFragment = gql`
  ${CfImageFragment}

  fragment Testimonial on Testimonial {
    name
    role
    description {
      json
    }
    profileImage {
      ...Image
    }
  }
`;

export const TestimonialsQuery = gql`
  ${TestimonialFragment}

  query ($id: String!, $preview: Boolean!, $locale: String) {
    testimonials(id: $id, preview: $preview, locale: $locale) {
      internalTitle
      headline
      testimonialsCollection {
        items {
          ...Testimonial
        }
      }
      sys {
        id
      }
    }
  }
`;

export const fetchTestimonialsData = async (
  id: string,
  preview = false,
  locale: string = defaultLocale,
) => {
  const client = preview ? cfPreviewClient : cfClient;
  try {
    const response = await client.query({
      query: TestimonialsQuery,
      variables: { id, preview, locale },
    });

    return response.data.testimonials;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
