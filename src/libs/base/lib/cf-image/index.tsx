import { CSSProperties } from "react";

import {
  CfComponentBaseProps,
  CfFetchById,
  CfImageProps as CfImagePropsGlobal,
  CfRenderMode,
  Nested,
  ResponsiveSpacing,
} from "@aces/types";

import { CfImageServer, CfImageCoverServer, CfImageFillServer } from "./server";
import { CfImageClient, CfImageCoverClient, CfImageFillClient } from "./client";
import { CfImageUI, CfImageCoverUI, CfImageFillUI } from "./ui";
import { CfImageSkeleton } from "./skeleton";

export type CfImageProps =
  | ({ render?: "server" | "client" } & CfComponentBaseProps)
  | (
      | ({ render: "ui" } & CfImagePropsGlobal)
      | CfImageCoverUIProps
      | CfImageFillUIProps
    )
  | { render: "skeleton" };

export interface CfImageWrapperProps extends CfFetchById, Nested {
  responsive?: boolean;
  style?: CSSProperties;
}

export interface CfImageCoverWrapperProps extends CfFetchById, Nested {
  coverWidth: ResponsiveSpacing;
  coverHeight: ResponsiveSpacing;
  borderRadius?: ResponsiveSpacing;
  style?: CSSProperties;
}

export interface CfImageCoverUIProps extends CfImagePropsGlobal {
  coverWidth?: ResponsiveSpacing;
  coverHeight?: ResponsiveSpacing;
  objectFit?: "cover" | "contain";
  borderRadius?: ResponsiveSpacing;
}

export interface CfImageFillWrapperProps extends CfFetchById, Nested {
  containerMaxWidth?: ResponsiveSpacing;
  containerHeight?: ResponsiveSpacing;
  containerMinHeight?: ResponsiveSpacing;
  containerMaxHeight?: ResponsiveSpacing;
  borderRadius?: ResponsiveSpacing;
  style?: CSSProperties;
}

export interface CfImageFillUIProps extends CfImagePropsGlobal {
  containerMaxWidth?: ResponsiveSpacing;
  containerHeight?: ResponsiveSpacing;
  containerMinHeight?: ResponsiveSpacing;
  containerMaxHeight?: ResponsiveSpacing;
  borderRadius?: ResponsiveSpacing;
}

export const CfImage = ({
  render = "server",
  ...props
}: CfImageProps & { render?: CfRenderMode }) => {
  switch (render) {
    case "server":
      return <CfImageServer {...(props as CfImageWrapperProps)} />;
    case "client":
      return <CfImageClient {...(props as CfImageWrapperProps)} />;
    case "ui":
      return <CfImageUI {...(props as CfImagePropsGlobal)} />;
    case "skeleton":
      return <CfImageSkeleton />;
    default:
      throw new Error(`Unsupported render mode: ${render}`);
  }
};

export const CfImageCover = ({
  render = "server",
  ...props
}: CfImageProps & { render?: CfRenderMode }) => {
  switch (render) {
    case "server":
      return <CfImageCoverServer {...(props as CfImageCoverWrapperProps)} />;
    case "client":
      return <CfImageCoverClient {...(props as CfImageCoverWrapperProps)} />;
    case "ui":
      return <CfImageCoverUI {...(props as CfImagePropsGlobal)} />;
    case "skeleton":
      return <CfImageSkeleton />;
    default:
      throw new Error(`Unsupported render mode: ${render}`);
  }
};

export const CfImageFill = ({
  render = "server",
  ...props
}: CfImageProps & { render?: CfRenderMode }) => {
  switch (render) {
    case "server":
      return <CfImageFillServer {...(props as CfImageFillWrapperProps)} />;
    case "client":
      return <CfImageFillClient {...(props as CfImageFillWrapperProps)} />;
    case "ui":
      return <CfImageFillUI {...(props as CfImagePropsGlobal)} />;
    case "skeleton":
      return <CfImageSkeleton />;
    default:
      throw new Error(`Unsupported render mode: ${render}`);
  }
};
