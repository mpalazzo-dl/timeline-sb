"use client";

import { useEffect, useState } from "react";

import { CfFetchById } from "@aces/types";

import { fetchButton } from "./services";
import { CfButtonSkeleton } from "./skeleton";
import { CfButtonUI } from "./ui";

export const CfBannerClient = ({ id, preview, lang }: CfFetchById) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchButton(id, preview, lang)
      .then(setData)
      .catch((err) => {
        console.error("Client fetch failed:", err);
      });
  }, [id, preview, lang]);

  if (!data) return <CfButtonSkeleton />;
  console.log(data);

  return (
    <CfButtonUI
      internalTitle={data.internalTitle}
      title={data.title}
      link={data.link}
      buttonStyle={data.buttonStyle}
      rightIcon={data.rightIcon}
      fullWidthMobile={data.fullWidthMobile}
      __typename={data.__typename}
      id={id}
      lang={lang}
      preview={preview}
    />
  );
};
