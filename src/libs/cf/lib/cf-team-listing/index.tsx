import { Locale } from "@aces/i18n";
import type {
  CfFetchById,
  CfBaseComponent,
  CfTeamMember,
  CfRenderMode,
} from "@aces/types";

import { CfTeamListingServer } from "./server";
import { CfTeamListingClient } from "./client";
import { CfTeamListingUI } from "./ui";
import { CfTeamListingSkeleton } from "./skeleton";

export type CfTeamListingProps =
  | ({ render?: "server" | "client" } & CfTeamListingWrapperProps)
  | ({ render: "ui" } & CfTeamListingUIProps)
  | { render: "skeleton" };

export interface CfTeamListingWrapperProps extends CfFetchById {}

export interface CfTeamListingUIProps extends CfBaseComponent {
  headline?: string;
  teamMembersCollection: {
    items: CfTeamMember[];
  };
}

export interface CfTeamMemberItemUIProps extends CfTeamMember {
  id: string;
  lang: Locale;
  preview: boolean;
}

export const CfTeamListing = ({
  render = "server",
  ...props
}: CfTeamListingProps & { render?: CfRenderMode }) => {
  switch (render) {
    case "server":
      return <CfTeamListingServer {...(props as CfTeamListingWrapperProps)} />;
    case "client":
      return <CfTeamListingClient {...(props as CfTeamListingWrapperProps)} />;
    case "ui":
      return <CfTeamListingUI {...(props as CfTeamListingUIProps)} />;
    case "skeleton":
      return <CfTeamListingSkeleton />;
    default:
      throw new Error(`Unsupported render mode: ${render}`);
  }
};
