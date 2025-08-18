"use client";

import { useEffect, useState } from "react";

import { CfVideoEmbedWrapperProps } from ".";
import { fetchVideoEmbedData } from "./services";
import { CfVideoEmbedSkeleton } from "./skeleton";
import { CfVideoEmbedUI } from "./ui";

export const CfVideoEmbedClient = ({
  id,
  preview,
  lang,
  nested,
}: CfVideoEmbedWrapperProps) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchVideoEmbedData(id, preview, lang)
      .then(setData)
      .catch((err) => {
        console.error("Client fetch failed:", err);
      });
  }, [id, preview, lang]);

  if (!data) return <CfVideoEmbedSkeleton />;

  return (
    <CfVideoEmbedUI
      internalTitle={data.internalTitle}
      embedCode={data.embedCode}
      nested={nested}
      __typename={data.__typename}
      id={id}
      lang={lang}
      preview={preview}
    />
  );
};
