"use client";

import { useEffect, useState } from "react";

import { useTimelineState } from "@aces/store";
import { CfFetchByIdNested } from "@aces/types";

import { fetchAccordionsData } from "./services";
import { CfAccordionsSkeleton } from "./skeleton";
import { CfAccordionsUI } from "./ui";

export const CfAccordionsClient = ({
  id,
  preview,
  lang,
  nested,
}: CfFetchByIdNested) => {
  const timelineDate =
    useTimelineState((state) => state.simulationDate) ||
    new Date().toISOString();

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchAccordionsData(id, true, lang, timelineDate)
      .then(setData)
      .catch((err) => {
        console.error("Client fetch failed:", err);
      });
  }, [id, preview, lang, timelineDate]);

  if (!data) return <CfAccordionsSkeleton />;

  return (
    <CfAccordionsUI
      internalTitle={data.internalTitle}
      hideOnDesktop={data.hideOnDesktop}
      defaultOpen={data.defaultOpen}
      accordionsCollection={data.accordionsCollection}
      __typename={data.__typename}
      nested={nested}
      id={id}
      lang={lang}
      preview={preview}
    />
  );
};
