import gql from "graphql-tag";

export const LandingPageBodyQuery = gql`
  query ($id: String!, $preview: Boolean!, $locale: String) {
    landingPage(id: $id, preview: $preview, locale: $locale) {
      pageBodyCollection {
        items {
          ... on Accordions {
            sys {
              id
            }
          }
          ... on Banner {
            sys {
              id
            }
          }
          ... on CodeEmbed {
            sys {
              id
            }
          }
          ... on Form {
            sys {
              id
            }
          }
          ... on Header {
            sys {
              id
            }
          }
          ... on HeroBanner {
            sys {
              id
            }
          }
          ... on Image {
            sys {
              id
            }
          }
          ... on Grid {
            sys {
              id
            }
          }
          ... on Lockup {
            sys {
              id
            }
          }
          ... on RichTextSection {
            sys {
              id
            }
          }
          ... on VideoEmbed {
            sys {
              id
            }
          }
          ... on Testimonials {
            sys {
              id
            }
          }
          ... on TeamListing {
            sys {
              id
            }
          }
          ... on Callout {
            sys {
              id
            }
          }
          ... on FeatureHighlight {
            sys {
              id
            }
          }
          ... on ListItem {
            sys {
              id
            }
          }
        }
      }
    }
  }
`;
