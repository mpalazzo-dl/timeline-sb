import {
  CfBaseComponent,
  CfComponentBaseProps,
  CfFetchById,
  CfImageProps,
  CfRenderMode,
  CfRichText,
} from "@aces/types";

import { CfListItemServer } from "./server";
import { CfListItemClient } from "./client";
import { CfListItemUI } from "./ui";
import { CfListItemSkeleton } from "./skeleton";

export type CfListItemProps =
  | ({ render?: "server" | "client" } & CfComponentBaseProps)
  | ({ render: "ui" } & CfListItemUIProps)
  | { render: "skeleton" };

export interface CfListItemWrapperProps extends CfFetchById {}

export interface CfListItemUIProps extends CfBaseComponent {
  headline: string;
  bodyCopy: CfRichText;
  listCopy?: CfRichText;
  columns: string;
  media: CfImageProps;
}

export const CfListItem = ({
  render = "server",
  ...props
}: CfListItemProps & { render?: CfRenderMode }) => {
  switch (render) {
    case "server":
      return <CfListItemServer {...(props as CfListItemWrapperProps)} />;
    case "client":
      return <CfListItemClient {...(props as CfListItemWrapperProps)} />;
    case "ui":
      return <CfListItemUI {...(props as CfListItemUIProps)} />;
    case "skeleton":
      return <CfListItemSkeleton />;
    default:
      throw new Error(`Unsupported render mode: ${render}`);
  }
};
