"use client";

import { useEffect, useState } from "react";

import { CfListItemWrapperProps } from ".";
import { fetchListItemData } from "./services";
import { CfListItemSkeleton } from "./skeleton";
import { CfListItemUI } from "./ui";

export const CfListItemClient = ({
  id,
  preview,
  lang,
}: CfListItemWrapperProps) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchListItemData(id, preview, lang)
      .then(setData)
      .catch((err) => {
        console.error("Client fetch failed:", err);
      });
  }, [id, preview, lang]);

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
