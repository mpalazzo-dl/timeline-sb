import gql from "graphql-tag";

import { defaultLocale } from "@aces/i18n";
import { cfClient, cfPreviewClient } from "@aces/contentful";
import { CfButtonFragment, CfImageFragment } from "@aces/fragments";

import { VideoEmbedFragment } from "../cf-video-embed/services";
import { ButtonListFragment } from "../cf-button-list/services";

export const LockupFragement = gql`
  ${CfButtonFragment}
  ${ButtonListFragment}
  ${CfImageFragment}
  ${VideoEmbedFragment}

  fragment Lockup on Lockup {
    internalTitle
    headline
    subhead
    bodyCopy {
      json
    }
    buttonsCollection(limit: 2) {
      items {
        ...Button
        ...ButtonList
      }
    }
    media {
      ...Image
      ...VideoEmbed
    }
    mediaSize
    mediaAlignment
    mediaBleed
    sys {
      id
    }
  }
`;

export const buildLockupQuery = (timestamp?: string) => {
  const now = new Date();
  const includeTimeline =
    timestamp && new Date(timestamp) > now
      ? `@timeline(where: { timestamp_lte: "${timestamp}" })`
      : "";

  return gql`
    ${LockupFragement}

    query ($id: String!, $preview: Boolean!, $locale: String) 
    ${includeTimeline} {
      lockup(id: $id, preview: $preview, locale: $locale) {
        ...Lockup
      }
    }
  `;
};

export const fetchLockup = async (
  id: string,
  preview = false,
  locale: string = defaultLocale,
  date?: string,
) => {
  const client = preview ? cfPreviewClient : cfClient;
  const timestamp = date || new Date().toISOString();

  const LockupQuery = buildLockupQuery(timestamp);

  try {
    const response = await client.query({
      query: LockupQuery,
      variables: { id, preview, locale },
    });
    return response.data.lockup;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
