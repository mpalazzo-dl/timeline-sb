"use client";

import { useEffect, useState } from "react";

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
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchRichTextSectionData(id, preview, lang)
      .then(setData)
      .catch((err) => {
        console.error("Client fetch failed:", err);
      });
  }, [id, preview, lang]);

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
