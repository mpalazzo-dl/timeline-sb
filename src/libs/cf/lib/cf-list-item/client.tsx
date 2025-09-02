"use client";

import { useEffect, useState } from "react";

import { useTimelineState } from "@aces/store";

import { CfListItemWrapperProps } from ".";
import { fetchListItemData } from "./services";
import { CfListItemSkeleton } from "./skeleton";
import { CfListItemUI } from "./ui";

export const CfListItemClient = ({
  id,
  preview,
  lang,
}: CfListItemWrapperProps) => {
  const timelineDate =
    useTimelineState((state) => state.simulationDate) ||
    new Date().toISOString();

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchListItemData(id, true, lang, timelineDate)
      .then(setData)
      .catch((err) => {
        console.error("Client fetch failed:", err);
      });
  }, [id, preview, lang, timelineDate]);

  if (!data) return <CfListItemSkeleton />;

  return (
    <CfListItemUI
      internalTitle={data.internalTitle}
      headline={data.headline}
      bodyCopy={data.bodyCopy}
      listCopy={data.listCopy}
      columns={data.columns}
      media={data.media}
      __typename={data.__typename}
      id={id}
      lang={lang}
      preview={preview}
    />
  );
};
