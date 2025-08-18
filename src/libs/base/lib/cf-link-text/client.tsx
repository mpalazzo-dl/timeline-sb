"use client";

import { useEffect, useState } from "react";

import { CfLinkTextWrapperProps } from ".";
import { fetchLinkTextData } from "./services";
import { CfLinkTextSkeleton } from "./skeleton";
import { CfTextLinkUI } from "./ui";

export const CfLinkTextClient = ({
  id,
  preview,
  lang,
  alignment,
}: CfLinkTextWrapperProps) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchLinkTextData(id, preview, lang)
      .then(setData)
      .catch((err) => {
        console.error("Client fetch failed:", err);
      });
  }, [id, preview, lang]);

  if (!data) return <CfLinkTextSkeleton />;

  return (
    <CfTextLinkUI
      internalTitle={data.internalTitle}
      link={data.link}
      title={data.title}
      externalLinkIcon={data.externalLinkIcon}
      __typename={data.__typename}
      alignment={alignment}
      id={data.sys.id}
      lang={lang}
      preview={preview}
    />
  );
};
