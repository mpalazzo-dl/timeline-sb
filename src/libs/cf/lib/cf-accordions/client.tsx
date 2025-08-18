"use client";

import { useEffect, useState } from "react";

import { CfFetchByIdNested } from "@aces/types";

import { fetchAccordionsData } from "./services";
import { CfAccordionsSkeleton } from "./skeleton";
import { CfAccordionsUI } from "./ui";

export const CfAccordionsClient = ({
  id,
  preview,
  lang,
  nested,
}: CfFetchByIdNested) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchAccordionsData(id, preview, lang)
      .then(setData)
      .catch((err) => {
        console.error("Client fetch failed:", err);
      });
  }, [id, preview, lang]);

  if (!data) return <CfAccordionsSkeleton />;
  console.log(data);

  return (
    <CfAccordionsUI
      internalTitle={data.internalTitle}
      hideOnDesktop={data.hideOnDesktop}
      defaultOpen={data.defaultOpen}
      accordionsCollection={data.accordionsCollection}
      __typename={data.__typename}
      nested={nested}
      id={id}
      lang={lang}
      preview={preview}
    />
  );
};
