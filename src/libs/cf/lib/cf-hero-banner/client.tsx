"use client";

import { useEffect, useState } from "react";

import { CfFetchById } from "@aces/types";

import { fetchHeroBanner } from "./services";
import { CfHeroBannerSkeleton } from "./skeleton";
import { CfHeroBannerUI } from "./ui";
import { useTimelineState } from "@aces/store";

export const CfHeroBannerClient = ({ id, preview, lang }: CfFetchById) => {
  const timelineDate =
    useTimelineState((state) => state.simulationDate) ||
    new Date().toISOString();

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchHeroBanner(id, true, lang, timelineDate)
      .then(setData)
      .catch((err) => {
        console.error("Client fetch failed:", err);
      });
  }, [id, preview, lang, timelineDate]);

  if (!data) return <CfHeroBannerSkeleton />;

  return (
    <CfHeroBannerUI
      internalTitle={data.internalTitle}
      headline={data.headline}
      subhead={data.subhead}
      buttonsCollection={data.buttonsCollection}
      image={data.image}
      fullOverlay={data.fullOverlay}
      slim={data.slim}
      __typename={data.__typename}
      id={id}
      lang={lang}
      preview={preview}
    />
  );
};
