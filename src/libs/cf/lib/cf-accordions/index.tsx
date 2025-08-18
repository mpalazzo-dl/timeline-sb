import type {
  CfBaseComponent,
  CfComponentBaseNestedProps,
  CfFetchByIdNested,
  CfImageProps,
  CfRenderMode,
  CfRichText,
  Nested,
} from "@aces/types";

import { CfAccordionsServer } from "./server";
import { CfAccordionsClient } from "./client";
import { CfAccordionsUI } from "./ui";
import { CfAccordionsSkeleton } from "./skeleton";

export type CfAccordionsProps =
  | ({ render?: "server" | "client" } & CfComponentBaseNestedProps)
  | ({ render: "ui" } & CfAccordionsUIProps)
  | { render: "skeleton" };

export interface CfAccordionsUIProps extends CfBaseComponent, Nested {
  hideOnDesktop: boolean;
  defaultOpen: boolean;
  accordionsCollection: {
    items: {
      internalTitle: string;
      icon?: CfImageProps;
      headline: string;
      bodyCopy: CfRichText;
      sys: { id: string };
    }[];
  };
}

export const CfAccordions = ({
  render = "server",
  ...props
}: CfAccordionsProps & { render?: CfRenderMode }) => {
  switch (render) {
    case "server":
      return <CfAccordionsServer {...(props as CfFetchByIdNested)} />;
    case "client":
      return <CfAccordionsClient {...(props as CfFetchByIdNested)} />;
    case "ui":
      return <CfAccordionsUI {...(props as CfAccordionsUIProps)} />;
    case "skeleton":
      return <CfAccordionsSkeleton />;
    default:
      throw new Error(`Unsupported render mode: ${render}`);
  }
};
