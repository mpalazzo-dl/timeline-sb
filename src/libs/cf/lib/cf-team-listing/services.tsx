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

export const buildTeamListingQuery = (timestamp?: string) => {
  const now = new Date();
  const includeTimeline =
    timestamp && new Date(timestamp) > now
      ? `@timeline(where: { timestamp_lte: "${timestamp}" })`
      : "";

  return gql`
    ${TeamMemberFragment}

    query ($id: String!, $preview: Boolean!, $locale: String) 
    ${includeTimeline}{
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
};

export const fetchTeamListingData = async (
  id: string,
  preview = false,
  locale: string = defaultLocale,
  date?: string,
) => {
  const client = preview ? cfPreviewClient : cfClient;
  const timestamp = date || new Date().toISOString();

  const TeamListingQuery = buildTeamListingQuery(timestamp);

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
