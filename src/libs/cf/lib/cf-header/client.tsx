"use client";

import { useEffect, useState } from "react";

import { useTimelineState } from "@aces/store";
import { CfAlignment, CfFetchById, Nested } from "@aces/types";

import { fetchHeaderData } from "./services";
import { CfHeaderSkeleton } from "./skeleton";
import { CfHeaderUI } from "./ui";

export interface CfHeaderServerProps extends CfFetchById, Nested {
  alignment?: CfAlignment;
}

export const CfHeaderClient = ({
  id,
  preview,
  lang,
  nested,
  alignment,
}: CfHeaderServerProps) => {
  const timelineDate =
    useTimelineState((state) => state.simulationDate) ||
    new Date().toISOString();

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchHeaderData(id, true, lang, timelineDate)
      .then(setData)
      .catch((err) => {
        console.error("Client fetch failed:", err);
      });
  }, [id, preview, lang, timelineDate]);

  if (!data) return <CfHeaderSkeleton />;
  console.log(data);

  return (
    <CfHeaderUI
      internalTitle={data.internalTitle}
      headline={data.headline}
      headerType={data.headerType}
      alignment={alignment ? alignment : data.alignment}
      containerWidth={data.containerWidth}
      nested={nested}
      __typename={data.__typename}
      id={id}
      lang={lang}
      preview={preview}
    />
  );
};
