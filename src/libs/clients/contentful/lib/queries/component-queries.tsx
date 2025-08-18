import gql from "graphql-tag";

export const EntryQuery = gql`
  query ($id: String!, $preview: Boolean!, $locale: String!) {
    entryCollection(
      where: { sys: { id: $id } }
      limit: 1
      preview: $preview
      locale: $locale
    ) {
      items {
        sys {
          id
        }
      }
    }
  }
`;

export const ModalIdFragment = gql`
  fragment Modal on Modal {
    internalTitle
    sys {
      id
    }
  }
`;

export const PardotFormFragment = gql`
  fragment PardotForm on PardotForm {
    internalTitle
    pardotFormIframe
    sys {
      id
    }
  }
`;

export const HubSpotFormFragment = gql`
  fragment HubSpotForm on HubSpotForm {
    internalTitle
    hsPortalId
    hsFormId
    sys {
      id
    }
  }
`;
