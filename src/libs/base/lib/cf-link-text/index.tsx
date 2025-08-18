import {
  CfFetchById,
  CfBaseComponent,
  CfLinkProps,
  CfComponentBaseProps,
  CfRenderMode,
} from "@aces/types";

import { CfLinkTextServer } from "./server";
import { CfLinkTextClient } from "./client";
import { CfTextLinkUI } from "./ui";
import { CfLinkTextSkeleton } from "./skeleton";

export type CfLinkTextProps =
  | ({ render?: "server" | "client" } & CfLinkTextWrapperProps)
  | ({ render: "ui" } & CfLinkTextUIProps)
  | { render: "skeleton" };

export interface CfLinkTextWrapperProps extends CfFetchById {
  alignment?: string;
}

export interface CfLinkTextUIProps extends CfBaseComponent {
  link: CfLinkProps;
  title: string;
  externalLinkIcon: boolean;
  alignment?: string;
}

export const CfLinkText = ({
  render = "server",
  ...props
}: CfLinkTextProps & { render?: CfRenderMode }) => {
  switch (render) {
    case "server":
      return <CfLinkTextServer {...(props as CfLinkTextWrapperProps)} />;
    case "client":
      return <CfLinkTextClient {...(props as CfLinkTextWrapperProps)} />;
    case "ui":
      return <CfTextLinkUI {...(props as CfLinkTextUIProps)} />;
    case "skeleton":
      return <CfLinkTextSkeleton />;
    default:
      throw new Error(`Unsupported render mode: ${render}`);
  }
};
