"use client";

import { useEffect, useState } from "react";

import { CfFetchByIdNested } from "@aces/types";

import { fetchCodeEmbedData } from "./services";
import { CfCodeEmbedSkeleton } from "./skeleton";
import { CfCodeEmbedUI } from "./ui";

export const CfCodeEmbedClient = ({
  id,
  preview,
  lang,
  nested,
}: CfFetchByIdNested) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchCodeEmbedData(id, preview, lang)
      .then(setData)
      .catch((err) => {
        console.error("Client fetch failed:", err);
      });
  }, [id, preview, lang]);

  if (!data) return <CfCodeEmbedSkeleton />;
  console.log(data);

  return (
    <CfCodeEmbedUI
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
