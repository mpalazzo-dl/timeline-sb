import {
  CfAlignment,
  CfBaseComponent,
  CfContainerWidth,
  CfFetchById,
  CfHeaderType,
  CfRenderMode,
  Nested,
} from "@aces/types";

import { CfHeaderServer } from "./server";
import { CfHeaderClient } from "./client";
import { CfHeaderUI } from "./ui";
import { CfHeaderSkeleton } from "./skeleton";

export interface CfHeaderWrapperProps extends CfFetchById, Nested {
  alignment?: CfAlignment;
}

export type CfHeaderProps =
  | ({ render?: "server" | "client" } & CfHeaderWrapperProps)
  | ({ render: "ui" } & CfHeaderUIProps)
  | { render: "skeleton" };

export interface CfHeaderUIProps extends CfBaseComponent, Nested {
  headline: string;
  headerType?: CfHeaderType;
  alignment?: CfAlignment;
  containerWidth?: CfContainerWidth;
  marginBottom?: {
    xs?: string | number;
    sm?: string | number;
    md?: string | number;
    lg?: string | number;
    xl?: string | number;
  };
}

export const CfHeader = ({
  render = "server",
  ...props
}: CfHeaderProps & { render?: CfRenderMode }) => {
  switch (render) {
    case "server":
      return <CfHeaderServer {...(props as CfFetchById)} />;
    case "client":
      return <CfHeaderClient {...(props as CfFetchById)} />;
    case "ui":
      return <CfHeaderUI {...(props as CfHeaderUIProps)} />;
    case "skeleton":
      return <CfHeaderSkeleton />;
    default:
      throw new Error(`Unsupported render mode: ${render}`);
  }
};
