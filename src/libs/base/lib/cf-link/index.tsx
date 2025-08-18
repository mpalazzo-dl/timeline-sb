import {
  CfComponentBaseProps,
  CfFetchById,
  CfLinkTarget,
  CfLinkTypes,
  CfRenderMode,
  PageLinkProps,
} from "@aces/types";

import { CfLinkServer } from "./server";
import { CfLinkClient } from "./client";
import { CfLinkUI } from "./ui";
import { CfLinkSkeleton } from "./skeleton";

export type CfLinkProps =
  | ({ render?: "server" | "client" } & CfComponentBaseProps)
  | ({ render: "ui" } & BaseLinkUIProps)
  | { render: "skeleton" };

export interface CfLinkWrapperProps extends CfFetchById {
  children?: React.ReactNode;
}
export interface BaseLinkUIProps {
  children: React.ReactNode;
  linkType: CfLinkTypes;
  pageLink?: PageLinkProps;
  customLink?: string;
  target: CfLinkTarget;
  className?: string;
  style?: React.CSSProperties;
  lang?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const CfLink = ({
  render = "server",
  ...props
}: CfLinkProps & { render?: CfRenderMode }) => {
  switch (render) {
    case "server":
      return <CfLinkServer {...(props as CfLinkWrapperProps)} />;
    case "client":
      return <CfLinkClient {...(props as CfLinkWrapperProps)} />;
    case "ui":
      return <CfLinkUI {...(props as BaseLinkUIProps)} />;
    case "skeleton":
      return <CfLinkSkeleton />;
    default:
      throw new Error(`Unsupported render mode: ${render}`);
  }
};
