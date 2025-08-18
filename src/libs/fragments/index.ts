import gql from "graphql-tag";

import { ModalIdFragment } from "@aces/contentful";
import { LinkFragment } from "@aces/routing";

export const CfButtonFragment = gql`
  ${ModalIdFragment}
  ${LinkFragment}

  fragment Button on Button {
    internalTitle
    title
    link {
      ...Modal
      ...Link
    }
    buttonStyle
    rightIcon
    sys {
      id
    }
  }
`;

export const CfLinkFragment = gql`
  ${LinkFragment}

  fragment CfLink on Link {
    ...Link
  }
`;

export const CfImageFragment = gql`
  fragment Image on Image {
    internalTitle
    image {
      url
      width
      height
    }
    mobileImage {
      url
      width
      height
    }
    altText
    nativeImageSize
    sys {
      id
    }
  }
`;

export const RichTextSectionFragment = gql`
  fragment RichTextSection on RichTextSection {
    internalTitle
    alignment
    containerWidth
    componentSpacing
    backgroundColor
    bodyCopy {
      json
    }
    border
    sys {
      id
    }
  }
`;
