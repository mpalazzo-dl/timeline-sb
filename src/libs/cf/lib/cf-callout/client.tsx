"use client";

import { useEffect, useState } from "react";

import { CfFetchById } from "@aces/types";

import { fetchCalloutData } from "./services";
import { CfCalloutSkeleton } from "./skeleton";
import { CfCalloutUI } from "./ui";

export const CfCalloutClient = ({ id, preview, lang }: CfFetchById) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchCalloutData(id, preview, lang)
      .then(setData)
      .catch((err) => {
        console.error("Client fetch failed:", err);
      });
  }, [id, preview, lang]);

  if (!data) return <CfCalloutSkeleton />;
  console.log(data);

  return (
    <CfCalloutUI
      internalTitle={data.internalTitle}
      headline={data.headline}
      bodyCopy={data.bodyCopy}
      tags={data.tags}
      buttonsCollection={data.buttonsCollection}
      media={data.media}
      __typename={data.__typename}
      id={id}
      lang={lang}
      preview={preview}
    />
  );
};
