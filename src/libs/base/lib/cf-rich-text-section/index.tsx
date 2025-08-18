import {
  CfFetchById,
  CfAlignment,
  CfBaseComponent,
  CfBorderSelector,
  CfComponentSpacing,
  CfContainerWidth,
  CfRichText,
  Nested,
  SmallPadding,
  CfRenderMode,
} from "@aces/types";

import { CfRichTextSectionServer } from "./server";
import { CfRichTextSectionClient } from "./client";
import { CfRichTextSectionUI } from "./ui";
import { CfRichTextSectionSkeleton } from "./skeleton";

export type CfRichTextSectionProps =
  | ({ render?: "server" | "client" } & CfRichTextSectionWrapperProps)
  | ({ render: "ui" } & CfRichTextSectionUIProps)
  | { render: "skeleton" };

export interface CfRichTextSectionWrapperProps
  extends CfFetchById,
    Nested,
    SmallPadding {}

export interface CfRichTextSectionUIProps
  extends CfBaseComponent,
    Nested,
    SmallPadding {
  alignment: CfAlignment;
  containerWidth: CfContainerWidth;
  cfComponentSpacing?: CfComponentSpacing;
  backgroundColor: "None" | "Gray" | "Primary Gradient" | null;
  bodyCopy: CfRichText;
  border: CfBorderSelector;
}

export const CfRichTextSection = ({
  render = "server",
  ...props
}: CfRichTextSectionProps & { render?: CfRenderMode }) => {
  switch (render) {
    case "server":
      return (
        <CfRichTextSectionServer
          {...(props as CfRichTextSectionWrapperProps)}
        />
      );
    case "client":
      return (
        <CfRichTextSectionClient
          {...(props as CfRichTextSectionWrapperProps)}
        />
      );
    case "ui":
      return <CfRichTextSectionUI {...(props as CfRichTextSectionUIProps)} />;
    case "skeleton":
      return <CfRichTextSectionSkeleton />;
    default:
      throw new Error(`Unsupported render mode: ${render}`);
  }
};
