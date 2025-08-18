import gql from "graphql-tag";

import { defaultLocale } from "@aces/i18n";
import { cfClient, cfPreviewClient } from "@aces/contentful";

import { CfImageFragment } from "@aces/fragments";

export const TeamMemberFragment = gql`
  ${CfImageFragment}

  fragment TeamMember on TeamMember {
    name
    role
    description
    bio {
      json
    }
    profileImage {
      ...Image
    }
    sys {
      id
    }
  }
`;

export const TeamListingQuery = gql`
  ${TeamMemberFragment}

  query ($id: String!, $preview: Boolean!, $locale: String) {
    teamListing(id: $id, preview: $preview, locale: $locale) {
      internalTitle
      headline
      teamMembersCollection {
        items {
          ...TeamMember
        }
      }
      sys {
        id
      }
    }
  }
`;

export const fetchTeamListingData = async (
  id: string,
  preview = false,
  locale: string = defaultLocale,
) => {
  const client = preview ? cfPreviewClient : cfClient;
  try {
    const response = await client.query({
      query: TeamListingQuery,
      variables: { id, preview, locale },
    });

    return response.data.teamListing;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
