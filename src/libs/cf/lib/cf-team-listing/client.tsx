"use client";

import { useEffect, useState } from "react";

import { CfTeamListingWrapperProps } from ".";
import { fetchTeamListingData } from "./services";
import { CfTeamListingSkeleton } from "./skeleton";
import { CfTeamListingUI } from "./ui";

export const CfTeamListingClient = ({
  id,
  preview,
  lang,
}: CfTeamListingWrapperProps) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchTeamListingData(id, preview, lang)
      .then(setData)
      .catch((err) => {
        console.error("Client fetch failed:", err);
      });
  }, [id, preview, lang]);

  if (!data) return <CfTeamListingSkeleton />;

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
