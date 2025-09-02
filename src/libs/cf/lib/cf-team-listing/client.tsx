"use client";

import { useEffect, useState } from "react";

import { useTimelineState } from "@aces/store";

import { CfTeamListingWrapperProps } from ".";
import { fetchTeamListingData } from "./services";
import { CfTeamListingSkeleton } from "./skeleton";
import { CfTeamListingUI } from "./ui";

export const CfTeamListingClient = ({
  id,
  preview,
  lang,
}: CfTeamListingWrapperProps) => {
  const timelineDate =
    useTimelineState((state) => state.simulationDate) ||
    new Date().toISOString();

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchTeamListingData(id, true, lang, timelineDate)
      .then(setData)
      .catch((err) => {
        console.error("Client fetch failed:", err);
      });
  }, [id, preview, lang, timelineDate]);

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
