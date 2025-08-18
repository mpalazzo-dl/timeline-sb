"use client";

import { useEffect, useState } from "react";

import { CfLockupWrapperProps } from ".";
import { fetchLockup } from "./services";
import { CfLockupSkeleton } from "./skeleton";
import { CfLockupUI } from "./ui";

export const CfLockupClient = ({
  id,
  preview,
  lang,
  nested,
}: CfLockupWrapperProps) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchLockup(id, preview, lang)
      .then(setData)
      .catch((err) => {
        console.error("Client fetch failed:", err);
      });
  }, [id, preview, lang]);

  if (!data) return <CfLockupSkeleton />;

  return (
    <CfLockupUI
      internalTitle={data.internalTitle}
      headline={data.headline}
      subhead={data.subhead}
      bodyCopy={data.bodyCopy}
      buttonsCollection={data.buttonsCollection}
      media={data.media}
      mediaSize={data.mediaSize}
      mediaAlignment={data.mediaAlignment}
      mediaBleed={data.mediaBleed}
      __typename={data.__typename}
      nested={nested}
      id={id}
      lang={lang}
      preview={preview}
    />
  );
};
