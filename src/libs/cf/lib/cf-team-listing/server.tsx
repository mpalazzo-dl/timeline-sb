"use server";

import { CfTeamListingWrapperProps } from ".";
import { CfTeamListingUI } from "./ui";
import { fetchTeamListingData } from "./services";
import { CfTeamListingSkeleton } from "./skeleton";

export const CfTeamListingServer = async ({
  id,
  preview,
  lang,
}: CfTeamListingWrapperProps) => {
  let data;

  try {
    data = await fetchTeamListingData(id, preview, lang);
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return <CfTeamListingSkeleton />;
  }

  if (!data) {
    return <CfTeamListingSkeleton />;
  }

  return (
    <CfTeamListingUI
      internalTitle={data.internalTitle}
      headline={data.headline}
      teamMembersCollection={data.teamMembersCollection}
      __typename={data.__typename}
      id={id}
      lang={lang}
      preview={preview}
    />
  );
};
