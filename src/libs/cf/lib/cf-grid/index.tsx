import {
  CfBaseComponent,
  CfComponentBaseNestedProps,
  CfFetchById,
  CfGridItemsStyleTypes,
  CfImageProps,
  CfRenderMode,
  CfVerticalAlignment,
  Nested,
} from "@aces/types";

import { CfRichTextSectionUIProps } from "@aces/base";

import { CfGridServer } from "./server";
import { CfGridClient } from "./client";
import { CfGridUI } from "./ui";
import { CfGridSkeleton } from "./skeleton";

export type CfGridProps =
  | ({ render?: "server" | "client" } & CfComponentBaseNestedProps)
  | ({ render: "ui" } & CfGridUIProps)
  | { render: "skeleton" };

export interface CfGridUIProps extends CfBaseComponent, Nested {
  showDividers: boolean;
  gridColumnCount: number;
  gridItemsStyle: CfGridItemsStyleTypes;
  verticalAlignment: CfVerticalAlignment;
  listItems: (CfImageProps | CfRichTextSectionUIProps)[];
}

export const CfGrid = ({
  render = "server",
  ...props
}: CfGridProps & { render?: CfRenderMode }) => {
  switch (render) {
    case "server":
      return <CfGridServer {...(props as CfFetchById)} />;
    case "client":
      return <CfGridClient {...(props as CfFetchById)} />;
    case "ui":
      return <CfGridUI {...(props as CfGridUIProps)} />;
    case "skeleton":
      return <CfGridSkeleton />;
    default:
      throw new Error(`Unsupported render mode: ${render}`);
  }
};
