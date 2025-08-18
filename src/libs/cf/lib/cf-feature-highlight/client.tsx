"use client";

import { useEffect, useState } from "react";

import { CfFetchById } from "@aces/types";

import { fetchFeatureHighlightData } from "./services";
import { CfFeatureHighlightSkeleton } from "./skeleton";
import { CfFeatureHighlightUI } from "./ui";

export const CfFeatureHighlightClient = ({
  id,
  preview,
  lang,
}: CfFetchById) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchFeatureHighlightData(id, preview, lang)
      .then(setData)
      .catch((err) => {
        console.error("Client fetch failed:", err);
      });
  }, [id, preview, lang]);

  if (!data) return <CfFeatureHighlightSkeleton />;
  console.log(data);

  return (
    <CfFeatureHighlightUI
      internalTitle={data.internalTitle}
      headline={data.headline}
      bodyCopy={data.bodyCopy}
      media={data.media}
      __typename={data.__typename}
      id={id}
      lang={lang}
      preview={preview}
    />
  );
};
