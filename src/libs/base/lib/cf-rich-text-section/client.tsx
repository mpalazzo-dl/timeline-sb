"use client";

import { useEffect, useState } from "react";

import { useTimelineState } from "@aces/store";

import { CfRichTextSectionWrapperProps } from ".";
import { fetchRichTextSectionData } from "./services";
import { CfRichTextSectionSkeleton } from "./skeleton";
import { CfRichTextSectionUI } from "./ui";

export const CfRichTextSectionClient = ({
  id,
  preview,
  lang,
  nested,
  smallPadding,
}: CfRichTextSectionWrapperProps) => {
  const timelineDate =
    useTimelineState((state) => state.simulationDate) ||
    new Date().toISOString();

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchRichTextSectionData(id, true, lang, timelineDate)
      .then(setData)
      .catch((err) => {
        console.error("Client fetch failed:", err);
      });
  }, [id, preview, lang, timelineDate]);

  if (!data) return <CfRichTextSectionSkeleton />;

  return (
    <CfRichTextSectionUI
      internalTitle={data.internalTitle}
      alignment={data.alignment}
      containerWidth={data.containerWidth}
      cfComponentSpacing={data.componentSpacing}
      backgroundColor={data.backgroundColor}
      bodyCopy={data.bodyCopy}
      border={data.border}
      __typename={data.__typename}
      nested={nested}
      smallPadding={smallPadding}
      id={id}
      lang={lang}
      preview={preview}
    />
  );
};
