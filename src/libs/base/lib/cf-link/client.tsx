"use client";

import { useEffect, useState } from "react";

import { CfLinkWrapperProps } from ".";
import { fetchLinkData } from "./services";
import { CfLinkSkeleton } from "./skeleton";
import { CfLinkUI } from "./ui";

export const CfLinkClient = ({
  id,
  preview,
  lang,
  children,
}: CfLinkWrapperProps) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchLinkData(id, preview, lang)
      .then(setData)
      .catch((err) => {
        console.error("Client fetch failed:", err);
      });
  }, [id, preview, lang]);

  if (!data) return <CfLinkSkeleton />;

  return (
    <CfLinkUI
      linkType={data.linkType}
      pageLink={data.pageLink}
      customLink={data.customLink}
      target={data.target}
      lang={lang}
    >
      {children}
    </CfLinkUI>
  );
};
