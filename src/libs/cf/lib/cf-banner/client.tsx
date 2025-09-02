"use client";

import { useEffect, useState } from "react";

import { useTimelineState } from "@aces/store";
import { CfFetchById } from "@aces/types";

import { fetchBannerData } from "./services";
import { CfBannerSkeleton } from "./skeleton";
import { CfBannerUI } from "./ui";

export const CfBannerClient = ({ id, preview, lang }: CfFetchById) => {
  const timelineDate =
    useTimelineState((state) => state.simulationDate) ||
    new Date().toISOString();

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchBannerData(id, true, lang, timelineDate)
      .then(setData)
      .catch((err) => {
        console.error("Client fetch failed:", err);
      });
  }, [id, preview, lang, timelineDate]);

  if (!data) return <CfBannerSkeleton />;

  return (
    <CfBannerUI
      internalTitle={data.internalTitle}
      headline={data.headline}
      bodyCopy={data.bodyCopy}
      buttonsCollection={data.buttonsCollection}
      theme={data.theme}
      media={data.media}
      mediaAlignment={data.mediaAlignment}
      __typename={data.__typename}
      id={id}
      lang={lang}
      preview={preview}
    />
  );
};
